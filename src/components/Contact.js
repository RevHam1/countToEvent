import React, { Component } from "react";

const API = "AIzaSyD1vRWwJ7Ojp41RJs82hxCAyFwcnvHkGFg";
const channelID = "UCXgGY0wkgOzynnHvSEVmE3A";
const result = 5;

// // https://www.googleapis.com/youtube/v3/search?key=AIzaSyD1vRWwJ7Ojp41RJs82hxCAyFwcnvHkGFg&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet,id&order=date&maxResults=10

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`;

class Contact extends Component {
  state = {
    results: [],
    videoIds: [],
  };

  clicked = () => {
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        const videoIds = responseJson.items.map(
          (item) => "https://www.youtube.com/embed/" + item.id.videoId
        );
        this.setState({ videoIds: videoIds, results: responseJson.items });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <div className="center">
          <button className="btn1" onClick={this.clicked}>
            Get youtube videos
          </button>
          {this.state.videoIds.map((link, i) => {
            var frame = (
              <div className="center youtube" key={i}>
                <iframe
                  width="560"
                  height="315"
                  src={link}
                  title={this.state.results[i].snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            );
            return frame;
          })}
        </div>
        {this.frame}
      </div>
    );
  }
}

export default Contact;
