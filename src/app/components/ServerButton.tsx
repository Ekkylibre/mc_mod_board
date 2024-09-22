import styled from 'styled-components';
import { colors } from '../theme';

const StyledButton = styled.button`
  background-color: ${colors['background raised']};
  color: white;
  border: 2px solid ${colors['button border']};
  border-radius: 10px;
  width: auto; /* Définit la largeur */
  height: 50px; /* Définit la hauteur pour le rendre carré */
  font-size: 16px;
  cursor: pointer;
  padding: 10px; /* Ajoute du padding à l'intérieur */
`;

export default function ServerButton() {
  return (
    <StyledButton>A</StyledButton>
  );
}
