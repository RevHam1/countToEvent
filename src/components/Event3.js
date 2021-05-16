import React, { Component } from "react";
import Clock from "./countdownClock/Clock";
import axios from "axios";
import moment from "moment";

class Event extends Component {
  state = {
    event: null,
  };

  componentDidMount() {
    const id = this.props.match.params.event_id;
    // const id = "vv1A7ZAq4GkdkMNvl";

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=fmTj6tMFhW1yjqhNhe1aLYa5IiWHNP7X&city=chicago&id=${id}`
      )
      .then((res) => {
        this.setState({
          event: res.data._embedded.events,
        });
        // console.log(res.data._embedded.events);
      });
  }

  render() {
    const { event } = this.state;
    // const date = this.state.event;

    const eventResults = this.state.event ? (
      <div className="event-container container center">
        <div className="event-time">
          <h4>
            {moment(event[0].dates.start.localDate).format("ll")}-
            {moment(event[0].dates.start.localTime, "HH:mm").format("h:mm a")}
          </h4>
        </div>
        <div>
          <h4 className="event-name">
            {event[0].classifications[0].segment.name} Event
          </h4>
        </div>
        <div className="event-name">
          <h4 className="center">{event[0].name}</h4>
        </div>
        <div>
          <img
            className="event-img2"
            src={event[0].images[2].url}
            alt={event[0].name}
          />
        </div>
        <div>
          <h4 className="center">
            {/* Price: ${event[0].priceRanges[0].min.toFixed(2)}-$
            {event[0].priceRanges[0].max.toFixed(2)} */}
          </h4>
          <h4 className="center">
            {/* Phone:{" "}
            {event[0]._embedded.venues[0].boxOfficeInfo.phoneNumberDetail} */}
          </h4>
          <h5 className="event-info">
            {/* Ticket Sales:{" "}
            {event[0]._embedded.venues[0].boxOfficeInfo.openHoursDetail}} */}
          </h5>
          {/* <h5 className="event-info">Info: {event[0].accessibility.info}</h5> */}
        </div>
      </div>
    ) : (
      <div className="center">Loading event...</div>
    );

    // console.log(`named: ${date}`);
    return (
      <div className="container">
        <h4>{eventResults}</h4>
        <div>
          <Clock />
        </div>
      </div>
    );
  }
}

export default Event;
