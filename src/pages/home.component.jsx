import React, { Component } from "react";
import { Button, FormGroup, FormControl, InputGroup } from "react-bootstrap";
import "./home.styles.scss";
import api from "../utils/api";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  async search() {
    const response = await api.get("/search", {
      params: {
        q: this.state.query
      }
    });

    console.log("data" + response.data);

    this.setState({
      query: ""
    });
  }

  render() {
    return (
      <>
        <header>
          <div className="content">
            <h1>Music Master</h1>
            <FormGroup inline className="searchBox">
              <InputGroup>
                <FormControl
                  type="text"
                  name="query"
                  value={this.state.query}
                  onChange={this.handleChange.bind(this)}
                  placeholder="Search an artist"
                  onKeyPress={this.handleKeyPress.bind(this)}
                />
              </InputGroup>
              <Button onClick={this.search.bind(this)}>Search</Button>
            </FormGroup>
          </div>
        </header>
      </>
    );
  }
}
