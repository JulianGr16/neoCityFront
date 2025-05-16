import React from "react";
import julianImg from "../../assets/julianGaray.png";
import francoImg from "../../assets/francoPereyra.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const quinesSomos = () => {
  return (
    <Container className="py-5">
      <h1 className="text-primary-emphasis text-center">¿Quiénes Somos?</h1>
      <h5>
        En NeoCity Hotel, creemos que la hospitalidad va más allá de una buena
        habitación: se trata de crear experiencias memorables.
      </h5>
      <p>
        Somos Julián Garay y Franco Pereyra, dos amigos y socios que compartimos
        una misma pasión: crear un concepto de hotelería que combine la
        innovación, el diseño contemporáneo y la calidez del trato humano. Tras
        años de imaginar cómo sería el hotel ideal —uno que reuniera confort,
        estética y cercanía— decidimos transformar ese sueño en realidad. Así
        nació NeoCity, un hotel urbano con alma.
      </p>
      <p>
        Nuestra formación en turismo y gestión hotelera, sumada a nuestra
        experiencia viajando y conociendo distintas culturas, nos dio las
        herramientas para pensar cada detalle de NeoCity desde la mirada del
        huésped. Sabemos lo que significa sentirse bien recibido, lo que se
        busca después de un día largo, lo que marca la diferencia entre un
        simple alojamiento y una estadía inolvidable.
      </p>
      <p>
        NeoCity está pensado para quienes valoran el equilibrio entre tecnología
        y calidez. Nuestro diseño moderno y funcional se acompaña de un servicio
        personalizado, cercano y humano. Desde el momento en que cruzás la
        puerta, queremos que sientas que este lugar fue creado para vos. Nos
        encanta conocer a quienes nos visitan, escuchar sus historias y
        asegurarnos de que encuentren en nuestro hotel un espacio para
        descansar, trabajar o simplemente disfrutar.
      </p>
      <p>
        Creemos que la hospitalidad se construye con pequeños gestos: una
        sonrisa al recibirte, una recomendación local, una habitación impecable.
        Por eso, cada miembro de nuestro equipo comparte este compromiso de
        atención con el que soñamos desde el primer día. NeoCity Hotel no es
        solo nuestro proyecto, es nuestro hogar. Y queremos que, por un rato,
        también sea el tuyo.
      </p>
      <h4>
        <strong>Bienvenidos. Tu experiencia comienza en NeoCity.</strong>
      </h4>

      <Row className="py-3">
        <Col className="d-flex justify-content-evenly col-sm-12 col-md-6 mb-4">
          <Card style={{ width: "18rem", height: "100%" }}>
            <Card.Img
              variant="top"
              src={julianImg}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <Card.Body
              className="d-flex flex-column justify-content-between"
              style={{ height: "250px" }}
            >
              <Card.Title>Julian Garay</Card.Title>
              <Card.Text>
                Director General de Operaciones y Gestión Hotelera.
              </Card.Text>
              <Button
                variant="primary"
                className="w-50"
                href="https://www.instagram.com/julian.garay.16/"
                target="_blank"
              >
                Contactar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex justify-content-evenly col-sm-12 col-md-6 mb-4">
          <Card style={{ width: "18rem", height: "100%" }}>
            <Card.Img
              variant="top"
              src={francoImg}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <Card.Body
              className="d-flex flex-column justify-content-between"
              style={{ height: "250px" }}
            >
              <Card.Title>Franco Pereyra</Card.Title>
              <Card.Text>
                Director de Desarrollo de Experiencia del Huésped y Diseño de
                Espacios.
              </Card.Text>
              <Button className="w-50" href="https://www.instagram.com/frann.12_/" target="_blank">Contactar</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default quinesSomos;
