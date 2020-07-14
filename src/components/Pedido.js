import React, { Component } from 'react';
import { Alert, FlexboxGrid, Panel, Button, Form, DatePicker, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, SelectPicker } from 'rsuite';



class Pedido extends Component {
    constructor(props){
        super(props);
        let fech 
        if(typeof this.props.fecha == "string"){
            fech = new Date(this.props.fecha)
        }else{
            fech = this.props.fecha.toDate()
        }
        this.state = {
            formValue: {
                nombre: this.props.nombre,
                cedula: this.props.cedula,
                telefono: this.props.telefono,
                direccion: this.props.direccion,
                producto: this.props.producto,
                fecha: fech,
                total: this.props.total,
                estado: this.props.estado
            },
            show: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleEstado = (value) => {
        this.setState({formValue: {
            ...this.state.formValue,
            estado: value
        }})
    }
    close() {
        this.setState({ show: false });
    }
    open() {
        this.setState({ show: true });
    }
    handleChange(value) {
        let change = value
        this.setState({
            formValue: value
        });
    }
    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getUTCMonth() + 1),
            day = '' + d.getUTCDate(),
            year = d.getUTCFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('/');
      } 
    cambiarEstado = () => {
        if(this.props.estado == "Pendiente" || this.props.estado == "Cambio") this.props.db.doc(this.props.id).set({estado: "Entregado"}, {merge:true})
        else if (this.props.estado == "Entregado") this.props.db.doc(this.props.id).set({estado: "Cambio"}, {merge:true})
    }

    handleProductos = (value) => {
        let formValue = this.state.formValue
        formValue.productos = []
        value.forEach(producto => {
            let pro = this.props.productos.find(prod => prod.value == producto.producto)
            
            
            if(pro!=undefined) {
                pro.nombre = `${producto.cantidad}x ${pro.label}`
                formValue.productos.push(pro)
            }
        })
        this.setState({formValue: formValue}, ()=>console.log(this.state))
    }
    render() { 
        let semana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
        let fecha 
        if(typeof this.props.fecha == "string"){
            fecha = new Date(this.props.fecha)
        }else{
            fecha = this.props.fecha.toDate()
        }
        let dia = fecha.getUTCDay()
        let fechasemana = `${semana[dia]}, ${this.formatDate(fecha)}`
        return (
            <FlexboxGrid.Item colspan={11} style={{marginTop:"1vh", marginBottom:"1vh"}}>
                    <Panel bordered>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={12}>
                                <h5 style={{wordWrap:"break-word"}}>{this.props.nombre}</h5>
                            </FlexboxGrid.Item>    

                            <FlexboxGrid.Item colspan={12}>
                                <h5 style={{textAlign:"right"}}>{`$${this.props.total}`}</h5>
                            </FlexboxGrid.Item>    
                        </FlexboxGrid> 
                        <hr/>
                        <FlexboxGrid>
                            <FlexboxGrid.Item colspan={24} style={{wordWrap:"break-word"}}>
                            <p><b>Producto:</b> {this.props.producto}</p>
                            <p><b>Cédula:</b> {this.props.cedula}</p>
                            <p><b>Teléfono:</b> {this.props.telefono}</p>
                            <p><b>Dirección:</b> {this.props.direccion}</p>
                            <p><b>Entregar:</b> {fechasemana}</p>
                                             

                            <hr/>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={24}>
                                <FlexboxGrid justify="space-around">
                                {(this.props.estado == "Pendiente")?
                                    (<Button color="yellow"style={{width:"100px"}} onClick={this.cambiarEstado}>{this.props.estado}</Button>):
                                    ((this.props.estado == "Entregado")?
                                    (<Button color="green"style={{width:"100px"}} onClick={this.cambiarEstado}>{this.props.estado}</Button>):
                                    (<Button color="violet"style={{width:"100px"}} onClick={this.cambiarEstado}>{this.props.estado}</Button>))
                                }
                                <Button style={{ width:"80px"}} appearance="primary" onClick={this.open}>Editar</Button>
                                <Button color="red"style={{ width:"80px"}} onClick={()=>{this.props.db.doc(this.props.id).delete(); Alert.success("Pedido eliminado", 5000)}}>Cancelar</Button>
                                </FlexboxGrid>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <Modal show={this.state.show} onHide={this.close} size="xs" >
                            <Modal.Header>
                                <Modal.Title>Editar pedido</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{maxHeight:"100vh"}}>
                                <Form
                                fluid
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
                                <hr style={{margin: "2vh"}}/>
                                <FormGroup>
                                    <ControlLabel>Dirección</ControlLabel>
                                    <FormControl rows={3} name="direccion" componentClass="textarea" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Producto</ControlLabel>
                                    <FormControl rows={3} name="producto" componentClass="textarea" />
                                </FormGroup>
                                <hr style={{margin: "2vh"}}/>

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
                            </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <SelectPicker
                                    style={{
                                        marginLeft: "0",
                                        marginRight:"20%"
                                    }}
                                    value={this.state.formValue.estado}
                                    onChange={this.handleEstado}
                                    placement="topStart"
                                    searchable={false}
                                    data={[
                                        {
                                            label: "Pendiente",
                                            value: "Pendiente"
                                        },
                                        {
                                            label: "Entregado",
                                            value: "Entregado"
                                        },
                                        {
                                            label: "Cambio",
                                            value: "Cambio"
                                        },
                                    ]}
                                >
                                    
                                </SelectPicker>
                                <Button onClick={()=>{
                                    this.props.db.doc(this.props.id).set(this.state.formValue, {merge:true})
                                    this.close()
                                }} appearance="primary">
                                Editar
                                </Button>
                                <Button onClick={this.close} appearance="subtle">
                                Cancelar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Panel>
                </FlexboxGrid.Item>
        );
    }
}
 
export default Pedido;