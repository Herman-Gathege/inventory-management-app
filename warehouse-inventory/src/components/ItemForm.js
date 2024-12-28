// src/components/ItemForm.js
import React, { useState } from "react";
import axios from "axios";

const ItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/items", formData)
      .then((response) => {
        console.log("Item added:", response.data);
        onItemAdded(); // Notify parent to refresh the list
        setFormData({ name: "", quantity: "", price: "", category: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  return (
   
    <form onSubmit={handleSubmit} className="p-3 border rounded">
  <h2>Add New Item</h2>
  <div className="mb-3">
    <label className="form-label">Name:</label>
    <input
      type="text"
      name="name"
      className="form-control"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label">Quantity:</label>
    <input
      type="number"
      name="quantity"
      className="form-control"
      value={formData.quantity}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label">Price:</label>
    <input
      type="number"
      name="price"
      className="form-control"
      value={formData.price}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label">Category:</label>
    <input
      type="text"
      name="category"
      className="form-control"
      value={formData.category}
      onChange={handleChange}
      required
    />
  </div>
  <button type="submit" className="btn btn-primary">Add Item</button>
</form>

  );
};

export default ItemForm;


