import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Stats from '../containers/Stats';

const App = () => (
  <>
    <main>
      <Switch>
        <Route path="/react-catalogue/" component={Home} exact />
        <Route path="/react-catalogue/pokemonid/:id" component={Stats} />
      </Switch>
    </main>
  </>
);

export default App;
