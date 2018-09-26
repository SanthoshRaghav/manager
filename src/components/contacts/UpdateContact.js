import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";
class UpdateContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
  onValueChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onValueSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "") {
      this.setState({
        error: {
          name: "Please Enter Name"
        }
      });
      return;
    }
    if (email === "") {
      this.setState({
        error: {
          email: "Please Enter Email"
        }
      });
      return;
    }
    if (phone === "") {
      this.setState({
        error: {
          phone: "Please Enter Phone"
        }
      });
      return;
    }
    const { id } = this.props.match.params;

    const updateContact = {
      name,
      email,
      phone
    };
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );
    console.log(res.data);
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      error: {}
    });
    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, error } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Update Contact</div>
              <div className="card-body">
                <form onSubmit={this.onValueSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    label="Name"
                    placeholder="Enter Name"
                    onChange={this.onValueChange}
                    value={name}
                    error={error.name}
                  />
                  <TextInputGroup
                    name="email"
                    label="Email"
                    placeholder="Enter Email"
                    onChange={this.onValueChange}
                    value={email}
                    type="email"
                    error={error.email}
                  />
                  <TextInputGroup
                    name="phone"
                    label="Phone"
                    placeholder="Enter Phone"
                    onChange={this.onValueChange}
                    value={phone}
                    error={error.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-light"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default UpdateContact;
