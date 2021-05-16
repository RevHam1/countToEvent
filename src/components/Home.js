import React, { Component } from "react";
// import Events from "./Events";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    events: [],
    city: "Chicago",
  };

  updateCity = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newCity = this.state.city;

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=fmTj6tMFhW1yjqhNhe1aLYa5IiWHNP7X&city=${newCity}`
      )
      .then((res) => {
        // console.log(res.data);
        this.setState({ events: res.data._embedded });
        // this.setState({ events: res.data._embedded.events });
      });
  };

  render() {
    const { events } = this.state;
    console.log(events);

    const eventList = events.length ? (
      events.map((event) => {
        const resultTime = moment(event.dates.start.localTime, "HH:mm").format(
          "h:mm a"
        );

        return (
          <div key={event.id}>
            <div>
              <div className="center">
                <p>{resultTime}</p>{" "}
              </div>
              <div>
                <img
                  className="event-img"
                  src={event.images[1].url}
                  alt={event.name}
                />
              </div>
              <div>
                <Link to={"/" + event.id}> {event.name} </Link>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">
        No events yet2 {events.length} {typeof events}
      </div>
    );

    return (
      <div>
        <p className="center">Enter A City Below</p>
        <form className="center">
          <input
            className="center"
            type="text"
            name="city"
            placeholder="Enter City Here"
            value={this.state.city}
            onChange={this.updateCity}
          />
          <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </form>
        <div className="grid-container">{eventList}</div>
        {/* <Events city={this.state.city} /> */}
      </div>
    );
  }
}

export default Home;

// import React from "react";

// const Home = () => {
//   return (
//     <div className="container">
//       <h4 className="center">Home</h4>
//       <p>
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed vero modi
//         cupiditate totam doloribus facere incidunt, neque dicta a dignissimos
//         repellendus nemo consequuntur quae nobis cum veritatis, perferendis
//         consectetur obcaecati.
//       </p>
//     </div>
//   );
// };

// export default Home;
