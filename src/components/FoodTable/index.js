import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import { Button, Input } from '../../styles/globalStyles';

// Context
import { CalculatorContext } from '../../pages/Calculator/Context';

// Utils
import stateGenerator from '../../utils/stateGenerator';

export default function FoodTable() {
  const { foodTable, setFoodTable } = useContext(CalculatorContext);

  const [food, setFood] = useState({
    name: '',
    price: '',
    quantity: ''
  });

  const handleAddFood = () => {
    if (!food.name || !food.price || !food.quantity) {
      toast.error('Todos os campos devem ser preenchidos');
      return;
    }
    const exists = foodTable.findIndex((f) => f.name === food.name);
    if (exists !== -1) {
      toast.error('Comida já adicionada');
      return;
    }
    setFoodTable((curr) => {
      return stateGenerator(curr, (newL) => {
        newL.push(food);
      });
    });
    clear();
  };

  const handleDelete = (name) => {
    const n = foodTable.filter((food) => food.name !== name);
    setFoodTable(n);
  };

  const clear = () => {
    setFood({ name: '', price: '', quantity: '' });
  };

  const handleOnChange = ({ target: { name, value } }) => {
    const n = { ...food };

    if (
      (name === 'price' && !Number(value) && value !== '') ||
      (name === 'quantity' && !Number(value) && value !== '')
    ) {
      toast.error('Valor precisa ser um número');
      clear();
      return;
    }
    if (name === 'price') {
      n['price'] = value.includes(',') ? Number(value.replace(',', '.')) : Number(value);
    } else {
      n[name] = value;
    }
    setFood(n);
  };

  return (
    <div>
      <h3>Comidas</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {foodTable.length > 0 &&
            foodTable.map((food) => {
              return (
                <>
                  <tr key={food.name}>
                    <td>{food.name}</td>
                    <td>{food.price}</td>
                    <td>{food.quantity}</td>
                    <td>
                      <Button onClick={() => handleDelete(food.name)}>Deletar</Button>
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
                value={food.name}
                placeholder="Nome da comida"
                onChange={handleOnChange}
              />
            </td>
            <td>
              <Input
                type="text"
                name="price"
                value={food.price}
                placeholder="Valor da comida"
                onChange={handleOnChange}
              />
            </td>
            <td>
              <Input
                type="text"
                name="quantity"
                value={food.quantity}
                placeholder="Quantidade"
                onChange={handleOnChange}
              />
            </td>
            <td>
              <Button type="button" onClick={handleAddFood}>
                Adicionar
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer autoClose={500} />
    </div>
  );
}
