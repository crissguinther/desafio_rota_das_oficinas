import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

// Context
import { CalculatorContext } from '../pages/Calculator/Context';

// Pages
import Calculator from '../pages/Calculator';
import Converter from '../pages/Converter';
import GameOfLife from '../pages/GameOfLife';
import Homepage from '../pages/Homepage';

export default function Routes() {
  const [foodTable, setFoodTable] = useState([]);
  const [clientTable, setClientTable] = useState([]);

  return (
    <Switch>
      <CalculatorContext.Provider value={{ foodTable, setFoodTable, clientTable, setClientTable }}>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/converter" component={Converter} />
        <Route exact path="/game-of-life" component={GameOfLife} />
        <Route exact path="/calculator" component={Calculator} />
      </CalculatorContext.Provider>
    </Switch>
  );
}
