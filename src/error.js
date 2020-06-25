import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Error extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    };

//get props: this.props.location.state.err
    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Link to={'./actors'}>
                    <button >ACTORS</button>
                </Link>
                <Link to={'./films'}>
                    <button >FILMS</button>
                </Link>
                <Link to={'./'}>
                    <button >MAIN</button>
                </Link>
                <div className="errMessage">
                    {this.props.location.state.err ? this.props.location.state.err : "NO Error Message"}
                </div>
            </div>
        )
    }
}

export default Error;
