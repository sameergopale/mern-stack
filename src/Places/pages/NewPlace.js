import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useHttpClient from "../../hooks/useHttpClient";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required().min(10),
});
const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const formSubmitHandler = async (formData) => {
    try {
      const newPlace = {
        title: formData.title,
        description: formData.description,
        creator: auth.userId,
      };
      const responseData = await sendRequest({
        url: "/places",
        method: "POST",
        data: newPlace,
      });
      if (responseData?.place) {
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <Row className="justify-content-center">
      <Col xs={6}>
        {isLoading && <Loading />}
        <ErrorModal error={error} clearError={clearError} />
        <Form onSubmit={handleSubmit(formSubmitHandler)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register("title")}
              isInvalid={errors.title}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              {...register("description")}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default NewPlace;
