import { useEffect, useState } from "react";
import { USERS_API, POSTS_API } from "../Constants";
import { useParams, Link } from "react-router-dom";
import PostPopup from "./PostPopup";
import Countries from "./Countries";
import CountryTime from "./CountryTime";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("Asia/Kolkata");
  const { id } = useParams();

  useEffect(() => {
    getUsers();
    getPosts();
  }, [id]);

  async function getUsers() {
    try {
      const userResponse = await fetch(`${USERS_API}/${id}`);
      const userData = await userResponse.json();
      setUser(userData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function getPosts() {
    try {
      const postsResponse = await fetch(POSTS_API);
      const postsData = await postsResponse.json();
      const postsCount = postsData.filter(
        (posts) => posts.userId === parseInt(id)
      );
      setUserPosts(postsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const openPopup = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="flex justify-center m-5 max-h-screen">
      <div className="w-5/6 border border-black p-3 overflow-y-auto bg-blue">
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <Link to="/">
              <button className="bg-blue-400 p-2 m-1.5 rounded-lg text-white text-lg">
                Back
              </button>
            </Link>
            <section>
              <div className="flex flex-col md:flex-row">
                <Countries onSelectCountry={handleCountrySelect} />
                <CountryTime selectedCountry={selectedCountry} />
              </div>
            </section>
          </div>

          <div className="my-5">
            <p className="font-bold text-2xl text-center my-3">Profile Page</p>
            <section className="border border-gray-500 rounded-xl p-3 m-1 flex justify-between bg-slate-100">
              <div className="md:flex md:justify-between">
                <div>
                  <p className="font-semibold text-lg m-1">{user.name}</p>
                  <p className="m-1">
                    {user.username} | {user?.company?.catchPhrase}
                  </p>
                </div>
                <div>
                  <p className="m-1">{`${user?.address?.suite}, ${user?.address?.street}, ${user?.address?.city}`}</p>
                  <p className="m-1">
                    {user.email} | {user.phone}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="my-8">
          <p className="font-bold text-2xl text-center my-3">Posts</p>
          <div className="flex flex-wrap mt-2 cursor-pointer">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="w-full md:w-1/3 p-2"
                onClick={() => openPopup(post)}
              >
                <div className="border border-gray-500 rounded-xl p-2 bg-slate-100">
                  <h3 className="font-bold">{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {selectedPost && <PostPopup post={selectedPost} onClose={closePopup} />}
    </div>
  );
};

export default UserProfile;
