import React, { Component } from 'react'
import axios from 'axios'
const Context = React.createContext()

const reducer = (prevState, action)=>{
    switch(action.type) {
        case "TOGGLE":
            return {
                todos: prevState.todos.map(t => {
                    var temp = Object.assign({}, t);
                    if(temp._id===action.payload) {
                        temp.done = !t.done
                        axios.put(`/todos/${action.payload}`, temp)
                    }; 
                    return temp;
                })
            };
        case "ARCHIVE":
            return {
                todos: prevState.todos.map(t => {
                    var temp = Object.assign({}, t);
                    if(temp._id===action.payload) {
                        temp.hide = !t.hide
                        axios.put(`/todos/${action.payload}`, temp)
                    }; 
                    return temp;
                })
            };
        case "SAVE":
            console.log(action);
            return {
                todos: prevState.todos.map(t => {
                    var temp = Object.assign({}, t);
                    if(temp._id===action.payload) {
                        temp.description = action.description
                        temp.duedate = action.duedate
                        axios.put(`/todos/${action.payload}`, temp)
                    }; 
                    return temp;
                })
            };
        case "REMOVE":
            axios.delete(`/todos/${action.payload}`);
            return {
                todos:prevState.todos.filter(todo=>todo._id !==action.payload)   
            }
        case "ADD":
            return {
                todos: [...prevState.todos , action.payload]
            }
        default:
            console.log(action);
            return prevState
    }
}
export class Provider extends Component {
    state = {
        todos: [],
        showhidden: false,
        dispatch:(action)=> this.setState(
            prevState => reducer(prevState, action)
        )
    }
    componentDidMount(){
        axios.get('/todos')
        .then(res=>this.setState({todos:res.data}))
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;