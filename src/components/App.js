import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import Stats from '../containers/Stats';

const App = () => (
  <>
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/pokemonid/:id" component={Stats} />
      </Switch>
    </main>
  </>
);

export default App;
