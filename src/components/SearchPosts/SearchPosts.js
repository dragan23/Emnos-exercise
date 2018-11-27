import React, { Component } from "react";
import { Input, Grid, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./SearchPosts.css";

export default class SearchPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHasIcon: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchValue !== prevProps.searchValue) {
      if (this.props.searchValue.length > 0) {
        this.setState({ inputHasIcon: true });
      } else {
        this.setState({ inputHasIcon: false });
      }
    }
  }

  render() {
    return (
      <div className="searchInputWrapper">
        <div className="posts">
          <Grid columns={2}>
            <Grid.Column>
              <h3>Posts</h3>
            </Grid.Column>
            <Grid.Column>
              <Input
                icon={
                  this.state.inputHasIcon ? (
                    <Icon
                      name="close"
                      link
                      onClick={this.props.handleCloseIconClick}
                    />
                  ) : (
                    "search"
                  )
                }
                placeholder="Search posts"
                style={{ width: "250px", float: "right" }}
                type="text"
                onChange={this.props.handleSearchInputChange}
                value={this.props.searchValue}
              />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}


SearchPosts.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleSearchInputChange: PropTypes.func.isRequired,
  handleCloseIconClick: PropTypes.func.isRequired
};