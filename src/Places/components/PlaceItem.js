import { Button, Card } from "react-bootstrap";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const PlaceItem = ({ id, title, description, creator }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const deleteHandler = async () => {
    try {
      const responseData = await sendRequest({
        url: `/places/${id}`,
        method: "DELETE",
      });
      alert(responseData?.message);
      if (responseData.message) {
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <>
      {isLoading && <Loading />}
      <ErrorModal error={error} clearError={clearError} />
      <Card bg="dark" text="white" className="mt-3">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          {creator === auth.userId ? (
            <Button onClick={deleteHandler}>Delete</Button>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
};

export default PlaceItem;
