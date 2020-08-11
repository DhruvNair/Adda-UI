import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact>
                            <Form />
                        </Route>
                        <Route path="/:id">
                            <Dashboard />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
