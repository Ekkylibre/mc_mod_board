import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: white;
  height: 60px;
`;

export default function SettingButton() {
  return (
    <Button>
      <FaCog />
    </Button>
  );
}
