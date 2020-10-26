import React, { Component } from 'react';
import Todo from './Todo';
import {Consumer} from '../context';

export default class Todos extends Component {
    state = {
        search: ""
    }
    update=(e)=>{
        this.setState({
            search:e.target.value
        });
    }
    search=(todos)=>{
        return todos.filter(todo=> todo.description.toLowerCase().includes(this.state.search.toLowerCase()));
    }

    render() {
        return (
            <Consumer>
                {value => {
                const { todos } = value;
                return <form>
                <input type="text" className="form-control rounded-0" placeholder='Procurar...' style={{marginBottom: '20px', marginTop: '20px'}}
                 onChange={this.update} value={this.state.search}/>
                {
                    this.search(todos).map(t => <Todo todo={t} key={t._id}></Todo>)
                }
                </form>
            }}</Consumer>
        )
        
    }
}
