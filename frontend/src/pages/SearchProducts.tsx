import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");

  const getProducts = async () => {
    await axios
      .get(
        `http://localhost:3000/product/65d08e82ef3ff4d04e6e38a0/search?keyword=${input}`
      )
      .then((res) => {
        console.log(res);
      });
  };
  const submitHandler = () => {
    event.preventDefault();
    getProducts();
  };
  return (
    <>
      <div>
        <form>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button onClick={submitHandler}>submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
