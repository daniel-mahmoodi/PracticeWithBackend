import axios from "axios";
import React, { useState, useEffect } from "react";
import "./main.css";
const Main = () => {
     const [counter, SetCounter] = useState(1);
     const [post, setPost] = useState<any>();
     const [disable, setDisable] = useState<any>(true);
     const [showingPost, setShowingPost] = useState<any[]>([]);
     //   console.log("first counter", counter);
     //   console.log("first post", post);
     //   console.log("first showingPost", showingPost);

  const increaseHandler = () => {
    SetCounter(counter + 1);
    const newProduct: any = showingPost.concat(post);
    setShowingPost(newProduct);
    console.log("newProduct", newProduct);
  };
  const fetchApi = () => {
    axios
      .get(`https://fakestoreapi.com/products/${counter}`)
      .then((response) => {
        const responseData = response.data;
        setPost(responseData);
        setDisable(true);

        //    console.log("response.data", responseData);
      })
      .catch((err) => {
        console.log("err1", err);
      });
  };

  useEffect(() => {
    const getFetchApi = async () => {
      fetchApi();
    };
    getFetchApi();
    setDisable(false);
  }, [counter]);
  //   if (!post) return null;
  //   if (!showingPost) return <div>something wrong</div>;
  //   console.log("seccond counter", counter);
  //   console.log("seccond post", post);
  //   console.log("seccond showingPost", showingPost);

  return (
    <div>
      {disable && (
        <button
          className="fetchButton"
          style={
            disable ? { backgroundColor: "red" } : { backgroundColor: "yellow" }
          }
          onClick={increaseHandler}
        >
          <p>click on me to fetch new product</p>
          <p>ther is {counter - 1} products </p>
        </button>
      )}
      {!disable && (
        <button className="disfetchButton">
          <p>loading...</p>
        </button>
      )}

      {/* <p>{post.title}</p> */}

      <ul>
        {showingPost.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
