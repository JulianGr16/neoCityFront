import Card from "react-bootstrap/Card";
import '../../Styles/cards.css'
const CardVistas = () => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="my-4 col-sm-12 card-vistas text-white lead">
        <Card.Body>
          <Card.Title>Vistas Panoramicas</Card.Title>
          <Card.Text>
            Para poder apreciar cada vista que tiene nuestro hotel.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardVistas;
