import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import {  Navbar, Nav, Icon, Container, Header, Content  } from 'rsuite';
import * as firebase from 'firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
//const electron = window.require('electron')

const firebaseConfig = require('./firebaseConfig')
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()

function App() {
  db.enablePersistence()
  return (
      <Container className="App" style={{height:"100vh", textAlign:"left"}}> 
      <Router>
        <Header>
          
          <Navbar appearance="inverse" style={{backgroundColor:"#003678", height:"8vh"}}>

            <Navbar.Body>
              <Nav >     
                <Nav.Item icon={<Icon icon="home" />} componentClass={Link} style={{height:"8vh"}} to="/montoya">Muebles Montoya</Nav.Item>
                <Nav.Item icon={<Icon icon="home" />} componentClass={Link} style={{height:"8vh"}} to="/serrati">Colchones Serrati</Nav.Item>
                </Nav>
              
              
              
              
            </Navbar.Body>
          </Navbar>
        </Header>
        <Redirect from="/" to="/serrati/hoy"/>
        <Content>
              <Switch>
                
              <Route path="/montoya"><Dashboard title="Montoya" key="dashboardmontoya" db={db} collectionpedidos= "pedidos montoya"/></Route>
              <Route path="/serrati"><Dashboard title="Serrati" key="dashboardserrati" db={db} collectionpedidos= "pedidos serrati"/></Route>
            </Switch>
          
        </Content>
      </Router>
      </Container>
  );
}

export default App;
