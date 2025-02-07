import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(5),
});

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });
  const [showLogin, setShowLogin] = useState(false);

  const loginFormHandler = (data) => {
    console.log("Login data", data);
  };
  return (
    <>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          {showLogin ? (
            <div>
              <h4>Login Form</h4>
              <Form onSubmit={handleSubmit(loginFormHandler)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email")}
                    isInvalid={errors?.email}
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
                    isInvalid={errors?.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Login</Button>
              </Form>
            </div>
          ) : (
            <div>
              <h4>Sign Up Form</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button type="submit">Sign Up</Button>
              </Form>
            </div>
          )}

          <div className="mt-3">
            <Button
              variant="secondary"
              onClick={() => setShowLogin(!showLogin)}
            >
              Switch to {showLogin ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Auth;
