import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUserData } from "../../../ducks/userReducer";
import "../Auth.scss";

class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      image: this.props.user.image
    };
  }

  componentDidMount() {
    this.props.getUserData();
  }

  editInfo = async id => {
    const { name, email, image } = this.state;
    try {
      const result = await axios.put(`/auth/editInfo/${id}`, {
        name,
        email,
        image
      });
      await this.props.getUserData();
      if (result.data.loggedIn) {
        this.props.history.push("/profile");
      } else {
        alert(`Login failed. User not logged in.`);
      }
    } catch (err) {
      console.log(
        `Your editInfo metho don the EditInfo component threw an error: ${err}`
      );
    }
  };

  cancelEdit = () => {
    try {
      this.props.history.push("/profile");
    } catch (err) {
      console.log(`You got an error: ${err}`);
    }
  };

  render() {
    return (
      <div className="auth-page">
        <div className="form">
          <div className="h4-div">
            <h4>EDIT INFO</h4>
          </div>
          <div className="input-slot">
            <i class="fa fa-user icon" />
            <input
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="input-slot">
            <i class="fa fa-envelope icon" />
            <input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="input-slot">
            <i class="fa fa-camera icon" />
            <input
              onChange={e => this.setState({ image: e.target.value })}
              value={this.state.image}
              type="text"
              placeholder="Profile Picture"
            />
          </div>
          <div className="buttons-container edit-info-buttons">
            <button onClick={e => this.editInfo(this.props.user.id)} className="left-button">
              Edit Info
            </button>
            <button onClick={e => this.cancelEdit(this.props.user.id)} className="right-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData }
)(EditInfo);
