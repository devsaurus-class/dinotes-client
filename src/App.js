import React from 'react';
import { Route, Switch } from 'react-router-dom';
import tw, { GlobalStyles } from 'twin.macro';
import HomePage from './pages/Home';
import AddPage from './pages/Add';
import EditPage from './pages/Edit';

const Container = tw.div`text-center`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <Container>
        <Switch>
          <Route path='/add'>
            <AddPage />
          </Route>
          <Route path='/edit/:id'>
            <EditPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
