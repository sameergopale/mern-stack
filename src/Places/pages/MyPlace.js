import { Col, Row } from "react-bootstrap";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router";
import useHttpClient from "../../hooks/useHttpClient";
import { useEffect, useState } from "react";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";

const MyPlace = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { userId } = useParams();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseData = await sendRequest({
          url: `/places/user/${userId}`,
          method: "GET",
        });
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetch();
  }, [sendRequest, userId]);
  return (
    <>
      {isLoading && <Loading />}
      <ErrorModal error={error} clearError={clearError} />
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {!isLoading && loadedPlaces && <PlaceList lists={loadedPlaces} />}
        </Col>
      </Row>
    </>
  );
};

export default MyPlace;
