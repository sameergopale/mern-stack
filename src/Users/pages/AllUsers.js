import UserList from "../components/UserList";

const AllUsers = () => {
  const UserData = [
    {
      id: "u2",
      name: "User One",
      places: 1,
    },
  ];
  return <UserList users={UserData} />;
};

export default AllUsers;
