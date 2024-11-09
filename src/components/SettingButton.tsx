import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';
import { colors } from '../theme';

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${colors['darker text']};
  width: auto;
  height: auto;
`;

export default function SettingButton() {
  return (
    <Button>
      <FaCog />
    </Button>
  );
}
