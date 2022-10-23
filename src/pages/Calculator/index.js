import React, { useCallback, useContext, useRef, useState } from 'react';

// Components
import { Button } from '../../styles/globalStyles';
import ClientTable from '../../components/ClientTable';
import FoodTable from '../../components/FoodTable';

// Context
import { CalculatorContext } from './Context';

export default function Calculator() {
  const { foodTable, clientTable } = useContext(CalculatorContext);

  const clientRef = useRef(null);
  clientRef.current = clientTable;

  const foodRef = useRef(null);
  foodRef.current = foodTable;

  const [payment, setPayment] = useState({});

  const getFoodCount = useCallback(() => {
    if (!clientRef.current) return;
    const n = clientRef.current.reduce((acc, client) => {
      client.consumed.forEach((food) => {
        if (!acc[food]) acc[food] = 1;
        else acc[food] += 1;
      });

      return acc;
    }, {});
    return n;
  }, []);

  const getFoodValues = useCallback(() => {
    if (!foodRef.current) return;
    const values = foodRef.current.reduce((acc, food) => {
      acc[food.name] = food.price * food.quantity;
      return acc;
    }, {});
    return values;
  }, []);

  const count = () => {
    const count = getFoodCount();
    const values = getFoodValues();

    const individualPrice = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = value / count[key];
      return acc;
    }, {});

    const result = clientRef.current.reduce((acc, client) => {
      let total = 0;
      client.consumed.forEach((food) => {
        total += individualPrice[food];
      });
      if (client.tax === 1) total += total / 10;
      acc[client.name] = total;
      return acc;
    }, {});
    setPayment(result);
  };

  return (
    <>
      <FoodTable />
      <ClientTable />

      {Object.entries(payment).length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome do Cliente</th>
              <th>Total a pagar</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(payment).map(([key, v]) => {
              return (
                <>
                  <tr>
                    <td>{key}</td>
                    <td>{v}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}

      {Object.entries(clientTable).length > 0 && (
        <>
          <Button type="button" onClick={count}>
            Contar
          </Button>
        </>
      )}
    </>
  );
}
