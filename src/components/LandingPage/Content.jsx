import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ItemContext } from "../../App";
import { counterContext } from "../../App";
import "./Context.css";
import Products from "../JsonFiels/Products.json";

export default function Content() {
  const [abc, setAbc] = useState(Products);

  const navigate = useNavigate();

  const { counter, setCounter } = useContext(counterContext);

  const { item, setItem } = useContext(ItemContext);
  const [timeLeft, setTimeLeft] = useState(18000);
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  const saleCards = Products.filter((card) => card.Sale);
  const salePriceCards = saleCards.map((product) => {
    const priceAfter = (product.Sale / 100) * product.price;
    const salePrice = product.price - priceAfter;
    const roundedPrice = salePrice.toFixed(1);
    return { ...product, roundedPrice };
  });

  function AddToCart(event) {
    event.preventDefault();
    const selectedProduct = Products.find(
      (product) => product.id === event.target.id
    );
    setCounter(counter + 1);
    // Retrieve previous items from local storage
    const storedItems = JSON.parse(localStorage.getItem("newItem")) || [];
    // Add the new item to the array of stored items
    const updatedItems = [...storedItems, selectedProduct];

    setItem(() => [...updatedItems]);

    localStorage.setItem("newItem", JSON.stringify(updatedItems));
    setCounter(counter + 1);
  }
  const categories = [
    {
      name: "Writing Instruments",
      imageSrc: "./Images/writing.png",
      category: "writing-instruments",
    },
    {
      name: "Paper Products",
      imageSrc: "./Images/PaperProduct.png",
      category: "paper-products",
    },
    {
      name: "Desk Accessories",
      imageSrc: "./Images/Desk Accessories.png",
      category: "desk-accessories",
    },
    {
      name: "Art Supplies",
      imageSrc: "./Images/Art Supplies.png",
      category: "art-supplies",
    },
    {
      name: "School Supplies",
      imageSrc: "./Images/School Supplies.png",
      category: "school-supplies",
    },
    {
      name: "Presentation",
      imageSrc: "./Images/Presentation Supplies.png",
      category: "Presentation",
    },
    {
      name: "Calendars and Planners",
      imageSrc: "./Images/Calendars and Planners.png",
      category: "calendars-planers",
    },
    {
      name: "Filing and Organization",
      imageSrc: "./Images/Filing and Organization.png",
      category: "filing-organization",
    },
  ];
  function filterAndNavigate(categoryName) {
    const filteredCategory = Products.filter(
      (product) => product.category === categoryName
    );

    setAbc(filteredCategory.length > 2 ? filteredCategory : Products);

    navigate(`/productsPage/${categoryName}`);
  }

  return (
    <>

      <div className="banner pt-10 pb-1">
        <h1 className="text-center text-3xl">Categories</h1>

        <br />
        <p className="text-center">
          Order stationery easily and hassle-free on our eCommerce website. Shop
          now for high-quality products, competitive prices, and fast shipping.
        </p>
        <div className="landing-categories">
          {categories.map((category) => (
            <Link to={`/productsPage/${category.name}`}>
              <div
                key={category.category}
                className="categories-card"
                onClick={() => filterAndNavigate(category.name)}
              >
                <div className="image-category-container">
                  <img src={category.imageSrc} alt={category.name} />
                </div>
                <br />
                <p className="text-center pb-5">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sales-container">
        <div className="flex justify-around ">
          <h3 className="text-2xl	">
            <b>FLASH SALE</b>
          </h3>
          <h3 className="text-2xl	">
            <b>ENDS IN {displayTime}</b>
          </h3>
        </div>
        <div className="flash-sale">
          {salePriceCards.map((product, index) => (
            // <div
            //   key={index}
            //   className="w-full md:w-1/3 xl:w-1/5 p-6 flex flex-col bg-primary m-5 rounded-md"
            // >
            //   <a href="#">
            //     <img
            //       id={product.id}
            //       onClick={AddToCart}
            //       className="hover:grow hover:shadow-lg"
            //       src={product.img}
            //       style={{ height: "200px", width: "100%" }}
            //     />
            //     <div className="flex items-center mt-5 justify-between">
            //       <p className="">{product.title}</p>
            //       <p className="ml-20  text-gray-900">{product.price} JD</p>
            //     </div>

            //     <div className="flex flex-wrap gap-2 justify-around mt-3">
            //       <button
            //         className="btn btn-outline "
            //         id={product.id}
            //         onClick={AddToCart}
            //       >
            //         Add to cart
            //         <svg
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //           stroke-width="1.5"
            //           stroke="currentColor"
            //           class="file: ml-2 h-6 w-6"
            //         >
            //           <path
            //             stroke-linecap="round"
            //             stroke-linejoin="round"
            //             d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            //           />
            //         </svg>
            //       </button>
            //       <button
            //         className="btn btn-outline-blue"
            //         id={product.id}
            //         onClick={AddToCart}
            //       >
            //         {" "}
            //         Details
            //       </button>
            //     </div>
            //   </a>
            // </div>
            <div
              key={index}
              className=" w-full md:w-1/3 sm:w-1/2 xl:w-1/6 flex-wrap p-6 flex flex-col bg-primary m-5 rounded-md"
            >
              <div className="discount-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={15}
                >
                  <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                </svg>
                <p>{product.Sale}%</p>
              </div>
              <a href="#">
                <img className="hover:grow hover:shadow-lg" src={product.img} />
                <div className="pt-3 flex items-center justify-between">
                  <p className="">{product.title}</p>
                  <svg
                    className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                  </svg>
                </div>
                <p className="pt-1 text-gray-900 text-red-600	">
                  {product.roundedPrice}JD{" "}
                  <span className="text-xs line-through mt-3">
                    {product.price}JD
                  </span>
                </p>
                <div className="flex justify-center">
                  <button
                    className="btn btn-sm  btn-outline  mt-3 text-[12px]"
                    id={product.id}
                    // style={{ height: "15px" }}

                    onClick={AddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 flex text-black flex-wrap flex-col justify-center items-center bg-color-black bg-[#f5f2f2]	 ">
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl">
            <b>Featured Products</b>
          </h1>
          <br />
          <p className="w-2/3">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
          <br />
        </div>
        <div className="featured-products-cards w-1/2 flex flex-col">
          <div
            className="featured-prodoct-card p-5
          "
          >
            <img src="./Images/circle.png" />
            <div className="flex-col">
              <strong>Easy to use</strong>
              <p className="text-xs	">
                Things on a very small that you have any direct
              </p>
            </div>
          </div>
          <div
            className="featured-prodoct-card p-5
          "
          >
            <img src="./Images/circle.png" />
            <div className="flex-col">
              <strong>Easy to use</strong>
              <p className="text-xs	">
                Things on a very small that you have any direct
              </p>
            </div>
          </div>
          <div
            className="featured-prodoct-card p-5
          "
          >
            <img src="./Images/circle.png" />
            <div className="flex-col">
              <strong>Easy to use</strong>
              <p className="text-xs	">
                Things on a very small that you have any direct
              </p>
            </div>
          </div>
          <div
            className="featured-prodoct-card p-5
          "
          >
            <img src="./Images/circle.png" />
            <div className="flex-col">
              <strong>Easy to use</strong>
              <p className="text-xs	">
                Things on a very small that you have any direct
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
