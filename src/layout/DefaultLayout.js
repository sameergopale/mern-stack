import { Outlet } from "react-router";
import Header from "../sharedComponents/Header";
import { Col, Container, Row } from "react-bootstrap";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Container className="mt-3">
        <Row>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DefaultLayout;
