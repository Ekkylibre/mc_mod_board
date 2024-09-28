"use client";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {

  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Roboto, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default GlobalStyle;
