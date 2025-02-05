import { Card } from "react-bootstrap";

const PlaceItem = ({ title, description, imageUrl }) => {
  return (
    <Card bg="dark" text="white" className="mt-3">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PlaceItem;
