import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';




class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
        console.log('app: ');
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
                <div className="main-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
