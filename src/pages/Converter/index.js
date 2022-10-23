import React, { useCallback, useState } from 'react';
import { Button } from '../../styles/globalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled
import { Container } from './styled';
import { Input } from '../../styles/globalStyles';

export default function Converter() {
  const romanDigit = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let romanOperations = {
    MMM: 3000,
    MM: 2000,
    M: 1000,
    CM: 900,
    DCCC: 800,
    DCC: 700,
    DC: 600,
    CD: 400,
    CCC: 300,
    CC: 200,
    XC: 90,
    LXXX: 80,
    LXX: 70,
    LX: 60,
    XL: 40,
    XXX: 30,
    XX: 20,
    IX: 9,
    VIII: 8,
    VII: 7,
    VI: 6,
    IV: 4,
    III: 3,
    II: 2,
    ...romanDigit
  };

  romanOperations = Object.fromEntries(
    Object.entries(romanOperations).sort(([, a], [, b]) => a < b)
  );

  const [state, setState] = useState({
    arabic: '',
    roman: ''
  });

  const changeState = (current, cb) => {
    const newState = JSON.parse(JSON.stringify(current));
    cb(newState);
    return newState;
  };

  const clear = () => {
    setState((state) => {
      return changeState(state, (clean) => {
        clean.roman = '';
        clean.arabic = '';
      });
    });
  };

  const handleOnChange = ({ target: { name, value } }) => {
    clear();
    if (name === 'arabic') {
      if (value > 3999 || value === 0 || !Number(value)) {
        clear();
        toast.error('Número deve ser entre 1 e 3999');
        return;
      }
    }
    if (name === 'roman') {
      value = value.toUpperCase();
      if (Number(value) || !Object.prototype.hasOwnProperty.call(romanDigit, value.slice(-1))) {
        toast.error('Número precisa ser em algarismo romano');
        clear();
        return;
      }
    }
    setState((current) => {
      return changeState(current, (newState) => {
        newState[name] = value;
      });
    });
  };

  const convert = useCallback(() => {
    Object.entries(state).forEach(([key, value]) => {
      if (key === 'roman' && value.match(/^([a-zA-Z])\1{3}/)) {
        toast.error('Número inválido');
        clear();
        return;
      }
      if (key === 'roman') {
        const romanStr = value.split('');
        const result = romanStr.reduce((acc, char, ind) => {
          const currentVal = romanOperations[char];
          const prevVal = romanOperations[romanStr[ind - 1]];

          if (prevVal && prevVal < currentVal) acc += currentVal - prevVal * 2;
          else acc += currentVal;
          return acc;
        }, 0);
        setState((current) => {
          return changeState(current, (newState) => {
            newState['arabic'] = result;
          });
        });
      }
      if (key === 'arabic') {
        const result = Object.entries(romanOperations).reduce(
          (acc, item, ind) => {
            let val = Number(value[ind] && value[ind].padEnd(value.length - ind, '0'));

            for (let i = 0; i < Object.entries(romanOperations).length; i++) {
              if (!val) continue;
              const [k, v] = Object.entries(romanOperations)[i];
              if (v === val) {
                acc.result = acc.result.concat(k);
                val ? (acc.left -= val) : (acc.left -= 0);
              }
              if (acc.left === 0) break;
            }

            return acc;
          },
          { result: '', left: Number(value) }
        );
        setState((current) => {
          return changeState(current, (newState) => {
            newState['roman'] = result.result;
          });
        });
      }
    });
  }, [state]);

  return (
    <Container>
      <label htmlFor="arabic">Texto Arábico</label>
      <Input
        onChange={handleOnChange}
        value={state.arabic}
        type="text"
        name="arabic"
        placeholder="Exemplo: 000"
      />
      <label htmlFor="romam">Texto Romano</label>
      <Input
        onChange={handleOnChange}
        value={state.roman}
        type="text"
        name="roman"
        placeholder="Exemplo: VII"
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={convert}>Converter</Button>
        <Button onClick={clear}>Limpa</Button>
      </div>
      <ToastContainer autoClose={1000} />
    </Container>
  );
}
