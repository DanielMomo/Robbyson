import React, { Component } from 'react'
import {Consumer} from '../context'
import axios from 'axios'

export default class Addtodo extends Component {
    state = {
        id: 0,
        description:"",
        duedate: Date.now(),
        done: false,
        hide: false,
    }
    update=(e)=>{
        this.setState({
            description:e.target.value,
            duedate:this.state.duedate,
            done:this.state.done,
            hide:this.state.hide,
        })
    }
    updateDate=(e)=>{
        this.setState({
            description:this.state.description,
            duedate:e.target.value,
            done:this.state.done,
            hide:this.state.hide,
        })
    }
    add=(dispatch, e)=>{
        e.preventDefault()
        const newTodo = this.state
        axios.post("/todos" , newTodo)
        .then(res=> dispatch({type:"ADD", payload: res.data}))
        this.setState({description:""})
    }
    render() {
        return (
            <Consumer>{value=>{
                const { dispatch } = value
                return  <form onSubmit={this.add.bind(this, dispatch)}>
                <input type="text" className="form-control rounded-0" placeholder='Tarefa...'
                 onChange={this.update} value={this.state.description}/>
                 <input type="date" className="form-control rounded-0"
                  onChange={this.updateDate} value={this.state.duedate}/>
                <button type='submit' className="form-control rounded-0 btn-secondary">Adicionar Tarefa
                </button>
            </form>
            }}</Consumer>
        )
    }
}
