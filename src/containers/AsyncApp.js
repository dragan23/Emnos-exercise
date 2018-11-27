import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEqual from "lodash.isequal";
import { Container, Icon } from "semantic-ui-react";
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from "../actions";

import Picker from "../components/Picker/Picker";
import Posts from "../components/Posts/Posts";
import SearchPosts from "../components/SearchPosts/SearchPosts";

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filterText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.handleCloseIconClick = this.handleCloseIconClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(this.props.posts, prevProps.posts) ||
      this.state.filterText !== prevState.filterText
    ) {
      this.filterPosts();
    }
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(event, data) {
    this.props.dispatch(selectSubreddit(data.value));
    this.props.dispatch(fetchPostsIfNeeded(data.value));
  }

  filterPosts() {
    if (this.state.filterText.length) {
      const newPosts = this.props.posts.filter(item => {
        return item.title.search(new RegExp(this.state.filterText, "i")) !== -1;
      });
      if (newPosts.length) {
        this.setState({ posts: newPosts });
      } else {
        this.setState({ posts: [] });
      }
    } else {
      this.setState({ posts: this.props.posts });
    }
  }

  handleSearchInputChange(e) {
    const value = e.target.value;
    this.setState({ filterText: value });
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  handleCloseIconClick(e) {
    this.setState({ filterText: "" });
  }

  render() {
    const { posts } = this.state;
    const { selectedSubreddit, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={["reactjs", "frontend", "freelance"]}
        />
        <Container textAlign="right">
          <p>
            {lastUpdated && (
              <span style={{ marginRight: "10px" }}>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              </span>
            )}
            {!isFetching ? (
              <Icon
                name="refresh"
                style={{ cursor: "pointer" }}
                onClick={this.handleRefreshClick}
              />
            ) : (
              <Icon disabled name="refresh" />
            )}
          </p>
        </Container>

        <Container>
          <SearchPosts
            handleSearchInputChange={this.handleSearchInputChange}
            handleCloseIconClick={this.handleCloseIconClick}
            searchValue={this.state.filterText}
          />
          {isFetching && posts.length === 0 && <h2>Loading...</h2>}
          {!isFetching && posts.length === 0 && <h2>No results found.</h2>}
          {posts.length > 0 && (
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(AsyncApp);
