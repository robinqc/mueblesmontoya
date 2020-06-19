import React, { Component } from 'react';
import { Button, ButtonToolbar, DatePicker, FlexboxGrid, Sidenav, Nav, Icon, Dropdown, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Pedidos from './Pedidos'
import NuevoPedido from './NuevoPedido'
function  Dashboard(props){  
    let {path, url} = useRouteMatch()
        return (
            <Router>
            <FlexboxGrid style={{height:"92vh"}}>
                <FlexboxGrid.Item colspan={4}>
                <Sidenav defaultOpenKeys={['3', '4']} activeKey="1" style={{height:"92vh", maxHeight:"100%", minHeight:"100%"}}>
                    <Sidenav.Body>
                        <Nav>
                        <Nav.Item eventKey="1" icon={<Icon icon="home" />} style={{padding:"20px", fontSize:"20px", backgroundColor:"lightgray", color:"black"}}>
                            {props.title}
                        </Nav.Item>
                        <Dropdown eventKey="3" title="Pedidos" icon={<Icon icon="edit" />}>
                        <Link to={`${url}/hoy`} style={{color:"gray"}}><Dropdown.Item eventKey="3-1">Pedidos de Hoy</Dropdown.Item></Link>
                        <Link to={`${url}/pendientes`} style={{color:"gray"}}><Dropdown.Item eventKey="3-2">Pedidos pendientes</Dropdown.Item></Link>
                        <Link to={`${url}/cambios`} style={{color:"gray"}}><Dropdown.Item eventKey="3-3">Cambios</Dropdown.Item></Link>
                        <Link to={`${url}/entregados`} style={{color:"gray"}}><Dropdown.Item eventKey="3-4">Entregados</Dropdown.Item></Link>
                        </Dropdown>
                        
                        </Nav>
                    </Sidenav.Body>
                    </Sidenav>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={16} style={{height:"92vh"}}>
                            <Switch>
                                <Route exact path={`${url}`}>
                                <Pedidos key="verhoy"title={`de hoy ${props.title}`} db={props.db} filter={{
                                    field: 'fecha',
                                    value: new Date()
                                }}/>
                                </Route>
                                <Route path={`${url}/hoy`}>
                                <Pedidos key="verhoy"title={`de hoy ${props.title}`} db={props.db} filter={{
                                    field: 'fecha',
                                    value: new Date()
                                }}/>
                                </Route>
                                <Route path={`${url}/pendientes`}>
                                <Pedidos key="verpendientes" title={`de hoy ${props.title}`} db={props.db} filter={{
                                    field: 'estado',
                                    value: 'Pendiente'
                                }}/>
                                </Route>
                                <Route exact path={`${url}/cambios`}>
                                <Pedidos key="vercambios" title={`de hoy ${props.title}`} db={props.db} filter={{
                                    field: 'estado',
                                    value: 'Cambio'
                                }}/>
                                </Route>
                                <Route path={`${url}/entregados`}>
                                <Pedidos key="verentregados" title={`de hoy ${props.title}`} db={props.db} filter={{
                                    field: 'estado',
                                    value: 'Entregado'
                                }}/>
                                </Route>
                            </Switch>
                        </FlexboxGrid.Item>
                        <NuevoPedido db={props.db}/>
                    </FlexboxGrid>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            </Router> 
         );
    
}
 
export default Dashboard;