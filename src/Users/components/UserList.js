import { Alert } from "react-bootstrap";
import UserItem from "./UserItem";

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <Alert variant="danger">No User found</Alert>;
  }
  return (
    <ul className="d-grid gap-1">
      {users.map((user) => (
        <UserItem key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default UserList;
