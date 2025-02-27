import { Col, Row } from "react-bootstrap";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router";
import useHttpClient from "../../hooks/useHttpClient";
import { useEffect } from "react";

const MyPlace = () => {
  const { userId } = useParams();
  const { sendRequest, isLoading, error, data, clearError } = useHttpClient();
  // useEffect(() => {
  //   if (!data) {
  //     sendRequest({
  //       url: `/users/${userId}`,
  //       method: "GET",
  //     });
  //   }
  // }, [sendRequest, data]);
  return (
    <Row>
      <Col lg={{ span: 6, offset: 3 }}>
        <PlaceList lists={data?.places} />;
      </Col>
    </Row>
  );
};

export default MyPlace;
