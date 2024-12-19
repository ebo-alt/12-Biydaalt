import { Footer, Input, Modal, Header, Table } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [product_id, setProductId] = useState();
  const [user_id, setUserId] = useState();
  const [rating, setRating] = useState();
  const [review_text, setReviewText] = useState();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/reviews");
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  const handleEdit = (i) => {
    setId(data[i].review_id);
    setOpen(true);
    setProductId(data[i].product_id);
    setUserId(data[i].user_id);
    setRating(data[i].rating);
    setReviewText(data[i].review_text);
  };
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:4000/update_reviews", {
        user_id,
        product_id,
        rating,
        review_text,
        review_id: id,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/delete_review", {
        data: { id },
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:4000/add_review", {
        user_id,
        product_id,
        rating,
        review_text
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAddButton = () => {
    setId(null);
    setOpen(true);
    setRating(null);
    setUserId(null);
    setProductId(null);
    setReviewText(null);
  };

  return (
    <div>
      <Header />
      <div className="w-full h-screen overflow-scroll">
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

          {data && data.map((review, index) => (
            <div
              key={index}
              className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-lg">ID: {review.review_id}</h2>
                <p className="text-gray-600 truncate">
                  <span className="font-semibold">Rating: </span>
                  {review.rating}
                </p>
                <p className="text-gray-600 truncate">
                  <span className="font-semibold">Review Text: </span>
                  {review.review_text}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">Product ID: </span>
                  {review.product_id}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">User ID: </span>
                  {review.user_id}
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
      <Modal
        open={open}
        setOpen={setOpen}
        title={id ? "Update User" : "Add User"}
      >
        <div className="flex flex-col gap-4">
          <Input label="Rating" value={rating} setValue={setRating} />
          <Input label="Review Text" value={review_text} setValue={setReviewText} />
          <Input
            label="User ID"
            value={user_id}
            setValue={setUserId}
          />
          <Input
            label="Product ID"
            value={product_id}
            setValue={setProductId}
          />
          <div className="flex justify-end gap-4">
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

            <button
              className="p-2 px-6 rounded-lg bg-blue-400 text-white font-medium hover:bg-blue-500 transition-all"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}