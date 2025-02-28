import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ErrorModal from "../../sharedComponents/ErrorModal";
import Loading from "../../sharedComponents/Loading";
import useHttpClient from "../../hooks/useHttpClient";

const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(5),
});
const SignupForm = () => {
  const [user, setUser] = useState();
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupValidationSchema),
  });
  const SignupFormHandler = async (formData) => {
    try {
      const responseData = await sendRequest({
        url: "/users/signup",
        method: "POST",
        data: formData,
      });
      setUser(responseData.user);
    } catch (error) {}
  };
  return (
    <div>
      {isLoading && <Loading />}
      <ErrorModal error={error} clearError={clearError} />
      <h4>Sign Up Form</h4>
      <Form onSubmit={handleSubmit(SignupFormHandler)}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            isInvalid={errors.name}
          />

          <Form.Control.Feedback type="invalid">
            {errors?.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        {user && <p>Signup successfull Please switch to login</p>}
        <Button type="submit">Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignupForm;
