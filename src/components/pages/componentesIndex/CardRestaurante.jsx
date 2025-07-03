import Card from "react-bootstrap/Card";

const CardRestaurante = () => {
    return (
        <>
         <Card style={{ width: "18rem" }} className="mx-3 my-4 card-restaurante text-white lead">
        <Card.Body>
          <Card.Title>Restaurantes</Card.Title>
          <Card.Text>
            Deleitamos con los mejores platos a nuestros huéspedes.
          </Card.Text>
        </Card.Body>
      </Card>        
        </>
    );
};

export default CardRestaurante;