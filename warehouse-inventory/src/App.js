// src/App.js
import React, { useState } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleItemAdded = () => {
    setRefresh(!refresh); // Toggle refresh state to re-fetch items
  };

  return (
    <div className="App">
      <ItemForm onItemAdded={handleItemAdded} />
      <ItemList key={refresh} /> {/* Refresh list when key changes */}
    </div>
  );
}

export default App;
