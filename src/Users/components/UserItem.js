import { Card } from "react-bootstrap";
import { Link } from "react-router";

const UserItem = ({ id, name, places }) => {
  return (
    <Link to={`/user/${id}`} className="text-decoration-none">
      <Card bg="secondary" text="white">
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {places.length} {places.length === 0 ? "Place" : "Places"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default UserItem;
