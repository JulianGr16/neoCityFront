import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import julianImg from "../../assets/julianGaray.png";
import francoImg from "../../assets/francoPereyra.png";

const QuienesSomos = () => {
  return (
    <Container className="py-5 my-4 bg-gradient bg-opacity-10 bg-primary bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3 shadow">
      <h1 className="text-primary text-center mb-4 fw-bold">¿Quiénes Somos?</h1>
      
      <div className="px-lg-5 mx-lg-3">
        <h5 className="text-center text-muted mb-4 fst-italic">
          En NeoCity Hotel, creemos que la hospitalidad va más allá de una buena
          habitación: se trata de crear experiencias memorables.
        </h5>
        
        <div className="mb-4 p-3 bg-white bg-opacity-50 rounded">
          <p className="lead">
            Somos Julián Garay y Franco Pereyra, dos amigos y socios que compartimos
            una misma pasión: crear un concepto de hotelería que combine la
            innovación, el diseño contemporáneo y la calidez del trato humano.
          </p>
          
          <p>
            Nuestra formación en turismo y gestión hotelera, sumada a nuestra
            experiencia viajando y conociendo distintas culturas, nos dio las
            herramientas para pensar cada detalle de NeoCity desde la mirada del
            huésped.
          </p>
          
          <p>
            NeoCity está pensado para quienes valoran el equilibrio entre tecnología
            y calidez. Nuestro diseño moderno y funcional se acompaña de un servicio
            personalizado, cercano y humano.
          </p>
          
          <p className="mb-0">
            Creemos que la hospitalidad se construye con pequeños gestos: una
            sonrisa al recibirte, una recomendación local, una habitación impecable.
          </p>
        </div>
        
        <h4 className="text-center text-primary mt-4 mb-5 fst-italic">
          <strong>Bienvenidos. Tu experiencia comienza en NeoCity.</strong>
        </h4>

        <Row className="g-4 py-3">
        <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm border-0 overflow-hidden" style={{ minHeight: '500px' }}>
              <div className="overflow-hidden" style={{ height: "350px" }}>
              <Card.Img
                variant="top"
                src={julianImg}
                className="h-100 w-100 object-fit-cover"
              />
            </div>
            <Card.Body className="d-flex flex-column bg-light">
              <Card.Title className="fw-bold text-primary">Julian Garay</Card.Title>
              <Card.Text className="text-muted">
                Director General de Operaciones y Gestión Hotelera.
              </Card.Text>
              <Button
                variant="primary"
                className="align-self-start mt-auto"
                href="https://www.instagram.com/julian.garay.16/"
                target="_blank"
              >
                Contactar
              </Button>
            </Card.Body>
          </Card>
        </Col>
          
          <Col xs={12} md={6}>
          <Card className="h-100 shadow-sm border-0 overflow-hidden" style={{ minHeight: '500px'}}>
              <div className="overflow-hidden" style={{ height: "350px"}}>
              <Card.Img
                variant="top"
                src={francoImg}
                className="h-100 w-100 object-fit-cover"
              />
            </div>
              <Card.Body className="d-flex flex-column bg-light">
              <Card.Title className="fw-bold text-primary">Franco Pereyra</Card.Title>
              <Card.Text className="text-muted">
                Director de Desarrollo de Experiencia del Huésped y Diseño de
                Espacios.
              </Card.Text>
              <Button 
                variant="primary" 
                className="align-self-start mt-auto"
                href="https://www.instagram.com/frann.12_/" 
                target="_blank"
              >
                Contactar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    </Container>
  );
};

export default QuienesSomos;