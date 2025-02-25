import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          {showLogin ? <LoginForm /> : <SignupForm />}

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
