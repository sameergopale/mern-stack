import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required().min(10),
  imageUrl: Yup.string().required(),
});
const NewPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const formSubmitHandler = (data) => {
    console.log(data);
  };

  return (
    <Row className="justify-content-center">
      <Col xs={6}>
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
          <Form.Group className="mt-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              {...register("imageUrl")}
              isInvalid={errors.imageUrl}
            />
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
