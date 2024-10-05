import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [productList, setProductList] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://productlistapi.vikasmishra.online/api/products/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      console.log("data", data);
      if (data.message === "Product deleted successfully") {
        setProductList(productList.filter((product) => product._id !== id));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://productlistapi.vikasmishra.online/api/products",
          { method: "GET" }
        );
        const data = await res.json();
        console.log("data", data);
        setProductList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="container">
      {productList.map((product) => {
        const { _id, name, quantity, price } = product;
        return (
          <div key={_id} className="card">
            <div>
              <div>Name: {name}</div>
              <div>Quantity: {quantity}</div>
              <div>Price: {price}</div>
            </div>
            <div className="delete_btn">
              <button
                onClick={() => {
                  handleDelete(_id);
                }}
              >
                Delete Item
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
