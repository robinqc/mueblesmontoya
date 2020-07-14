import React, { Component } from 'react';
import {Table, Alert, FlexboxGrid, Panel, Button, Form, DatePicker, FormGroup, FormControl, ControlLabel, HelpBlock, Modal, SelectPicker, Icon, InputGroup, Input, CheckPicker, ButtonToolbar, Uploader, List } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;
class Lista extends Component {
    state = { show:false, modalInfo:{
        id:"",
        nombre: ""
    } }
    close = () => {
        this.setState({ show: false });
      }
    open = (event) => {
        this.setState({ show: true });
    }

    handleNombre = (value) => {
        this.setState({modalInfo: {id: this.state.modalInfo.id, nombre:value}})
    }
    
    render() { 
        let {modalInfo} = this.state
        return ( <div><Table autoHeight
            data={this.props.categorias}
            onRowClick={data => {
              this.setState({modalInfo:{
                  id: data.id,
                  nombre: data.nombre
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
            
          </Table>
          <Modal overflow={true} show={this.state.show} onHide={this.close} >
          <Modal.Header>
        <Modal.Title style={{ wordWrap:"break-word"}}>
        Editar categoría
                </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{maxHeight:"88vh"}}>
          <ControlLabel>Nombre</ControlLabel>
                    <Input name="nombre" value={modalInfo.nombre} onChange={(value)=>{
                        modalInfo.nombre = value
                        this.setState({modalInfo: modalInfo})
                    }}/>
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

class NuevaCategoria extends Component {
    state = { 
        formValue: {
            nombre: ''
        }
    }

    handleChange = (value) => {
        this.setState({
            formValue: value
        })
    }

    nuevaCategoria = () => {
        let info = this.state.formValue
        if(info.nombre!=''){
            this.props.db.add(info).then(()=>{
                this.setState({formValue: {
                    nombre: ''
                }}, ()=> Alert.success("Categoría ingresada correctamente", 5000))
            })
        }else{
            Alert.error("No deje campos en blanco", 5000)
        }
    }

    render() { 
        return ( 
            <FlexboxGrid.Item colspan={8} style={{height:"92vh", backgroundColor:"#F4F5F7"}}>
                            <h4 style={{padding:"10px", height:"7vh", backgroundColor:"#002046", color:"white", textAlign:"center"}}>Nueva Categoría</h4>
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
                                    <ButtonToolbar>
                                        <Button appearance="primary" onClick={this.nuevaCategoria}>Guardar</Button>
                                        <Button appearance="default">Cancelar</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
         );
    }
}


class Categorias extends Component {
    state = { categorias:[] }
    componentDidMount() {
        
        this.props.db.collection('categorias').onSnapshot(querySnapshot=>{
            let categorias = []
            querySnapshot.forEach(doc=>{
                let data = doc.data()
                data.id = doc.id
                categorias.push(data)
            })
            this.setState({categorias: categorias})
        })
        
    }
    render() { 
        return (<FlexboxGrid>
            <FlexboxGrid.Item colspan={16}>
            <Lista categorias={this.state.categorias} db={this.props.db.collection('categorias')}></Lista> 
            </FlexboxGrid.Item>
                <NuevaCategoria db={this.props.db.collection('categorias')}/>
        </FlexboxGrid>);
    }
}
 
export default Categorias;