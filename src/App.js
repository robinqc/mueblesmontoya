import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { FlexboxGrid, Button, Navbar, Nav, Sidenav,Dropdown, Icon, Container, Header, Content, Footer, Sidebar  } from 'rsuite';

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
  return (
      <Container className="App" style={{height:"100vh"}}> 
      <Router>
        <Header>
          
          <Navbar appearance="inverse" style={{backgroundColor:"#003678", height:"8vh"}}>

            <Navbar.Body>
              <Nav >     
                <Nav.Item icon={<Icon icon="home" />} componentClass={Link} to="/montoya">Muebles Montoya</Nav.Item>
                <Nav.Item icon={<Icon icon="home" />} componentClass={Link} to="/serrati">Colchones Serrati</Nav.Item>
                </Nav>
              
              
              
              
            </Navbar.Body>
          </Navbar>
        </Header>
        <Redirect from="/" to="/serrati"/>
        <Content>
              <Switch>
                
              <Route path="/montoya">En construcción</Route>
              <Route path="/serrati"><Dashboard title="Serrati" db={db.collection('pedidos serrati')}/></Route>
            </Switch>
          
        </Content>
      </Router>
      </Container>
  );
}

export default App;
