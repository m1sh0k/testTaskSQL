import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Actors extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectModMsgList:[],
            list:[],
            //
            writeNewActor: false,
            firstName: "",
            lastName: "",
        };
    };

    componentDidMount() {
        fetch('/actors',{method:'post'})
            .then(res => res.json())
            .then(actorsList => {
                const list = actorsList.rows;
                //console.log("list: ",list);
                this.setState({ list })
            })
    };

    toggle = (stateName) => {
        this.setState({[stateName]: !this.state[stateName]})
    };

    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    };

    sendDataNewActor = async () => {
        try {
            console.log("firstName: ",this.state.firstName,"lastName: ",this.state.lastName);
            let data = {'firstName': this.state.firstName, 'lastName':this.state.lastName};
            let res = await fetch('/addActors', {
                method: 'post',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(data),
            });
            if (res.ok) {
                res = await res.json();
                console.log("sendDataNewActor row: ", res.rows);
                this.setState({
                    list:res.rows,
                    firstName: "",
                    lastName: "",
                });
            } else {
                console.log("sendDataNewActor err: ", res);
                this.setState({
                    err: res,
                    errorRedirect: true
                });
            }


        } catch (err) {
            console.og("sendDataNewActor error: ", err);
            this.setState({ errorRedirect: true });
            this.setState({err: res});
        }
    };

    checkboxMsg =(id)=> {
        console.log('checkboxMsg msgId: ',id);
        if(this.state.selectModMsgList.includes(id)){
            let msgList = this.state.selectModMsgList;
            let idx = msgList.indexOf(id);
            msgList.splice(idx, 1);
            this.setState({selectModMsgList: msgList});
            if(msgList.length === 0)  this.setState({
                selectMode:false,
            });

        } else this.setState({
            selectModMsgList: [...this.state.selectModMsgList, id],
        })
    };

    dellActors = async()=> {
        try {

            let data = {'idArray': this.state.selectModMsgList};
            let res = await fetch('/deleteActorsByIdArray', {
                method: 'post',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(data),
            });
            if (res.ok) {
                res = await res.json();
                console.log("sendDataNewActor row: ", res.rows);
                this.setState({
                    list:res.rows,
                    selectMode:false,
                });
            } else {
                console.log("dellActors err: ", res);
                this.setState({
                    err: res,
                    errorRedirect: true,
                    selectMode:false,
                });
            }


        } catch (err) {
            console.og("sendDataNewActor error: ", err);
            this.setState({ errorRedirect: true });
            this.setState({err: res});
        }
    };

    render() {
        const { list } = this.state;
        console.log("actor state: ",this.state);
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
                <button className="buttons" onClick={() => this.toggle("writeNewActor")}>ADD ACTOR</button>
                {
                    this.state.writeNewActor ? <div className="sendData">
                        <input name="firstName" className="form-input" id="inputFirstName" placeholder="First Name"
                               onChange={this.handleChange}/>
                        <input name="lastName" className="form-input" id="inputLastName" placeholder="Last Name"
                               onChange={this.handleChange}/>
                        <button className="buttons" onClick={() => this.sendDataNewActor()}>Write New Actor</button>
                    </div> : ""
                }
                {this.state.selectModMsgList.length !== 0 ? <button className="buttons" onClick={() => this.dellActors()}>DELL ACTOR</button> : ""
                }
                <div className="users">
                    {list && list.length !== 0 ?
                        list.map((itm,i)=> <div key={i} className="userItm">
                            <input id={`${itm.actor_id}`} type="checkbox" name="msgCB" className="invisible"
                                   onChange={ev => (this.checkboxMsg(itm.actor_id))}/>
                            <li  >{itm.actor_id} {itm.first_name} {itm.last_name}</li>
                        </div> ) : ""
                    }
                </div>
            </div>


        )
    }
}

export default Actors;
