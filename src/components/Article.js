import React from "react";
import { Button, ListGroup, Navbar } from "react-bootstrap";
import "./article.css";
const Article = ({ data, clicked }) => {
  function handleSave() {
    clicked(data.name);
  }
  return (
    <div>
      <div className="outer">
        <div className="inner">
          <a href={data.url} target="_blank">
            <span>{data.title.substring(0, 30) + "..."}</span>
          </a>

          <span>posted by {data.author}</span>
          <span>commented by {data.num_comments}</span>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
