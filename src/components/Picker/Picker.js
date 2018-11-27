import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Container, Image, Select } from "semantic-ui-react";
import "./Picker.css";

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: []
    };
  }

  componentDidMount() {
    const { options } = this.props;
    const newOptions = options.map((item, index) => {
      return {
        key: index,
        value: item,
        text: item
      };
    });
    this.setState({ selectOptions: newOptions });
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="picker">
        <Header as="h2" icon textAlign="center" className="header">
          <Image centered size="medium" src="reddit-logo.png" />
          <Header.Content>{value}</Header.Content>
        </Header>
        <Container>
          {this.state.selectOptions.length && (
            <Select
              style={{ marginBottom: "5px" }}
              fluid
              onChange={onChange}
              defaultValue={this.state.selectOptions[0].value}
              options={this.state.selectOptions}
            />
          )}
        </Container>
      </div>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
