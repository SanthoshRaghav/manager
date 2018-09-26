import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";
class Contact extends Component {
  state = {
    showContacts: false
  };
  onShowClick = () => {
    const { showContacts } = this.state;
    this.setState({
      showContacts: !showContacts
    });
  };
  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };
  render() {
    const { showContacts } = this.state;
    const { id, name, email, phone } = this.props.contact;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-sort-down"
                  onClick={this.onShowClick}
                />
                <i
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  className="fas fa-times"
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />

                <Link to={`/contact/update/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      marginRight: "1rem",
                      float: "right",
                      color: "black"
                    }}
                  />
                </Link>
              </h4>
              {showContacts ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Contact;
Contact.defaultProps = {
  name: "Some Name",
  email: "someemail.com",
  phone: "123-456-78910"
};
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
