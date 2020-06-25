import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Switch, Route, Redirect, HashRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import Actors from './actors.js'
import Films from './films.js'



const Main = () => (
    <BrowserRouter>
        <Switch>
                <Route exact path='/' component={App}/>
                <Route path="/actors" render={(props) => (<Actors/>)} />
                <Route path="/films" render={(props) => (<Films/>)} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<Main />,document.getElementById('root'));



if(module.hot) {module.hot.accept();}
