import { Footer, Input, Modal, Header } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState();
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [product_name, setProductName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
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
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };
  const handleEdit = (i) => {
    setId(products[i].product_id);
    setOpen(true);
    setProductName(products[i].product_name);
    setDescription(products[i].description);
    setPrice(products[i].price);
    setStock(products[i].stock);
  };
  const handleUpdate = async () => {
    try {
      await axios.patch("http://localhost:4000/update_products", {
        product_name,
        description,
        price,
        stock,
        product_id: id,
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:4000/delete_product", {
        data: { id },
      });
      console.log('wjat')
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:4000/add_product", {
        product_name,
        description,
        price,
        stock
      });
      setOpen(false);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  const handleAddButton = () => {
    setId(null);
    setProductName("");
    setDescription("");
    setPrice(null);
    setStock(null);
    setOpen(true);
  };
  const filter = () => {
    if (!search) return products;
    return products.filter((e) => {
      return (
        e.product_name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.price.includes(search) ||
        e.stock.toString().includes(search) ||
        e.product_id.toString().includes(search)
      );
    });
  };

  if (error) <div>{error}</div>;

  return (
    <div>
  <Header />
  <div className="w-full h-screen overflow-scroll">
    <div className="flex px-6 items-center gap-6 sticky top-0 bg-white h-20 shadow-md z-10">
      <div className="flex flex-col w-1/5">
        <h1 className="font-bold text-2xl">Welcome Back</h1>
        <p className="font-normal text-sm text-gray-500">
          Manage your products efficiently.
        </p>
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
        Add Product
      </button>
    </div>

    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products &&
        filter().map((product, index) => (
          <div
            key={index}
            className="p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg text-gray-800 truncate">
              {product.product_name}
            </h2>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {product.description}
            </p>
            <div className="mt-3">
              <p className="text-gray-800 font-semibold">
                Price: ${product.price}
              </p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <p className="text-sm text-gray-400">
                Added:{" "}
                {new Date(product.created_at).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
              </p>
            </div>
            <button
              className="mt-4 text-blue-500 hover:underline"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
          </div>
        ))}
    </div>

    <Footer />
  </div>

  <Modal open={open} setOpen={setOpen} title={id ? "Update Product" : "Add Product"}>
    <Input 
      label="Product Name" 
      value={product_name} 
      setValue={setProductName} 
    />
    <Input 
      label="Description" 
      value={description} 
      setValue={setDescription} 
    />
    <Input 
      label="Price" 
      type="number" 
      value={price} 
      setValue={setPrice} 
    />
    <Input 
      label="Stock" 
      type="number" 
      value={stock} 
      setValue={setStock} 
    />
    <div className="flex justify-end gap-4 mt-4">
      {id ? (
        <>
          <button
            className="p-2 px-6 rounded-lg bg-green-500 text-white font-medium shadow-sm hover:bg-green-600 transition"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="p-2 px-6 rounded-lg bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      ) : (
        <button
          className="p-2 px-6 rounded-lg bg-blue-500 text-white font-medium shadow-sm hover:bg-blue-600 transition"
          onClick={handleAdd}
        >
          Add
        </button>
      )}
    </div>
  </Modal>
</div>
  );
}
