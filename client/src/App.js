import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar';
import Countries from './components/Countries';
import { Container, Row, Col, Button } from 'reactstrap';

function App() {
  const [countries, getCountries] = useState([]);

  useEffect(() => {
    fetch("/getcountries").then(res =>
      res.json().then(data => {
        getCountries(data);
      })
    );
  }, []);

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col className="text-center mt-5">
            <Countries countries={countries} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
