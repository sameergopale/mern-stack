import { Card } from "react-bootstrap";

const UserItem = ({ id, name, places }) => {
  return (
    <Card bg="secondary" text="white" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Places: {places}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserItem;
