import React, { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
//fetching data from a fake API
  useEffect(function () {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network Error!");
        }
        return response.json();
      })
      .then(function (data) {
        setProducts(data);
        setLoading(false);
      })
      .catch(function () {
        setError(true);
        setLoading(false);
      });
  }, []);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function clearSearch() {
    setSearchQuery("");
  }

  let filteredProducts = products.filter(function (product) {
    return product.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  });

  return (
    <div style={{ padding: 20, fontFamily: "Papyrus" }}>
      <h1 style={ {textDecoration: "underline", fontSize: 40}}>Product Catalog</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: 203,
            padding: 8,
            border: "1px solid blue",
            borderRadius: 5
          }}
        />
        <button
          onClick={clearSearch}
          style={{ marginLeft: 8, padding: "8px 10px", border: " 1px solid red", borderRadius: 5, justifyContent: "center"}}
        >
          Clear
        </button>
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "red" }}>Failed to load products.</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {!loading &&
          !error &&
          filteredProducts.map(function (product) {
            return (
              <div
                key={product.id}
                style={{
                  border: "1px solid gold",
                  padding: 12,
                  width: 200,
                  boxSizing: "border-box",
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: 120, height: 120, objectFit: "contain" }}
                  />
                </div>

                <h3 style={{ fontSize: 14, minHeight: 44 }}>{product.title}</h3>
                <p style={{ fontWeight: "600" }}>
                  ${product.price.toFixed(2)}
                </p>

                <p style={{ color: "light grey", fontSize: 12, marginTop: 6 }}>
                  {product.category}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
