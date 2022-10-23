import styled from 'styled-components';

// Colors
import { TextColor } from '../../config/colors';

export const GameBoard = styled.main`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 20px);
  max-width: 90vw;
  justify-content: center;
  margin: 1em auto;
`;

export const Cell = styled.div`
  border: 1px solid ${TextColor};
  height: 20px;
  width: 20px;
  background-color: ${(props) => (props.isAlive ? `${TextColor}` : '#000')};
  cursor: pointer;
`;
