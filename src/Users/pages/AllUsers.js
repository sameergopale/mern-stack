import { Col, Row } from "react-bootstrap";
import UserList from "../components/UserList";
import useHttpClient from "../../hooks/useHttpClient";
import { useEffect, useState } from "react";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";

const AllUsers = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest({
          url: "/users",
          method: "GET",
        });
        setLoadedUsers(responseData.users);
      } catch (error) {}
    };
    fetch();
  }, [sendRequest]);
  return (
    <>
      {isLoading && <Loading />}
      <ErrorModal error={error} clearError={clearError} />
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
        </Col>
      </Row>
    </>
  );
};

export default AllUsers;
