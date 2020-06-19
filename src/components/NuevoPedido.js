import React, { Component } from 'react';
import { FormGroup, FlexboxGrid, Form, FormControl, ControlLabel, DatePicker, Button, ButtonToolbar } from 'rsuite';

class NuevoPedido extends Component {
    state = { 
        formValue: {
            nombre: '',
            cedula: '',
            telefono: '',
            direccion: '',
            producto: '',
            fecha: undefined,
            total: ''
        }
    }

    handleChange = (value) => {
        let change = value
        console.log(value)
        this.setState({
        formValue: value
    })
    }

    nuevopedido = () => {
        let info = this.state.formValue
        if(info.fecha!==undefined){
            info.cedula = this.state.formValue.cedula.replace(/\s|\$|\./g,'')
            info.total = this.state.formValue.total.replace(/\s|\$/g,'')
            info.estado = "Pendiente"
            this.props.db.add(info).then(()=>{
                this.setState({formValue: {
                    nombre: '',
                    cedula: '',
                    telefono: '',
                    direccion: '',
                    producto: '',
                    total: ''
                }})
            })
        }
    }

    render() { 
        return ( 
            <FlexboxGrid.Item colspan={8} style={{height:"92vh", backgroundColor:"#F4F5F7"}}>
                            <h4 style={{padding:"10px"}}>Nuevo pedido</h4>
                            <Form fluid 
                                style={{ padding:"0 20px", textAlign:"left"}}
                                onChange={this.handleChange}
                                formValue={this.state.formValue}
                            >
                                <FormGroup>
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl name="nombre" />
                                </FormGroup>
                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <ControlLabel>Cédula</ControlLabel>
                                            <FormControl name="cedula" type="text" />
                                        </FormGroup>
                                
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <ControlLabel>Teléfono</ControlLabel>
                                            <FormControl name="telefono" type="telefono" />
                                        </FormGroup>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                                <hr style={{margin:"2vh"}}/>
                                <FormGroup>
                                    <ControlLabel>Dirección</ControlLabel>
                                    <FormControl rows={3} name="direccion" componentClass="textarea" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Producto</ControlLabel>
                                    <FormControl rows={3} name="producto" componentClass="textarea" />
                                </FormGroup>
                                <hr style={{margin:"2vh"}}/>

                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <ControlLabel>Precio</ControlLabel>
                                            <FormControl name="total" type="number" />
                                        </FormGroup>
                                
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <ControlLabel>Fecha de entrega</ControlLabel>
                                            <FormControl 
                                            accepter={DatePicker}
                                            name="fecha"
                                            label="Create Date"
                                            placement="leftEnd"
                                            locale={{
                                                sunday: "Dom",
                                                monday: "Lun",
                                                tuesday: "Mar",
                                                wednesday: "Mié",
                                                thursday: "Jue",
                                                friday:"Vie",
                                                saturday:"Sáb",
                                                today: "Hoy",
                                                yesterday:"Ayer"
                                            }}/>
                                            
                                        </FormGroup>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                                <hr/>
                                
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button appearance="primary" onClick={this.nuevopedido}>Guardar</Button>
                                        <Button appearance="default">Cancelar</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
         );
    }
}
 
export default NuevoPedido;