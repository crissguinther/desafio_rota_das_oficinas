import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { Button, Input } from '../../styles/globalStyles';

// Context
import { CalculatorContext } from '../../pages/Calculator/Context';

// Utils
import stateGenerator from '../../utils/stateGenerator';

export default function ClientTable() {
  const { clientTable, setClientTable, foodTable } = useContext(CalculatorContext);

  const [client, setClient] = useState({
    name: '',
    consumed: [],
    tax: 0
  });

  const clear = () => {
    setClient({
      name: '',
      consumed: [],
      tax: 0
    });
  };

  const handleAddClient = () => {
    if (!client.name) {
      toast.error('Nome não pode estar vazio');
      return;
    }
    const exists = clientTable.findIndex((c) => c.name === client.name);
    if (exists !== -1) {
      toast.error('Cliente já adicionado');
      return;
    }
    setClientTable((c) => {
      return stateGenerator(c, (newC) => {
        newC.push(client);
      });
    });
    clear();
  };

  const handleAddFood = (name, food) => {
    let n = clientTable.filter((c) => c.name === name);

    if (n[0].consumed.indexOf(food) === -1) n[0].consumed.push(food);
    else n[0].consumed.splice(n[0].consumed.indexOf(food), 1);

    setClientTable((clients) => {
      return stateGenerator(clients, (newList) => {
        newList.slice(newList.indexOf(n), 1, n);
      });
    });
  };

  const handleOnChange = ({ target: { name, value } }) => {
    setClient((c) => {
      return stateGenerator(c, (newC) => {
        newC[name] = value;
      });
    });
  };

  const handleOnDelete = (name) => {
    const newList = clientTable.filter((c) => c.name !== name);
    setClientTable(newList);
  };

  const handleTaxChange = ({ target: { value } }) => {
    let n = clientTable.filter((c) => c.name === value);

    if (n[0].tax === 0) n[0].tax = 1;
    else n[0].tax = 0;

    setClientTable((clients) => {
      return stateGenerator(clients, (newList) => {
        newList.slice(newList.indexOf(n), 1, n);
      });
    });
  };

  return (
    foodTable.length > 0 && (
      <div>
        <h3>Clientes</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Consumidos</th>
              <th>Pagará taxa</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {clientTable.length > 0 &&
              clientTable.map((client) => {
                return (
                  <>
                    <tr key={client.name}>
                      <td>{client.name}</td>
                      <td>
                        {foodTable.map((food) => {
                          return (
                            <>
                              <label>
                                <input
                                  type="checkbox"
                                  value={food.name}
                                  onChange={() => handleAddFood(client.name, food.name)}
                                />
                                {food.name}
                              </label>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        <label>
                          <input type="checkbox" value={client.name} onChange={handleTaxChange} />
                          Pagará taxa
                        </label>
                      </td>
                      <td>
                        <Button onClick={() => handleOnDelete(client.name)}>Deletar</Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            <tr>
              <td>
                <Input
                  type="text"
                  name="name"
                  value={client.name}
                  placeholder="Nome do cliente"
                  onChange={handleOnChange}
                />
              </td>
              <td>
                <Button type="button" onClick={handleAddClient}>
                  Adicionar
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <ToastContainer autoClose={500} />
      </div>
    )
  );
}
