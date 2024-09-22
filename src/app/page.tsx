"use client";
import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { colors } from "./theme";
import ServerButton from "./components/ServerButton";
import AddServerButton from "./components/AddServerButton";
import SettingButton from "./components/SettingButton";
import { FaEdit, FaStop, FaPlay, FaSave } from "react-icons/fa";
import { Editor } from "@monaco-editor/react";

const StyledAside = styled.aside`
  background-color: ${colors["background raised"]};
  padding: 10px;
  height: 100%;
  width: 4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0; // Positionnez-le en haut
    left: 50%; // Centrez le trait
    width: 50%; // Ajustez la largeur du trait
    height: 1px; // Hauteur du trait
    background-color: ${colors["darker text"]}; // Couleur du trait
    transform: translateX(-50%); // Centrez le trait horizontalement
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
  height: 100%;
  width: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledArticle = styled.article`
  background-color: yellowgreen;
  flex: 0.25;
  width: 250px;
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
  color: ${colors["darker text"]}
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
  font-size: 1.5rem; /* Ajuste la taille ici */
  color: ${colors["darker text"]};
  cursor: pointer;
`;


export default function Home() {
  const [servers, setServers] = useState([
    {
      id: 1, title: "Server 1", yamlContent:
        `services:
    mc:
      image: iteg/minecraft-server
      tty: true
      stdin_open: true
      ports:
        -"25565:25565"
      environment:
        EULA: "TRUE"
      volumes:
        #attach the relative directory 'data' to the container's /data path
        -./data:/data`
    },
    { id: 2, title: "Server 2", yamlContent: "" },
    { id: 3, title: "Server 3", yamlContent: "" },
    { id: 4, title: "Server 4", yamlContent: "" },
  ]);

  // Sélectionne par défaut le premier serveur
  const [selectedServerId, setSelectedServerId] = useState<number | null>(servers[0]?.id || null);

  const [isEditable, setIsEditable] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const [tempTitle, setTempTitle] = useState("");
  const [yamlContent, setYamlContent] = useState("");

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [tempTitle]);

  useEffect(() => {
    // Met à jour le titre et le contenu YAML lorsque le serveur sélectionné change
    const server = servers.find(s => s.id === selectedServerId);
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
    if (isEditable && selectedServerId !== null) {
      setServers(prevServers =>
        prevServers.map(server =>
          server.id === selectedServerId
            ? { ...server, title: tempTitle }
            : server
        )
      );
    }
    setIsEditable(!isEditable);
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

  const handleSaveClick = () => {
    if (selectedServerId !== null) {
      console.log("Sauvegarde effectuée :", tempTitle, yamlContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditClick(); // Valide l'input comme un clic
    }
  };

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
              <AddServerButton />
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
                type="text"
                value={tempTitle}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Gestionnaire d'événement pour la touche Entrée
                disabled={!isEditable}
                $isEditable={isEditable}
                style={{ width: `${inputWidth + 10}px` }}
              />
            </div>
            <IconContainer onClick={handleEditClick}>
              <FaEdit />
            </IconContainer>
          </ContentContainer>
          <Editor
            height="700px"
            language="yaml"
            value={yamlContent}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              selectOnLineNumbers: true,
              wordWrap: "on",
              minimap: { enabled: false },
            }}
          />
          <IconContainer>
            <SaveIconContainer onClick={handleSaveClick}>
              <FaSave />
            </SaveIconContainer>
          </IconContainer>
        </StyledMainContent>
        <StyledArticle>article</StyledArticle>
      </FlexContainer>
    </AppContainer>
  );
}
