import styled, { createGlobalStyle } from 'styled-components';
import { Purple, LightPurple, MediumPurple, TextColor } from '../config/colors';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    body {
        width: 100vw;
        min-height: 100vh;
        background-color: ${LightPurple};
        color: ${TextColor};

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1,h2,h3,h4,h5,h6 {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    table {
      width: 100%;

      thead {
        background-color: ${MediumPurple};
      }

      td {
        text-align: center;
        background-color: ${Purple};
      }

      input[type="checkbox"] {
        margin: auto 5px;
      }

      @media screen and (max-width: 850px) {
        thead {
          display: none;
        }

        tr {
          background-color: ${Purple};
        }

        td {
          border-bottom: 1px solid ${TextColor};
          vertical-align: center;
          padding-right: 10px;
          padding-top: 5px;
          padding-bottom: 5px;
        }

        tbody, tr,td {
          display: block;
          width: 100%;
          text-align: right;
          margin: 10px auto;
        }
      }
    }

`;

export default GlobalStyle;

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${LightPurple};
  font-weight: bold;
  padding: 10px;
  margin: 5px 2px;
  border: 1px solid ${Purple};
  border-radius: 5px;
`;

export const Input = styled.input`
  all: unset;
  border: 1px solid ${TextColor};
  margin: 10px auto;
  color: ${TextColor};
  padding: 7px 3px;
  margin: 15px;
`;
