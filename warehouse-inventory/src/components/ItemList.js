import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState("name"); // Default sort field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  // Fetch items from the backend
  const fetchItems = () => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:5000/items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Delete an item
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/items/${id}`)
      .then(() => {
        console.log("Item deleted");
        fetchItems();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // Start editing an item
  const startEditing = (item) => {
    setEditingItem(item);
  };

  // Update an item
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:5000/items/${editingItem.id}`, editingItem)
      .then(() => {
        console.log("Item updated");
        setEditingItem(null); // Exit edit mode
        fetchItems();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  // Filter items based on the search query
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting Function
  const sortItems = (field, order) => {
    return [...filteredItems].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Handle sorting change
  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortItems(sortField, sortOrder).slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination links
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading items...</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Warehouse Inventory</h1>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <p>click ID, Name, Quantity, Price or Category to sort items by</p>
      {editingItem ? (
        <form onSubmit={handleUpdate} className="p-4 border rounded">
          <h2>Edit Item</h2>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity:</label>
            <input
              type="number"
              value={editingItem.quantity}
              onChange={(e) =>
                setEditingItem({ ...editingItem, quantity: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price:</label>
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({ ...editingItem, category: e.target.value })
              }
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">Save</button>
          <button onClick={() => setEditingItem(null)} className="btn btn-secondary">Cancel</button>
        </form>
      ) : (
        <table className="table table-striped table-bordered">
          
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("quantity")}>Quantity</th>
              <th onClick={() => handleSort("price")}>Price</th>
              <th onClick={() => handleSort("category")}>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEditing(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        />
      </Pagination>
    </div>
  );
};

export default ItemList;

