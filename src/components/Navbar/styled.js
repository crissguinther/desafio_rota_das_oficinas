import styled from 'styled-components';

// Colors
import { LightPurple, MediumPurple, Purple, TextColor } from '../../config/colors';

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${LightPurple};

  a {
    color: ${TextColor};
    text-decoration: none;
    background-color: ${Purple};
    font-weight: bold;
    padding: 20px;
    margin: 0 5px;

    @media screen and (max-width: 600px) {
      font-size: 0.6em;
    }
  }

  a:hover {
    background-color: ${MediumPurple};
    transition: background-color 0.3s ease-in;
  }
`;
