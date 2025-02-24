import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [product, setproduct] = useState([]);
  const [cartData, setcartData] = useState([]);
  const [count, setcount] = useState(0);

  const GetData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    setproduct(response.data);
  };

  const addToCart = (idx) => {
    const ans = cartData.includes(product[idx]);
    if (!ans) {
      setcartData([...cartData, product[idx]]);
      setcount(count + 1);
    } else {
      return;
    }
    console.log(cartData);
  };

  const deleteCard = (idx) => {
    setproduct(
      product.filter((elem, index) => {
        return index != idx;
      })
    );
  };

  const deleteFromCart = (idx) => {
    console.log("Clicked");
    setcount(count - 1);
    const copyData = [...cartData];
    copyData.splice(idx, 1);
    setcartData(copyData);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="p-4">
      <button
        onClick={GetData}
        className="px-4 py-3 text-xl rounded active:scale-95"
      >
        Api Data
      </button>
      <hr />
      <div className="flex mt-4">
        <div className="w-[75%] h-screen overflow-auto flex flex-wrap">
          {product.length > 0 ? (
            product.map(function (elem, idx) {
              return (
                <div
                  key={idx}
                  className="bg-white w-40 m-1 p-3 text-center shadow rounded-md"
                >
                  <img
                    className="hover:scale-95 h-32 mx-auto"
                    src={elem.image}
                    alt=""
                  />
                  <h1 className="h-18 overflow-hidden">{elem.title}</h1>

                  <button
                    onClick={() => {
                      addToCart(idx);
                    }}
                    className="active:scale-95 mt-4 bg-yellow-500 text-white rounded px-5 py-2"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      deleteCard(idx);
                    }}
                    className=" mt-1 text-red-600 active:scale-95 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              );
            })
          ) : (
            <h1 className="text-xl mx-auto mt-2.5">Loading ...</h1>
          )}
        </div>
        <div  className="w-[35%] h-screen overflow-y-auto shadow-xl  rounded-xl p-2">
          <h1 className="text-lg text-center mb-5 ">
            Items count is : {count}
          </h1>
          {cartData.map(function (elem, idx) {
            return (
              <>
                <div key={idx} className="flex p-2 mb-2 items-center justify-between shadow-sm rounded bg-white gap-4">
                  <div key={idx} className="flex items-center gap-5">
                    <img className="h-14" src={elem.image} alt="" />
                    <h1>{elem.title}</h1>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        deleteFromCart(idx);
                      }}
                      className="px-3 py-1 bg-red-500  text-white rounded-md outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
