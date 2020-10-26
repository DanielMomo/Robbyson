import React, { Component } from 'react'
import {Consumer} from '../context'

export default class Todo extends Component {
    state = {
        edit: false,
        editValue: "",
        editDate: ""
    }
    style =()=>{
        const {done, hide} = this.props.todo;
        return {textDecoration: done ? "line-through" : "none", display: hide ? "none" : "block"}
    }
    styleCanArchive =()=>{
        const {done} = this.props.todo;
        return {display: done ? "block" : "none" }
    }
    styleEdit =()=>{
        return {display: this.state.edit ? "block" : "none"}
    }
    styleNotEdit =()=>{
        return {display: this.state.edit ? "none" : "block"}
    }
    checked =()=>{
        const {done} = this.props.todo;
        return done ? "checked" : ""
    }
    toggle = (id, dispatch)=>{
        dispatch({type:"TOGGLE", payload:id})
    }
    archive = (id, dispatch)=>{
        dispatch({type:"ARCHIVE", payload:id})
    }
    save = (id, dispatch)=>{
        this.setState({
            edit: !this.state.edit,
            editValue: this.state.editValue,
            editDate: this.state.editDate,
        });
        dispatch({type:"SAVE", payload:id, description: this.state.editValue, duedate: this.state.editDate})
    }
    edit = (e)=>{
        this.setState({
            edit: this.state.edit,
            editValue: e.target.value,
            editDate: this.state.editDate,
        });
    }
    editDate = (e)=>{
        this.setState({
            edit: this.state.edit,
            editValue: this.state.editValue,
            editDate:  e.target.value
        });
    }
    cancel = (id, dispatch)=>{
        const {description, duedate} = this.props.todo;
        this.setState({
            edit: !this.state.edit,
            editValue: description,
            editDate: duedate,
        });
    }
    enable = (id, dispatch)=>{
        const {description, duedate} = this.props.todo;
        this.setState({
            edit: !this.state.edit,
            editValue: description,
            editDate: duedate,
        });
    }
    remove = (id, dispatch)=>{
        const confirmDel = window.confirm("Deseja realmente deletar?")
        if(confirmDel){
            dispatch({type:"REMOVE", payload:id})
        }
    }
    render() {
        const {description, duedate, _id} = this.props.todo;
        return (
            <Consumer>{value=>{
                const {dispatch} = value;
                return <h3 className='text-dark text-center p-1 bg-light border-bottom' style={this.style()}>
                    <div style={{ display: (this.state.edit ? 'none' : 'block') }}>
                        <i className='far fa-times-circle fa-sm float-left m-1 text-danger' onClick={this.remove.bind(this, _id, dispatch)}></i>
                        <input type="checkbox" className='m-2 float-right' onChange={this.toggle.bind(this,_id,dispatch)} defaultChecked={this.props.todo.done} />
                        <i className='fas fa-archive fa-sm float-left m-1 text-warning' onClick={this.archive.bind(this, _id, dispatch)} style={this.styleCanArchive()}></i>{description}
                        <span className='duedate'> {duedate}</span>
                        <i className='fas fa-edit fa-sm float-left m-1' onClick={this.enable.bind(this, _id, dispatch)}></i>
                    </div>
                    <div style={{ display: (this.state.edit ? 'block' : 'none') }}>
                        <input type="text" className="rounded-0 m-1" placeholder='Tarefa...' onChange={this.edit} value={this.state.editValue}/>
                        <input type="date" className="rounded-0 m-1" onChange={this.editDate} value={this.state.editDate}/>
                        <i className='fas fa-ban fa-sm float-right m-1' onClick={this.cancel.bind(this, _id, dispatch)}></i>
                        <i className='fas fa-check-circle fa-sm float-right m-1' onClick={this.save.bind(this, _id, dispatch)}></i>
                    </div>
                </h3>
            }}</Consumer>
        )
    }
}
