import React, { Component } from 'react';
import { Table, FlexboxGrid, InputGroup, Input, Icon } from 'rsuite';
import { Panel, PanelGroup} from 'rsuite';
import Pedido from './Pedido';
import ListaPedidos from './ListaPedidos';

const { Column, HeaderCell, Cell, Pagination } = Table;

class Pedidos extends Component {
    state = { pedidos:[], encontrados:[]}
    componentDidMount() {
        this.props.db.onSnapshot((querySnapshot)=>{
            var pedidos = []
            querySnapshot.forEach(function(doc){
                const data = doc.data()
                data.id = doc.id
                let fechapedido
                if(typeof data.fecha == "string") fechapedido = new Date(data.fecha)
                else fechapedido = data.fecha.toDate()
                
                if(this.props.filter.field == "fecha"){
                    let hoy = new Date()
                    if(fechapedido.getUTCDate()<=hoy.getUTCDate() && fechapedido.getUTCMonth() <= hoy.getUTCMonth() && data.estado=="Pendiente"){
                        pedidos.push(data)
                    }
                }
                else if(this.props.filter.field == "estado"){
                    if(data.estado == this.props.filter.value){
                        pedidos.push(data)
                    }
                }
            }.bind(this))
            this.setState({pedidos: pedidos})
            this.setState({encontrados: pedidos})
        })
    }
    buscar = (value) => {
        if(value!=''){
            let encontrado = this.state.pedidos.filter(pedido => pedido.nombre.toLowerCase().includes(value.toLowerCase()) || pedido.cedula.includes(value))
            this.setState({encontrados: encontrado})
        }else{
            this.setState({encontrados: this.state.pedidos})
        }

    }
    render() { 
        return ( <div style={{textAlign:"left"}}>
            <InputGroup size="lg"style={{
                borderRadius:"0", 
                borderTop:"none", 
                borderRight:"none",
                borderLeft:"none"}}  
            >
                <Input placeholder="Buscar por cédula o nombre..." onChange={(value)=>this.buscar(value)}/>
                <InputGroup.Button style={{borderRadius:"0"}}>
                <Icon icon="search" />
                </InputGroup.Button>
            </InputGroup>
            <ListaPedidos pedidos={this.state.encontrados} db={this.props.db}/>
        </div> );
    }
}
 
export default Pedidos;