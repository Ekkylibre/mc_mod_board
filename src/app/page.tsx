"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { colors } from "./theme";
import ServerButton from "./components/ServerButton";
import AddServerButton from "./components/AddServerButton";
import SettingButton from "./components/SettingButton";
import { FaStop, FaPlay, FaSave } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
import yaml from 'js-yaml';
import axios from 'axios';
import StatusDot from "./components/StatusDot";

const StyledAside = styled.aside`
  background-color: ${colors["background raised"]};
  height: calc(100vh - 4rem);
  width: 4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 1px;
    background-color: ${colors["darker text"]};
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ScrollableButtonContainer = styled.div`
  flex-grow: 1; /* Prend l'espace disponible */
  overflow-y: auto; /* Permet le défilement vertical */
  max-height: calc(100vh - 100px); /* Ajustez en fonction de la hauteur de vos boutons en bas */
  
  /* Styles pour cacher les barres de défilement */
  scrollbar-width: none; /* Pour Firefox */
  -ms-overflow-style: none; /* Pour Internet Explorer et Edge */

  &::-webkit-scrollbar {
    display: none; /* Pour Chrome, Safari et Opera */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;

const BottomContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
`;

const StyledMainContent = styled.div`
  background-color: ${colors.background};
  padding: 10px;
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow: auto;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const FlexContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${colors["darker text"]};
`;

const ButtonWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  height: 40px;
  position: relative;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors["background raised"]};
  border: none;
  padding: 0 15px;
  cursor: pointer;
  color: ${colors["darker text"]};
  height: 100%;
  position: relative;

  &:first-child::before {
    content: "";
    position: absolute;
    right: 0;
    top: 15%;
    width: 1px;
    height: 70%;
    background-color: ${colors["darker text"]};
  }
`;

const HiddenSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 1.2rem; 
  padding: 5px;
`;

const StyledInput = styled.input<{ $isEditable: boolean }>`
  background-color: transparent;
  color: ${colors["darker text"]};
  font-size: 1.2rem;
  border: ${({ $isEditable }) => ($isEditable ? "1px solid white" : "none")};
  width: auto;
  cursor: ${({ $isEditable }) => ($isEditable ? "auto" : "pointer")};
  &:focus {
    border: 1px solid white;
  }
`;

const SaveIconContainer = styled.div`
  background-color: ${colors["background raised"]};
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem; 
  color: ${colors["darker text"]};
  cursor: pointer;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const InviteMessageContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: ${colors["background raised"]};
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export default function Home() {
  const [servers, setServers] = useState([
    { id: 1, title: "Server 1", yamlContent: "" },
    { id: 2, title: "Server 2", yamlContent: "" },
    { id: 3, title: "Server 3", yamlContent: "" },
    { id: 4, title: "Server 4", yamlContent: "" },
  ]);

  const [selectedServerId, setSelectedServerId] = useState<number | null>(servers[0]?.id || null);
  const [isEditable, setIsEditable] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const [tempTitle, setTempTitle] = useState("");
  const [yamlContent, setYamlContent] = useState("");
  const [isYamlLoaded, setIsYamlLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStop = () => {
    // Change l'état à false seulement si isActive est true
    if (isActive) {
      setIsActive(false);
    }
  };

  const handlePlay = () => {
    // Change l'état à true seulement si isActive est false
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handleEditClick = () => {
    if (selectedServerId !== null) {
      setIsEditable(prev => !prev);
      if (!isEditable) {
        // Utiliser requestAnimationFrame pour donner le focus à l'input immédiatement après son rendu
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    }
  };

  const handleBlur = () => {
    if (isEditable && selectedServerId !== null) {
      setServers(prevServers =>
        prevServers.map(server =>
          server.id === selectedServerId
            ? { ...server, title: tempTitle }
            : server
        )
      );
      setIsEditable(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (selectedServerId !== null) {
      setYamlContent(value || "");
      setServers(prevServers =>
        prevServers.map(server =>
          server.id === selectedServerId
            ? { ...server, yamlContent: value || "" }
            : server
        )
      );
    }
  };

  const handleSaveClick = useCallback(() => {
    if (selectedServerId !== null) {
      console.log("Sauvegarde effectuée :", tempTitle, yamlContent);
    }
  }, [selectedServerId, tempTitle, yamlContent]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isEditable) {
      if (selectedServerId !== null) {
        setServers(prevServers =>
          prevServers.map(server =>
            server.id === selectedServerId
              ? { ...server, title: tempTitle }
              : server
          )
        );
        setIsEditable(false);
        inputRef.current?.blur();
      }
    }
  };

  const handleAddServer = async () => {
    try {
      const response = await axios.get('/default.yaml');
      const parsedYaml = yaml.load(response.data);

      // Trouver un titre unique pour le nouveau serveur
      let newTitle = `Server ${servers.length + 1}`;
      let index = 1;

      while (servers.some(server => server.title === newTitle)) {
        index++;
        newTitle = `Server ${servers.length + index}`;
      }

      const newServer = {
        id: Date.now(), // Utilisation d'un timestamp pour garantir l'unicité
        title: newTitle,
        yamlContent: yaml.dump(parsedYaml),
      };

      // Ajouter le nouveau serveur et le sélectionner automatiquement
      setServers((prevServers) => {
        const updatedServers = [...prevServers, newServer];
        setSelectedServerId(newServer.id); // Sélectionner automatiquement le nouveau serveur
        return updatedServers;
      });
    } catch (error) {
      console.error("Erreur lors du chargement du fichier YAML par défaut", error);
    }
  };

  const handleClose = (id: number) => {
    setServers(prevServers => {
      const updatedServers = prevServers.filter(server => server.id !== id);
      // Vérifiez si la liste est vide
      if (updatedServers.length === 0) {
        setSelectedServerId(null); // Ne sélectionnez aucun serveur
        return updatedServers; // Retournez la liste vide
      } else {
        // Si ce n'était pas le dernier serveur, sélectionnez le premier serveur
        setSelectedServerId(updatedServers[0].id);
        return updatedServers;
      }
    });
  };

  useEffect(() => {
    const loadYaml = async () => {
      try {
        const response = await axios.get('/default.yaml');
        const parsedYaml = yaml.load(response.data);

        // Mettez à jour le contenu YAML pour chaque serveur une seule fois
        const updatedServers = servers.map((server) => ({
          ...server,
          yamlContent: yaml.dump(parsedYaml),
        }));

        setServers(updatedServers);
        setIsYamlLoaded(true);
      } catch (error) {
        console.error("Erreur lors du chargement du fichier YAML", error);
      }
    };

    // Vérifiez si le YAML a déjà été chargé pour éviter les mises à jour infinies
    if (!isYamlLoaded && servers.some((server) => server.yamlContent === "")) {
      loadYaml();
    }
  }, [servers, isYamlLoaded]);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [tempTitle]);

  useEffect(() => {
    const server = servers.find((s) => s.id === selectedServerId);
    if (server) {
      setTempTitle(server.title);
      setYamlContent(server.yamlContent);
    }
  }, [selectedServerId, servers]);

  const handleServerButtonClick = (id: number) => {
    setSelectedServerId(id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Empêche le comportement par défaut
        handleSaveClick();   // Appelle la fonction de sauvegarde
      }
    };

    // Ajoute l'écouteur d'événements
    window.addEventListener('keydown', handleKeyDown);

    // Nettoyage de l'écouteur d'événements
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSaveClick]);

  return (
    <AppContainer>
      <NavBar />
      <FlexContainer>
        <StyledAside>
          <Container>
          <ScrollableButtonContainer>
              <ButtonContainer>
                {servers.map((server) => (
                  <ServerButton
                    key={server.id}
                    initial={server.title.charAt(0)}
                    onClick={() => handleServerButtonClick(server.id)}
                    selected={server.id === selectedServerId}
                    onClose={() => handleClose(server.id)}
                  />
                ))}
              </ButtonContainer>
            </ScrollableButtonContainer>
            <BottomContainer>
              <AddServerButton onClick={handleAddServer} />
              <SettingButton />
            </BottomContainer>
          </Container>
        </StyledAside>
        {servers.length === 0 ? (
          <StyledMainContent>
            <InviteMessageContainer>
              <h2>Pas de serveurs encore !</h2>
              <p>Créez votre premier serveur pour démarrer l’aventure.</p>
              <AddServerButton onClick={handleAddServer} />
            </InviteMessageContainer>
          </StyledMainContent>
        ) : (
          <StyledMainContent>
            <ContentContainer>
              <ButtonWrapper>
                <StyledButton onClick={handleStop}>
                  <FaStop />
                </StyledButton>
                <StyledButton onClick={handlePlay}>
                  <FaPlay />
                </StyledButton>
              </ButtonWrapper>
              <RelativeContainer>
                <HiddenSpan ref={spanRef}>{tempTitle}</HiddenSpan>
                <StyledInput
                  ref={inputRef}
                  type="text"
                  value={tempTitle}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  disabled={false}
                  $isEditable={isEditable}
                  style={{ width: `${inputWidth + 5}px` }}
                  onClick={handleEditClick}
                />
                <StatusDot isActive={isActive} />
              </RelativeContainer>
            </ContentContainer>
            <Editor
              height="700px"
              language="yaml"
              value={yamlContent}
              theme="vs-dark"
              onChange={handleEditorChange}
            />
            <IconContainer>
              <SaveIconContainer onClick={handleSaveClick}>
                <FaSave />
              </SaveIconContainer>
            </IconContainer>
          </StyledMainContent>
        )}
      </FlexContainer>
    </AppContainer>
  );
}
