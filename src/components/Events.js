import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import TicketMaster from "../utils/TicketMaster";

class Events extends Component {
  _isMounted = false;

  state = {
    events: [],
    city: "",
  };

  changeCity = (newCity) => {
    this.setState({ city: newCity });
  };

  searchTicketMaster = (city) => {
    // console.log(`The name of the city is ${city}`);
    TicketMaster.search(city).then((res) => {
      // this.setState({ events: res._embedded.events });
      if (res._embedded) {
        this.setState({ events: res._embedded.events });
      } else {
        this.setState({ events: res._links.self });
        // console.log("City is invalied");
        return;
      }
    });
    return city;
    // console.log(city);
  };

  componentDidMount() {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=fmTj6tMFhW1yjqhNhe1aLYa5IiWHNP7X&city=${this.state.city}`
      )
      .then((res) => {
        this.setState({ events: res.data._embedded.events });
      });
  }

  render() {
    const { events } = this.state;
    const eventList = events.length ? (
      events.map((event) => {
        const resultDate = moment(event.dates.start.localDate).format("ll");
        const resultTime = moment(event.dates.start.localTime, "HH:mm").format(
          "h:mm a"
        );

        return (
          <div key={event.id}>
            <Link to={"/" + event.id}>
              <div>
                <div className="center">
                  <p className="bottom-closer">
                    {resultDate} - {resultTime}
                  </p>{" "}
                </div>
                <div>
                  <img
                    className="event-img"
                    src={event.images[1].url}
                    alt={event.name}
                  />
                </div>
                <div>{event.name}</div>
              </div>
            </Link>
          </div>
        );
      })
    ) : (
      <div className="note container center blue-text">
        Invalid City {this.state.city}
      </div>
    );
    return (
      <div className="container ">
        <SearchBar
          searchTicketMaster={this.searchTicketMaster}
          search={this.changeCity}
        />

        <h1 className="center blue-text">Count to {this.state.city}</h1>
        <h4 className="center blue-text">Welcome to {this.state.city}</h4>
        <div className="grid-container">{eventList} </div>
      </div>
    );
  }
}

export default Events;
