import React, { Component } from 'react'
import {Consumer} from '../context'
import axios from 'axios'

export default class Todo extends Component {
    style =()=>{
        const {done, hide} = this.props.todo;
        return {textDecoration: done ? "line-through" : "none", display: hide ? "none" : "visible"}
    }
    toggle = (id, dispatch)=>{
        const {done, hide, description, duedate} = this.props.todo;
        axios.put(`/todos/${id}`, {done: !done, hide: hide, description: description, duedate: duedate})
        dispatch({type:"TOGGLE", payload:id})
    }
    archive = (id, dispatch)=>{
        const {done, hide, description, duedate} = this.props.todo;
        axios.put(`/todos/${id}`, {done: done, hide: hide, description: description, duedate: duedate})
        dispatch({type:"ARCHIVE", payload:id})
    }
    remove = (id, dispatch)=>{
        const confirmDel = window.confirm("Deseja realmente deletar?")
        if(confirmDel){
            axios.delete(`/todos/${id}`)
            dispatch({type:"REMOVE", payload:id})
        }
    }
    render() {
        const {description, _id} = this.props.todo;
        return (
            <Consumer>{value=>{
                const {dispatch} = value;
                return <h3 className='text-dark text-center p-1 bg-light border-bottom' style={this.style()}>
                    <i className='far fa-times-circle fa-sm float-left m-1 text-danger' onClick={this.remove.bind(this, _id, dispatch)}></i>{description}
                    <input type="checkbox" className='m-2 float-right' onChange={this.toggle.bind(this,_id,dispatch)}/>
                    <i className='fas fa-archive fa-sm float-left m-1 text-warning' onClick={this.archive.bind(this, _id, dispatch)}></i>{description}
                </h3>
            }}</Consumer>
        )
    }
}
