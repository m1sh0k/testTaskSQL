import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Error from './error'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //redirect
            actorsRedirect: false,
            filmsRedirect: false,
            errRedirect: false,
        }
    }






    render() {
        console.log('app: ',this.state);
        //passing props in Redirect to={{pathname:'/error',state:{error:this.state.err}}} get props: this.props.location.state.error
        if (this.state.errRedirect) {
            return <Redirect to={{pathname:'/error',state:{error:this.state.err}}}/>;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Link to={'./actors'}>
                    <button className="buttons">ACTORS</button>
                </Link>
                <Link to={'./films'}>
                    <button className="buttons">FILMS</button>
                </Link>



            </div>
        );
    }
}

export default App;
