import { Footer, Input, Modal, Header } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
    const [data, setData] = useState();
    const [id, setId] = useState();
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const [total_amount, setTotalAmount] = useState();
    const [status, setStatus] = useState();
    const [user_id, setUserId] = useState();
    const [search, setSearch] = useState();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/orders");
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };
    const handleEdit = (i) => {
        setId(data[i].order_id);
        setOpen(true);
        setTotalAmount(data[i].total_amount);
        setStatus(data[i].status);
        setUserId(data[i].user_id);
    };
    const handleUpdate = async () => {
        try {
            await axios.patch("http://localhost:4000/update_orders", {
                user_id,
                total_amount,
                status,
                order_id: id,
            });
            setOpen(false);
            fetchPosts();
        } catch (err) {
            setError(err.response?.data?.error || "Error");
        }
    };
    const handleDelete = async () => {
        try {
            await axios.delete("http://localhost:4000/delete_orders", {
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
            await axios.post("http://localhost:4000/add_order", {
                user_id,
                total_amount,
                status,
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
        setTotalAmount(null);
        setStatus(null);
        setUserId(null);
    };
    const filter = () => {
        if (!search) return data;
        return data.filter((e) => {
            return (
                e.status.includes(search.toLowerCase()) ||
                e.total_amount.toString().includes(search.toLowerCase()) ||
                e.order_id.toString().includes(search) ||
                e.user_id.toString().includes(search)
            );
        });
    };

    return (
        <div>
            <Header />
            <div className="w-full h-screen overflow-y-scroll">
                <div className="flex px-6 items-center gap-6 sticky top-0 bg-white h-20 shadow-md z-10">
                    <div className="flex flex-col w-1/3">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
                            Welcome Back
                        </h1>
                        <h2 className="text-sm font-light text-gray-600">
                            Manage your users with ease and efficiency.
                        </h2>
                    </div>

                    <Input
                        value={search}
                        setValue={setSearch}
                        label="Search"
                        className="flex-grow max-w-md"
                    />
                    <button
                        className="p-3 px-8 whitespace-nowrap rounded-lg bg-blue-400 text-white font-medium shadow-md hover:bg-blue-500 transition-all"
                        onClick={handleAddButton}
                    >
                        Add Orders
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data &&
                        filter().map((user, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-lg">ID: {user.user_id}</h2>
                                    <p className="text-gray-600 truncate">
                                        <span className="font-semibold">Total Amount: </span>
                                        {user.total_amount}
                                    </p>
                                    <p className="text-gray-600 truncate">
                                        <span className="font-semibold">Status: </span>
                                        {user.status}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        <span className="font-semibold">User id: </span>
                                        {user.user_id}
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
                    <Input label="Total Amount" value={total_amount} setValue={setTotalAmount} />
                    <Input label="Status" value={status} setValue={setStatus} />
                    <Input
                        label="User ID"
                        value={user_id}
                        setValue={setUserId}
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