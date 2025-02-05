import { Card } from "react-bootstrap";
import { Link } from "react-router";

const UserItem = ({ id, name, places }) => {
  return (
    <Link to={`/${id}/place`} className="text-decoration-none">
      <Card bg="secondary" text="white" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {places} {places === 1 ? "Place" : "Places"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default UserItem;
