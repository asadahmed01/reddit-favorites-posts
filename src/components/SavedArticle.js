import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./article.css";
const SavedArticle = () => {
  const [posts, setposts] = useState({
    articles: [],
    ids: JSON.parse(localStorage.getItem("ids")) || [],
  });

  const [arr, setarr] = useState(JSON.parse(localStorage.getItem("ids")) || []);

  useEffect(() => {
    //const postsIds = JSON.parse(localStorage.getItem("ids"));
    let joinedIds = posts.ids || [];
    if (joinedIds.length > 0) {
      axios
        .get(`https://api.reddit.com/api/info/?id=${joinedIds}`)
        .then(function (response) {
          setposts({ ...posts, articles: response.data.data.children });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [posts.ids]);

  //delete post
  function handleDelete(i) {
    const ids = [...posts.ids];
    const rest = ids.filter((item) => item !== i);
    setposts({ ...posts, ids: rest });
    localStorage.setItem("ids", JSON.stringify(posts.ids));
    if (posts.ids.length === 0) {
      window.location.reload();
    }
  }

  console.log(arr);
  return (
    <Container>
      <h1 className="mt-4">My Favorite Posts</h1>
      {posts.articles.length &&
        posts.articles.map((p, i) => {
          return (
            <div className="outer mt-5" key={i}>
              <div className="inner">
                <span>{p.data.title}</span>
                <span>posted by {p.data.author}</span>
                <span>commented by {p.data.num_comments}</span>
                <Button
                  variant="danger"
                  onClick={(e) => handleDelete(p.data.name)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
    </Container>
  );
};

export default SavedArticle;
