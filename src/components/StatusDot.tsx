import styled from 'styled-components';

const Dot = styled.div<{ $isActive: boolean }>`
  width: 12px; /* ajustez la taille si nécessaire */
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? 'green' : 'red')};
  display: inline-block;
  margin-left: 10px;
`;

type DotProps = {
    isActive: boolean;
}

const StatusDot: React.FC<DotProps> = ({ isActive }) => {
    return <Dot $isActive={isActive} />;
};

export default StatusDot;
