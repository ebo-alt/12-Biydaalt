import { Footer, Input, Modal, Header } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  const handleEdit = (i) => {
    setId(users[i].user_id);
    setOpen(true);
    setUsername(users[i].username);
    setEmail(users[i].email);
    setPassword(users[i].password);
  };
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:4000/update_users", {
        username,
        email,
        password,
        user_id: id,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/delete_user", {
        data: { id: id },
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:4000/add_user", {
        username,
        email,
        password,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAddButton = () => {
    setId(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setOpen(true);
  };
  const filter = () => {
    if (!search) return users;
    return users.filter((e) => {
      return (
        e.username.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.user_id.toString().includes(search.toLowerCase())
      );
    });
  };

  if (error) <div>{error}</div>;

  return (
    <div>
      <Header />
      <div className="w-full h-screen overflow-y-scroll">
        <div className="flex justify-between px-6 items-center gap-6 sticky top-0 bg-white h-20 shadow-md z-10">
          <div className="flex flex-col w-1/3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
              Welcome Back
            </h1>
            <h2 className="text-sm font-light text-gray-600">
              Manage your users with ease and efficiency.
            </h2>
          </div>

          <button
            className="p-3 px-8 whitespace-nowrap rounded-lg bg-blue-400 text-white font-medium shadow-md hover:bg-blue-500 transition-all"
            onClick={handleAddButton}
          >
            Add User
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users &&
            filter().map((user, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-lg">ID: {user.user_id}</h2>
                  <p className="text-gray-600 truncate">
                    <span className="font-semibold">Email: </span>
                    {user.email}
                  </p>
                  <p className="text-gray-600 truncate">
                    <span className="font-semibold">Username: </span>
                    {user.username}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-semibold">Created Date: </span>
                    {new Date(user.created_at).toLocaleDateString("en-US", dateOptions)}
                  </p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="text-blue-500 font-medium hover:underline"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
        </div>

        <Footer />
      </div>

      {/* Modal */}
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update User" : "Add User"}
      >
        <div className="flex flex-col gap-4">
          <Input label="Username" value={username} setValue={setUsername} />
          <Input label="Email" value={email} setValue={setEmail} />
          <Input
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          <div className="flex justify-end gap-4">
            {id ? (
              <>
                <button
                  className="p-2 px-6 rounded-lg bg-green-400 text-white font-medium hover:bg-green-500 transition-all"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="p-2 px-6 rounded-lg bg-red-400 text-white font-medium hover:bg-red-500 transition-all"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                className="p-2 px-6 rounded-lg bg-blue-400 text-white font-medium hover:bg-blue-500 transition-all"
                onClick={handleAdd}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
