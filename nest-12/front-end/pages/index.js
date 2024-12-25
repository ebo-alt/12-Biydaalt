import { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Header } from "@/components";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response);

        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/add_user", {
        username,
        email,
        password,
      });

      setUsername("");
      setPassword("");
      setEmail("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center items-center bg-white shadow-md m-6 rounded-lg p-8">
        <h1 className="text-5xl font-extrabold text-blue-600 tracking-tight mb-4">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-700">
          Welcome to the official admin panel. Manage users, analyze data, and configure settings with ease.
        </p>
      </div>
      <Footer />
    </div>
  );
}
