import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const NewPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmitHandler = (data) => {
    console.log(data);
  };
  return (
    <Row className="justify-content-center">
      <Col xs={6}>
        <Form onSubmit={handleSubmit(formSubmitHandler)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" {...register("title")} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" {...register("description")} />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" {...register("imageUrl")} />
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
