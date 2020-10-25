import React, { Component } from 'react'
import {Consumer} from '../context'

export default class Showarchivedtodo extends Component {
    update=(e)=>{
        console.log(this.state);
        this.setState({
            showhidden: !e.target.checked
        })
    }
    render() {
        return (
            <Consumer>{value=>{
                return  <span>
                    Exibir Arquivados
                    <input type="checkbox" className='m-2 float-right' onChange={this.update}/>
                </span>
            }}</Consumer>
        )
    }
}
