import { useEffect, useState } from "react";
import axios from "axios";
function App() {
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
    <>
      <h1>React App</h1>
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
              {value._id}-{value.name}-{value.price}-
              <button onClick={() => deleteProduct(value._id)}>Delete Product</button>
            </li>
          ))}
      </div>
    </>
  );
}
export default App;