import { Col, Row } from "react-bootstrap";
import UserList from "../components/UserList";

const AllUsers = () => {
  const UserData = [
    {
      id: "u1",
      name: "User One",
      places: 1,
    },
  ];
  return (
    <Row>
      <Col lg={{ span: 4, offset: 4 }}>
        <UserList users={UserData} />;
      </Col>
    </Row>
  );
};

export default AllUsers;
