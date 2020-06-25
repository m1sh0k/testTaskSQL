import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Films extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list:[]
        };
    };
    componentDidMount() {
        fetch('/films',{method:'post'})
            .then(res => res.json())
            .then(actorsList => {
                const list = actorsList.rows;
                this.setState({ list })
            })
    }


    render() {
        const { list } = this.state;
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
            <div className="users">
                {list && list.length !== 0 ?
                    list.map((itm,i)=><li className="userItm" key={i}>ID:{itm.film_id} title:{itm.title} description: {itm.description}</li>) : ""
                }
            </div>
        </div>

        )
    }
}

export default Films;
