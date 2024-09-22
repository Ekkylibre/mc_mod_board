"use client";
import NavBar from "./components/NavBar";
import styled from 'styled-components';
import { colors } from "./theme";
import ServerButton from "./components/ServerButton";
import AddServerButton from "./components/AddServerButton";
import SettingButton from "./components/SettingButton";

const StyledAside = styled.aside`
  background-color: ${colors['background raised']};
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
  background-color: red;
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

export default function Home() {
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
          test
        </StyledMainContent>
        <StyledArticle>
          article
        </StyledArticle>
      </FlexContainer>
    </AppContainer>
  );
}
