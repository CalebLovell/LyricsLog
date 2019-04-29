import React, { Component } from "react";
import "./Add.scss";
import { connect } from "react-redux";
import { getUserData } from "./../../ducks/userReducer";
import axios from "axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songInstanceTitle: "",
      artistName: "",
      languageName: "",
      songInstanceArt: "",
      lineLyrics: "",
      lineTranslationLyrics: "",
      lineTranslationExplanations: ""
    };
  }

  componentDidMount() {
    this.props.getUserData();
  }

  submitSongInfo = async () => {
    const {
      songInstanceTitle,
      artistName,
      languageName,
      songInstanceArt,
      lineLyrics,
      lineTranslationLyrics,
      lineTranslationExplanations
    } = this.state;
    try {
      const { id } = this.props.user;
      const result = await axios.post("/create", {
        id,
        songInstanceTitle,
        artistName,
        languageName,
        songInstanceArt,
        lineLyrics,
        lineTranslationLyrics,
        lineTranslationExplanations
      });
      const { submitted, newSongInstanceID } = result.data;
      if (submitted === true) {
        this.props.history.push(`/song/${newSongInstanceID}`);
      } else {
        alert(`Song submission failed.`);
      }
    } catch (err) {
      console.log(
        `There was a problem in your submitSongInfo method of the Add component: ${err}`
      );
    }
  };

  render() {
    // console.log(this.state)
    return (
      <div className="add-page">
        <div className="top-banner">
          <h1>Add a Song's Info Below</h1>
          <div className="add-page-details-form">
            <input
              onChange={e =>
                this.setState({ songInstanceTitle: e.target.value })
              }
              value={this.state.songInstanceTitle}
              type="text"
              placeholder="Enter Song Title"
            />
            <input
              onChange={e => this.setState({ artistName: e.target.value })}
              value={this.state.artistName}
              type="text"
              placeholder="Enter Artist Name"
            />
            <input
              onChange={e => this.setState({ languageName: e.target.value })}
              value={this.state.languageName}
              type="text"
              placeholder="Enter Language Name"
            />
            <input
              onChange={e => this.setState({ songInstanceArt: e.target.value })}
              value={this.state.songInstanceArt}
              type="text"
              placeholder="Enter Album Art"
            />
          </div>
        </div>
        <div className="main-banner">
          <div className="add-page-text-areas">
            <textarea
              className="og-lyrix text-area"
              placeholder="Enter Lyrics"
              onChange={e => this.setState({ lineLyrics: e.target.value })}
              value={this.state.lineLyrics}
              type="text"
            />
            <button onClick={() => this.submitSongInfo()}>Submit</button>
            <textarea
              className="new-lyrix text-area"
              placeholder="Enter Translation"
              onChange={e =>
                this.setState({ lineTranslationLyrics: e.target.value })
              }
              value={this.state.lineTranslationLyrics}
              type="text"
            />
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
)(Add);
