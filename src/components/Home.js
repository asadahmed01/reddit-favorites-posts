import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import Article from "./Article";

const Home = () => {
  const [state, setState] = useState({
    redditPosts: [],
    query: "",
    postIds: [],
  });

  //keep track of user input

  function handleChange(e) {
    setState({ ...state, query: e.target.value });
  }

  //handle storing to the local storage
  function handleStorage(id) {
    if (state.postIds.indexOf(id) === -1) {
      setState({ ...state, postIds: [...state.postIds, id] });
      localStorage.setItem("ids", JSON.stringify([...state.postIds, id]));
    } else {
    }
  }
  //handle api call

  function handleApi() {
    if (state.query === "") {
      alert("input field cannot be empty");
      return;
    }
    callRedditApi();
  }
  //call reddit api

  function callRedditApi() {
    axios
      .get(`https://www.reddit.com/r/${state.query}/hot.json?limit=8`)
      .then(function (response) {
        // handle success
        console.log(response.data.data.children);
        //setData(response.data.data.children);
        setState({ ...state, redditPosts: response.data.data.children });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div>
      <Container>
        <div className="mx-auto w-50 px-5">
          <p className="h4 text-center py-4">Reddit Tracker</p>

          <label
            htmlFor="defaultFormCardEmailEx"
            className="grey-text font-weight-light"
          >
            Type subreddit here
          </label>
          <input
            type="text"
            placeholder="subreddit"
            className="form-control text-center"
            onChange={handleChange}
          />
          <div className="text-center py-4 mt-2">
            <Button
              className="btn btn-outline-purple w-100"
              onClick={handleApi}
            >
              Submit
            </Button>
          </div>
        </div>
        <div>
          {state.redditPosts.map((p, i) => {
            return <Article data={p.data} clicked={handleStorage} key={i} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default Home;
