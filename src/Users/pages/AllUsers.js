import UserList from "../components/UserList";

const AllUsers = () => {
  const UserData = [
    {
      id: "u1",
      name: "User One",
      places: 3,
    },
  ];
  return <UserList users={UserData} />;
};

export default AllUsers;
