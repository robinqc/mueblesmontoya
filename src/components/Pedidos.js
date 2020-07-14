import React, { Component } from 'react';
import {InputGroup, Input, Icon, FlexboxGrid } from 'rsuite';
import ListaPedidos from './ListaPedidos';
import NuevoPedido from './NuevoPedido';


class Pedidos extends Component {
    state = { pedidos:[], encontrados:[], productos:[]}
    componentDidMount() {
        this.props.db.onSnapshot((querySnapshot)=>{
            var pedidos = []
            querySnapshot.forEach(function(doc){
                const data = doc.data()
                data.id = doc.id
                let fechapedido
                if(typeof data.fecha == "string") fechapedido = new Date(data.fecha)
                else fechapedido = data.fecha.toDate()
                if(data.productos) data.producto = data.productos.map(producto => producto.nombre).join(", ")
                
                data.fechaformat = fechapedido
                
                if(this.props.filter){
                    if(this.props.filter.field == "fecha"){
                        let hoy = new Date()
                        if(fechapedido.getUTCDate()<=hoy.getUTCDate() && fechapedido.getUTCMonth() <= hoy.getUTCMonth() && data.estado=="Pendiente"){
                            pedidos.push(data)
                        }
                    }
                    else if(this.props.filter.field == "estado"){
                        let hoy = new Date()
                        if(data.estado == this.props.filter.value && fechapedido.getUTCMonth() == hoy.getUTCMonth()){
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
        this.props.db2.collection("articulos").onSnapshot((querySnapshot)=>{
            var articulos = []
            querySnapshot.forEach(function(doc){
                const data = doc.data()
                data.label = `${data.nombre} - $${data.precio}`
                data.value = doc.id
                articulos.push(data)
            }.bind(this))
            this.setState({productos: articulos}, ()=>console.log(this.state.productos))
            
        })
    }
    buscar = (value) => {
        if(value!=''){
            let encontrado = this.state.pedidos.filter(pedido => 
                pedido.nombre.toLowerCase().includes(value.toLowerCase()) 
            || pedido.cedula.includes(value) 
            || pedido.telefono.includes(value)
            || pedido.producto.toLowerCase().includes(value)
            || pedido.direccion.toLowerCase().includes(value))
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
                    <Input placeholder="Buscar por cédula, nombre, producto, dirección..." onChange={(value)=>this.buscar(value)} style={{height:"7vh"}}/>
                    
                </InputGroup>
                <ListaPedidos pedidos={this.state.encontrados} db={this.props.db}/>
                </FlexboxGrid.Item>
                <NuevoPedido db={this.props.db} productos={this.state.productos}/>
            </FlexboxGrid>);
    }
}
 
export default Pedidos;