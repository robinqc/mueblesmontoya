import React, { Component } from 'react';
import { FlexboxGrid } from 'rsuite';
import Pedido from './Pedido';

class ListaPedidos extends Component {
    state = {  }
    render() { 
        return ( 
            <FlexboxGrid justify="space-around" style={{height:"86vh", overflowY:"scroll", paddingTop:"3vh"}}>
                {
                    this.props.pedidos.map(pedido=>(
                        <Pedido 
                            key={pedido.id}
                            id={pedido.id}
                            nombre={pedido.nombre}
                            cedula={pedido.cedula}
                            telefono={pedido.telefono}
                            direccion={pedido.direccion}
                            producto={pedido.producto}
                            fecha={pedido.fecha}
                            estado={pedido.estado}
                            total={pedido.total}
                            db={this.props.db}
                        />
                    ))
                }
            </FlexboxGrid>
         );
    }
}
 
export default ListaPedidos;