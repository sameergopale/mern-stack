import { Col, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import useHttpClient from "../../hooks/useHttpClient";
import { useEffect } from "react";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";

const AllUsers = () => {
  const { sendRequest, isLoading, error, data, clearError } = useHttpClient();
  useEffect(() => {
    if (!data) {
      sendRequest({
        url: "/users",
        method: "GET",
      });
    }
  }, [sendRequest, data]);
  return (
    <>
      {isLoading && <Loading />}
      <ErrorModal error={error} clearError={clearError} />
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <UserList users={data?.users} />;
        </Col>
      </Row>
    </>
  );
};

export default AllUsers;
