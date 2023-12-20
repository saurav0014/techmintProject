import { USERS_API, POSTS_API } from "../Constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await fetch(USERS_API);
      const usersData = await response.json();
      setUsers(usersData);
      getPostsCount(usersData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getPostsCount(usersData) {
    try {
      const postsResponse = await fetch(POSTS_API);
      const postsData = await postsResponse.json();

      const usersWithPostsCount = usersData.map((user) => {
        const postsCount = postsData.filter(
          (post) => post.userId === user.id
        ).length;
        return { ...user, postsCount };
      });

      setUsers(usersWithPostsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex justify-center m-5 max-h-screen">
      <div className="w-3/4 border border-black max-h-screen overflow-y-auto shadow-xl bg-white">
        <h1 className="font-bold text-3xl text-center m-3">Directory</h1>
        {users.map((user) => (
          <Link to={`/user/${user.id}`} key={user.id}>
            <div className="p-4 m-6 flex justify-between border rounded-2xl border-red-400 bg-pink-200 shadow-lg">
              <span className="font-semibold text-lg">Name : {user.name}</span>
              <span className="font-semibold text-lg">
                Posts : {user.postsCount}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
