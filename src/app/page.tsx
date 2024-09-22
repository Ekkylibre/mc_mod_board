"use client";
import { useState, useRef, useEffect } from "react";
import NavBar from "./components/NavBar";
import styled from "styled-components";
import { colors } from "./theme";
import ServerButton from "./components/ServerButton";
import AddServerButton from "./components/AddServerButton";
import SettingButton from "./components/SettingButton";
import { FaEdit, FaStop, FaPlay } from "react-icons/fa"; // Import des icônes Stop et Play

const StyledAside = styled.aside`
  background-color: ${colors["background raised"]};
  padding: 10px;
  height: 100%;
  width: 5rem;
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

const StyledMainContent = styled.div`
  background-color: ${colors.background};
  padding: 10px;
  color: white;
  height: 100%;
  width: auto;
  flex: 1;
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

const BottomText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  border: 1px solid white;
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
    background-color: white;
  }
`;

const HiddenSpan = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 1.2rem; /* Doit correspondre au style de l'input */
  padding: 5px;
`;

const StyledInput = styled.input<{ isEditable: boolean }>`
  background-color: transparent;
  color: white;
  padding: 5px;
  font-size: 1.2rem;
  border: ${({ isEditable }) => (isEditable ? "1px solid white" : "none")};
  outline: none;
  width: auto;
  &:focus {
    border: 1px solid white; /* Bordure uniforme au focus */
  }
`;

export default function Home() {
  const [title, setTitle] = useState("Title");
  const [isEditable, setIsEditable] = useState(false); // Pour gérer l'édition
  const [inputWidth, setInputWidth] = useState(0); // Gérer la largeur de l'input

  const spanRef = useRef<HTMLSpanElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditable(!isEditable); // Activer ou désactiver l'édition
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth); // Ajuster la largeur de l'input en fonction du texte
    }
  }, [title]);

  return (
    <AppContainer>
      <NavBar />
      <FlexContainer>
        <StyledAside>
          <Container>
            <ButtonContainer>
              <ServerButton />
              <ServerButton />
              <ServerButton />
              <ServerButton />
            </ButtonContainer>
            <BottomText>
              <AddServerButton />
              <SettingButton />
            </BottomText>
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
              <HiddenSpan ref={spanRef}>{title}</HiddenSpan>
              <StyledInput
                type="text"
                value={title}
                onChange={handleInputChange}
                disabled={!isEditable} // Désactiver l'input par défaut
                isEditable={isEditable} // Modifier la bordure en fonction de l'état d'édition
                style={{ width: `${inputWidth + 10}px` }} // Ajuster la largeur en fonction du texte
              />
            </div>
            <IconContainer onClick={handleEditClick}>
              <FaEdit />
            </IconContainer>
          </ContentContainer>
          <div>YAML</div>
          <div>SaveButton</div>
        </StyledMainContent>
        <StyledArticle>article</StyledArticle>
      </FlexContainer>
    </AppContainer>
  );
}
