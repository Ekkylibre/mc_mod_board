"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { colors } from "./theme";
import ServerButton from "./components/ServerButton";
import AddServerButton from "./components/AddServerButton";
import SettingButton from "./components/SettingButton";
import { FaEdit, FaStop, FaPlay, FaSave } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";
import yaml from 'js-yaml';
import axios from 'axios';

const StyledAside = styled.aside`
  background-color: ${colors["background raised"]};
  padding: 10px;
  height: 100%;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BottomContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const IconEditContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${colors["darker text"]};
  cursor: pointer;
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
  padding: 5px;
  font-size: 1.2rem;
  border: ${({ $isEditable }) => ($isEditable ? "1px solid white" : "none")};
  outline: none;
  width: auto;
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

  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      } catch (error) {
        console.error("Erreur lors du chargement du fichier YAML", error);
      }
    };

    // Vérifiez si le YAML a déjà été chargé pour éviter les mises à jour infinies
    if (servers.some((server) => server.yamlContent === "")) {
      loadYaml();
    }
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleEditClick = () => {
    if (selectedServerId !== null) {
      setIsEditable(prev => !prev);
      if (!isEditable) {
        // Utiliser setTimeout pour s'assurer que l'input a été rendu avant de lui donner le focus
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }
    console.log('Edit');
  };



  const handleBlur = () => {
    console.log('Input a perdu le focus');
    if (isEditable && selectedServerId !== null) {
      setServers(prevServers =>
        prevServers.map(server =>
          server.id === selectedServerId
            ? { ...server, title: tempTitle }
            : server
        )
      );
      console.log('Modifications sauvegardées, désactivation de l\'édition');
      setIsEditable(false);
    }
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
    if (e.key === "Enter") {
      // Sauvegarde des modifications
      if (isEditable && selectedServerId !== null) {
        setServers(prevServers =>
          prevServers.map(server =>
            server.id === selectedServerId
              ? { ...server, title: tempTitle }
              : server
          )
        );
        // Désactiver l'édition après sauvegarde
        setIsEditable(false);
        console.log("Modifications sauvegardées via la touche Entrée");
      }
    }
  };


  const handleAddServer = () => {
    const newServer = {
      id: servers.length + 1,
      title: `Server ${servers.length + 1}`,
      yamlContent: ""
    };
    setServers([...servers, newServer]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Empêche le comportement par défaut
        handleSaveClick(); // Appelle la fonction de sauvegarde
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSaveClick]);

  return (
    <AppContainer>
      <NavBar />
      <FlexContainer>
        <StyledAside>
          <Container>
            <ButtonContainer>
              {servers.map((server) => (
                <ServerButton
                  key={server.id}
                  initial={server.title.charAt(0)}
                  onClick={() => handleServerButtonClick(server.id)}
                  selected={server.id === selectedServerId}
                />
              ))}
            </ButtonContainer>
            <BottomContainer>
              <AddServerButton onClick={handleAddServer} />
              <SettingButton />
            </BottomContainer>
          </Container>
        </StyledAside>
        <StyledMainContent>
          <ContentContainer>
            <ButtonWrapper>
              <StyledButton>
                <FaStop />
              </StyledButton>
              <StyledButton>
                <FaPlay />
              </StyledButton>
            </ButtonWrapper>
            <div style={{ position: "relative" }}>
              <HiddenSpan ref={spanRef}>{tempTitle}</HiddenSpan>
              <StyledInput
                ref={inputRef}
                type="text"
                value={tempTitle}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                disabled={!isEditable}
                $isEditable={isEditable}
                style={{ width: `${inputWidth + 10}px` }}
              />
            </div>
            <IconEditContainer onClick={handleEditClick}>
              <FaEdit />
            </IconEditContainer>
          </ContentContainer>
          <Editor
            height="700px"
            language="yaml"
            value={yamlContent} // Utilisation de yamlContent ici
            theme="vs-dark"
            onChange={handleEditorChange}
          />
          <IconContainer>
            <SaveIconContainer onClick={handleSaveClick}>
              <FaSave />
            </SaveIconContainer>
          </IconContainer>
        </StyledMainContent>
      </FlexContainer>
    </AppContainer>
  );
}
