import React, { Component } from 'react';
import { Alert, FormGroup, FlexboxGrid, Form, FormControl, ControlLabel, DatePicker, Button, ButtonToolbar, CheckPicker, SelectPicker, IconButton, Icon } from 'rsuite';

class NuevoPedido extends Component {
    state = { 
        formValue: {
            nombre: '',
            cedula: '',
            telefono: '',
            direccion: '',
            productos: [],
            fecha: undefined,
            total: ''
        }
    }

    handleChange = (value) => {
        let change = value
        this.setState({
        formValue: value
    })
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
                    productos: [],
                    total: ''
                }}, ()=> Alert.success("Pedido ingresado correctamente", 5000))
            })
        }else{
            Alert.error("Introduzca la fecha", 5000)
        }
    }

    render() { 
        return ( 
            <FlexboxGrid.Item colspan={8} style={{height:"92vh", backgroundColor:"#F4F5F7"}}>
                            <h4 style={{padding:"10px", height:"7vh", backgroundColor:"#002046", color:"white", textAlign:"center"}}>Nuevo pedido</h4>
                            <Form fluid 
                                style={{ padding:"0 20px", textAlign:"left", height:"85vh"}}
                                onChange={this.handleChange}
                                formValue={this.state.formValue}
                            >
                                <FormGroup style={{paddingTop:"2vh"}}>
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
                                <FormGroup style={{overflowY:"scroll", height:"16vh"}}>
                                    <ProductPicker productos={this.props.productos} final={this.handleProductos}/>
                                </FormGroup>

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

class Picker extends Component {
    state = { producto:"", cantidad:1, mostrar:true }
    handleCantidad = (value) => {
        if(value>0){
            this.setState({cantidad:value}, ()=>this.props.submit(this.state, this.props.id))
        }
    }
    handleProducto = (value) => {
            this.setState({producto:value}, ()=>this.props.submit(this.state, this.props.id))
    }
    render() { 
        return ( this.state.mostrar ? (
            <FlexboxGrid>
            <FlexboxGrid.Item colspan={12}>
                <SelectPicker preventOverflow placement="leftEnd"
                    style={{
                        width:"100%",
                        paddingTop:"1vh",
                    }}
                    size="md"
                    value={this.state.producto}
                    onChange={this.handleProducto}
                    placeholder="Seleccionar"
                    data={this.props.productos}
                />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5}>
            <FormControl style={{
                marginTop: "1vh",
                marginLeft:"1vh",
                marginRight:"1vh",
                width: "90%"
            }}
            name="cantidad" 
            type="number" 
            value={this.state.cantidad}
            onChange={this.handleCantidad}/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={3}>
                <IconButton style={{
                        marginTop:"1vh",
                        marginLeft: "1vh",
                    }}  icon={<Icon icon="plus" />} appearance="primary" onClick={()=>this.props.newChild()}/>
            </FlexboxGrid.Item>
            {this.props.close ? (
                <FlexboxGrid.Item colspan={3}>
                <IconButton style={{
                        marginTop:"1vh",
                        marginLeft: "1vh",
                    }} icon={<Icon icon="close" />} color="red" onClick={()=>{
                        this.setState({mostrar: false}, ()=> this.props.borrar(this.props.id))
                        
                    }}/>
            </FlexboxGrid.Item>
            ): (<div></div>)}
        </FlexboxGrid>
        ):(<div style={{display:"none"}}></div>));
    }
}

class ProductPicker extends Component {
    constructor(props){
        super(props)
        this.state = { productos:[{producto: "", cantidad: 0}], children:[] }
    }

    borrar = (id)=>{
        
        let productos = this.state.productos
        productos[id] = {producto: "", cantidad:0}
        this.setState({productos: productos}, ()=>{this.props.final(this.state.productos)})
    }

    handleProductos = (value, id) => {
        let productos = this.state.productos
        productos[id] = value
        this.setState({productos: productos}, ()=>{this.props.final(this.state.productos)})
    }
    
    addChildren = () => {
        this.setState(state=>({children: [...state.children, (<Picker id={this.state.productos.length} close={true} submit={this.handleProductos} borrar={(id)=>this.borrar(id)} newChild={this.addChildren} productos={this.props.productos}/>)]}))
    }

    render() { 
        
        return ( <div>
            <ControlLabel>Productos</ControlLabel>
            <Picker id={0} submit={this.handleProductos} close={false} newChild={()=>this.addChildren()} productos={this.props.productos} borrar={(id)=>this.borrar(id)}/>
            {this.state.children}
        </div> );
    }
}
 
export default NuevoPedido;