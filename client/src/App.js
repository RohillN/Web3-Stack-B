import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import { Container, Row, Col, Button } from 'reactstrap';

function App() {
  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col className="text-center mt-5"><h1>Welcome Page</h1>
            <Button variant="contained" color="primary" onClick={console.log("test")}>
              Click Me
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
