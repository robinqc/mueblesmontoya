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
                <Link to="/montoya" style={{color:"white"}}><Nav.Item icon={<Icon icon="home" />} >Muebles Montoya</Nav.Item></Link>
                <Link to="/serrati" style={{color:"white"}}><Nav.Item icon={<Icon icon="home" />} >Colchones Serrati</Nav.Item></Link>
                </Nav>
              
              
              
              
            </Navbar.Body>
          </Navbar>
        </Header>
        <Content>
              <Switch>
              <Route path="/montoya"><Dashboard title="Montoya" db={db.collection('pedidos serrati')}/></Route>
              <Route path="/serrati"><Dashboard title="Serrati" db={db.collection('pedidos serrati')}/></Route>
            </Switch>
          
        </Content>
      </Router>
      </Container>
  );
}

export default App;
