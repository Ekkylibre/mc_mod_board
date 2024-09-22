"use client";
import NavBar from "./components/NavBar";
import styled from 'styled-components';
import { colors } from "./theme";

const StyledAside = styled.aside`
  background-color: ${colors['background raised']};
  padding: 20px;
  height: 100%;
`;

const StyledMainContent = styled.div`
  background-color: red;
  padding: 10px;
  color: white;
  height: 100%;
  width: 100%;
`;

const StyledArticle = styled.article`
  background-color: yellowgreen;
  flex: 1;
  padding: 20px;
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

export default function Home() {
  return (
    <AppContainer>
      <NavBar />
      <FlexContainer>
        <StyledAside>
          <div>SideBar</div>
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
