import React, { Component } from 'react';
import {Table, Alert, FlexboxGrid, Panel, Button, Form, DatePicker, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, SelectPicker, Icon, InputGroup, Input, CheckPicker, ButtonToolbar, Uploader, List } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
class Item extends Component {
    state = {  }
    render() { 
        return ( <FlexboxGrid.Item colspan={11} style={{marginTop:"1vh", marginBottom:"1vh"}}>
        <Panel bordered>
            ssa
        </Panel>
    </FlexboxGrid.Item> );
    }
}


class Lista extends Component {
    state = { show:false, modalInfo:{
        nombre: "",
        categorias: [],
        disponibles:0,
        imagen: "",
        precio: "",
        id: "",
        descricion:"",
        disabled: true
    } }
    close = () => {
        this.setState({ show: false });
      }
    open = (event) => {
        this.setState({ show: true });
    }

    handleCategorias = (value) => {
        let formValue = this.state.modalInfo
        formValue.categorias = value
        this.setState({modalInfo: formValue})
    }
    
    render() { 
        let {modalInfo} = this.state
        return ( <div><Table autoHeight
            data={this.props.articulos}
            onRowClick={data => {
              this.setState({modalInfo:{
                  nombre: data.nombre,
                  categorias: data.categorias,
                  disponibles: data.disponibles,
                  imagen: data.imagen,
                  precio: data.precio,
                  id: data.id,
                  descripcion:data.descripcion,
                  disabled: true
              }}, this.open)
            }}
          >
            <Column width={5} fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>
            <Column flexGrow={2} fixed>
              <HeaderCell>Nombre</HeaderCell>
              <Cell dataKey="nombre" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Precio</HeaderCell>
              <Cell dataKey="precio" />
            </Column>
  
            <Column flexGrow={1}>
              <HeaderCell>Disponibles</HeaderCell>
              <Cell dataKey="disponibles" />
            </Column>
            
          </Table>
          <Modal overflow={true} show={this.state.show} onHide={this.close} >
          <Modal.Header>
        <Modal.Title style={{ wordWrap:"break-word"}}>
        <div style={{
            height:"35vh"
        }}><img src={modalInfo.imagen} width="100%"/></div>
                </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{maxHeight:"88vh"}}>
          <FlexboxGrid>
          <FlexboxGrid.Item colspan={17} style={{wordWrap:"break-word"}}>
          <ControlLabel>Nombre</ControlLabel>
                    <Input name="nombre" value={modalInfo.nombre} onChange={(value)=>{
                        modalInfo.nombre = value
                        this.setState({modalInfo: modalInfo})
                    }}/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={1}>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                <ControlLabel>Precio</ControlLabel>
                <InputGroup>
                    <Input name="precio" value={modalInfo.precio} type="number" onChange={(value)=>{
                        modalInfo.precio = value
                        this.setState({modalInfo: modalInfo})
                    }}/>
                </InputGroup>
                    
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <hr style={{margin:"1vh", borderColor:"white"}}></hr>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={17}>
                    <ControlLabel>Categorías</ControlLabel>
                        <CheckPicker preventOverflow
                                                style={{
                                                    width:"100%",
                                                    paddingTop:"1vh",
                                                    paddingBottom: "3vh"
                                                }}
                                                size="md"
                                                value={modalInfo.categorias}
                                                onChange={this.handleCategorias}
                                                placeholder="Categorías"
                                                data={this.props.categorias}
                                            />
                        <ControlLabel>Descripción</ControlLabel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={1}></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6}>
                            <ControlLabel>
                                Disponibles
                            </ControlLabel>
                            <Input name="precio" value={modalInfo.disponibles}
                                                style={{
                                                    width:"100%",
                                                    marginTop:"1vh",
                                                }} type="number" onChange={(value)=>{
                                                    modalInfo.disponibles = value
                                                    this.setState({modalInfo: modalInfo})
                                                }}/>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Input rows={5} componentClass="textarea" name="descripcion" value={modalInfo.descripcion} onChange={(value)=>{
                        modalInfo.descripcion = value
                        this.setState({modalInfo: modalInfo})
                    }} />
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={() => {
                  this.props.db.doc(modalInfo.id).set(modalInfo, {merge:true})
                  this.close()
              }} appearance="primary">
              Editar
              </Button>
              <Button pullLeft color="red" onClick={() => {
                  this.props.db.doc(modalInfo.id).delete()
                  this.close()
              }} appearance="primary">
              Borrar
              </Button>
          </Modal.Footer>
          </Modal>
          </div>
          );
    }

}

class NuevoArticulo extends Component {
    state = { 
        formValue: {
            nombre: '',
            descripcion: '',
            categorias: [],
            imagen: "",
            precio: 0 ,
            disponibles: 0
        }
    }

    handleChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    handleCategorias = (value) => {
        let formValue = this.state.formValue
        formValue.categorias = value
        this.setState({formValue: formValue})
    }

    handleImages = (value) => {
        this.setState({imagenes: value}, ()=>console.log(value))
    }

    nuevoarticulo = () => {
        let info = this.state.formValue
        if(info.nombre!=''){
            this.props.db.add(info).then(()=>{
                this.setState({formValue: {
                    nombre: '',
                    descripcion: '',
                    categorias: [],
                    imagen: "",
                    precio: 0 ,
                    disponibles: 0
                }}, ()=> Alert.success("Articulo ingresado correctamente", 5000))
            })
        }else{
            Alert.error("No deje campos en blanco", 5000)
        }
    }

    render() { 
        return ( 
            <FlexboxGrid.Item colspan={8} style={{height:"92vh", backgroundColor:"#F4F5F7"}}>
                            <h4 style={{padding:"10px", height:"7vh", backgroundColor:"#002046", color:"white", textAlign:"center"}}>Nuevo articulo</h4>
                            <Form fluid 
                                style={{ padding:"0 20px", textAlign:"left", height:"85vh"}}
                                onChange={this.handleChange}
                                formValue={this.state.formValue}
                                
                            >
                                <FormGroup style={{paddingTop:"2vh"}}>
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl name="nombre" />
                                </FormGroup>
                                
                                <FormGroup>
                                    <ControlLabel>Descripción</ControlLabel>
                                    <FormControl rows={3} name="descripcion" componentClass="textarea" />
                                </FormGroup>
                                    <CheckPicker preventOverflow
                                        style={{
                                            width:"100%",
                                            paddingTop:"1vh",
                                            paddingBottom: "3vh"
                                        }}
                                        size="md"
                                        value={this.state.formValue.categorias}
                                        onChange={this.handleCategorias}
                                        placeholder="Categorías"
                                        data={this.props.categorias}
                                    />
                                <FormGroup >
                                    <ControlLabel>Imagenes</ControlLabel>
                                    <input type="file" id="imagen" name="imagen" accept="image/png, image/jpeg" onChange={(event)=>{
                                        const reader = new FileReader();  
                                        
                                        
                                        reader.onload = evt => {
                                            let formValue = this.state.formValue
                                            formValue.imagen = evt.target.result
                                            this.setState({formValue: formValue}, ()=>console.log(this.state.formValue))
                                        }
                                        reader.readAsDataURL(event.target.files[0])
                                    }}></input>
                                </FormGroup>
                                <hr style={{margin:"2vh"}}/>

                                <FlexboxGrid>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <InputGroup>
                                            <ControlLabel>Precio</ControlLabel>
                                            <InputGroup.Addon>$</InputGroup.Addon>
                                            
                                            <FormControl name="precio" type="number" />
                                            </InputGroup>
                                        </FormGroup>
                                
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={2}></FlexboxGrid.Item>
                                    <FlexboxGrid.Item colspan={11}>
                                        <FormGroup>
                                            <ControlLabel>Disponibles</ControlLabel>
                                            <FormControl name="disponibles" type="number" />
                                        </FormGroup>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                                <hr/>
                                
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button appearance="primary" onClick={this.nuevoarticulo}>Guardar</Button>
                                        <Button appearance="default">Cancelar</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
         );
    }
}

class Inventario extends Component {
    state = { 
        categorias: [],
        categoriasfiltro: [],
        articulos: [],
        articulosfiltro: [],
        articulosfiltro2: [],
        valorbuscar: ""
    }
    handleCategorias = (value) => {
       
        if(value.length){
            this.setState({categoriasfiltro: value}, () => {
                let encontrado = []
                this.state.articulos.forEach((articulo)=>{
                    console.log(value)
                    if(this.state.categoriasfiltro.every((categoria)=>articulo.categorias.includes(categoria)
                    )) encontrado.push(articulo)
                })
                this.setState({articulosfiltro: encontrado}, ()=>this.buscar(this.state.valorbuscar))
            })
        }else{
            this.setState({categoriasfiltro: []})
            this.setState({articulosfiltro: this.state.articulos}, ()=>this.buscar(this.state.valorbuscar))
        }
        
        
    }

    componentDidMount() {
        this.props.db.collection("categorias").onSnapshot((querySnapshot)=>{
            let categorias = []
            querySnapshot.forEach((doc)=>{
                let data = doc.data()
                data.label = data.nombre
                data.value = data.nombre
                categorias.push(data)
            })
            this.setState({categorias: categorias})
        })
        this.props.db.collection("articulos").onSnapshot((querySnapshot)=>{
            let articulos = []
            querySnapshot.forEach((doc)=>{
                let data = doc.data()
                data.id = doc.id
                data.categorias2 = data.categorias.join(", ")
                console.log(data)
                articulos.push(data)
            })
            this.setState({articulos: articulos}, ()=>console.log(this.state.articulos))
            this.setState({articulosfiltro: articulos})
            this.setState({articulosfiltro2: articulos})
        })
    }

    checkCategorias = (categoria, articulo)=>articulo.categorias.includes(categoria)

    buscar = (value) => {
        this.setState({valorbuscar: value})
        if(value!=''){
            let encontrado = this.state.articulosfiltro.filter(articulo => 
                articulo.nombre.toLowerCase().includes(value.toLowerCase())
                )
            this.setState({articulosfiltro2: encontrado})
        }else{
                this.setState({articulosfiltro2: this.state.articulosfiltro})
        }

    }

    buscarCategoria = () => {

    }

    render() { 
        return (<FlexboxGrid>
            <FlexboxGrid.Item colspan={16}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={8}>
                    <CheckPicker 
                        style={{
                            width:"100%",
                            height:"7vh",
                            padding:"1vh",
                            
                            backgroundColor:"#e8e8e8"
                        }}
                        size="md"
                        value={this.state.categoriasfiltro}
                        onChange={this.handleCategorias}
                        placeholder="Categorías"
                        data={this.state.categorias}
                    />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={16} style={{height:"7vh"}}>
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
                            <Input placeholder="Buscar" onChange={this.buscar}style={{height:"7vh"}}/>
                            
                        </InputGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Lista categorias={this.state.categorias} db={this.props.db.collection("articulos")} articulos={this.state.articulosfiltro2}></Lista>
            </FlexboxGrid.Item>
            <NuevoArticulo categorias={this.state.categorias} db={this.props.db.collection("articulos")}/>
            
        </FlexboxGrid>
        );
    }
}
 
export default Inventario;