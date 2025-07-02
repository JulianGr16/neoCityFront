import Card from "react-bootstrap/Card";


const CardHabitaciones = () => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="my-4 col-sm-12 card-habitaciones text-white lead">
        <Card.Body>
          <Card.Title>Habitacion</Card.Title>
          <Card.Text>
            Para mayor comodidad durante el tiempo de descanso
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardHabitaciones;
