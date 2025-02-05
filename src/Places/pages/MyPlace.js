import { Col, Row } from "react-bootstrap";
import PlaceList from "../components/PlaceList";

const MyPlace = () => {
  const placesList = [
    {
      id: "p1",
      title: "Place one",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      imageUrl:
        "https://lh5.googleusercontent.com/p/AF1QipPzMInEnvd2c9kUF1JwlHop06YrUi91vFYbXbnx=w540-h312-n-k-no",
      creator: "u1",
    },
    {
      id: "p2",
      title: "Place two",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      imageUrl:
        "https://lh5.googleusercontent.com/p/AF1QipPzMInEnvd2c9kUF1JwlHop06YrUi91vFYbXbnx=w540-h312-n-k-no",
      creator: "u2",
    },
    {
      id: "p3",
      title: "Place three",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      imageUrl:
        "https://lh5.googleusercontent.com/p/AF1QipPzMInEnvd2c9kUF1JwlHop06YrUi91vFYbXbnx=w540-h312-n-k-no",
      creator: "u2",
    },
  ];
  return (
    <Row className="justify-content-center">
      <Col xs={6}>
        <PlaceList lists={placesList} />;
      </Col>
    </Row>
  );
};

export default MyPlace;
