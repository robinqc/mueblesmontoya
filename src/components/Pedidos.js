import React, { Component } from 'react';
import {InputGroup, Input, Icon, FlexboxGrid } from 'rsuite';
import ListaPedidos from './ListaPedidos';
import NuevoPedido from './NuevoPedido';


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
                data.fechaformat = fechapedido
                
                if(this.props.filter){
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
                }else{
                    pedidos.push(data)
                }
            }.bind(this))
            let ordenados = pedidos.sort((a,b)=>a.fechaformat - b.fechaformat)
            this.setState({pedidos: ordenados})
            this.setState({encontrados: ordenados})
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
        return ( 
            
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={16} style={{height:"92vh"}}>
                    <InputGroup style={{
                    borderRadius:"0", 
                    borderTop:"none", 
                    borderRight:"none",
                    borderLeft:"none",
                    height:"7vh"}}  
                >
                    <InputGroup.Button style={{borderRadius:"0"}}>
                    <Icon icon="search" />
                    </InputGroup.Button>
                    <Input placeholder="Buscar por cédula o nombre..." onChange={(value)=>this.buscar(value)} style={{height:"7vh"}}/>
                    
                </InputGroup>
                <ListaPedidos pedidos={this.state.encontrados} db={this.props.db}/>
                </FlexboxGrid.Item>
                <NuevoPedido db={this.props.db}/>
            </FlexboxGrid>);
    }
}
 
export default Pedidos;