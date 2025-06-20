import { useEffect, useState } from "react";
import axios from "axios";

const Crud = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [flag,setFlag] = useState(false)
  useEffect(() => {
    fetch("http://localhost:8081/Products").then((res) =>
      res.json().then((data) => setProducts(data))
    );
  }, [flag]);

  const addProduct = async () => {
    axios.post("http://localhost:8081/Products", product);
    console.log(flag)
    setFlag(!flag)
  };
  const deleteProduct = async (id) => {
    console.log(id)
    await axios.delete("http://localhost:8081/Products/" + id);
    setFlag(!flag);
  };
  return (
    <div className="crud-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>CRUD Operations</h1>
        <button 
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <div>
        <p><input
          placeholder="Product Name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        ></input></p>
        <p><input
          type="number"
          placeholder="Price"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        ></input></p>
        <p><button onClick={addProduct}>Add Product</button></p>
      </div>
      <div>
        {products &&
          products.map((value) => (
            <li key={value._id}>
              <div className="product-info">
                <span className="product-name"><strong>Name:</strong> {value.name}</span>
                <span className="product-price"><strong>Price:</strong> ${value.price}</span>
                <span className="product-id"><strong>ID:</strong> {value._id}</span>
              </div>
              <button onClick={() => deleteProduct(value._id)}>Delete Product</button>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Crud;