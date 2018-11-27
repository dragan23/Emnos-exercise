import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import "./Posts.css"

export default class Posts extends Component {
  render() {
    return (
      <div className="posts">
        <Item.Group divided>
          {this.props.posts.map((post, i) => (
            <Item key={i}>
              <Item.Content>
                <Item.Header>
                  <a
                    href={`https://reddit.com${post.permalink}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {post.title}
                  </a>
                </Item.Header>
                <Item.Description>
                  Posted by{" "}
                  <a
                    href={`https://reddit.com/user/${post.author}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {post.author}
                  </a>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
