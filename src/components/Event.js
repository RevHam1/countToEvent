import React, { Component } from "react";
// import Clock from "./countdownClock/Clock";
import Clock3 from "./countdown3/Clock3";
// import Countdown from "./countdown2/Countdown";
import axios from "axios";
import moment from "moment";

class Event extends Component {
  _isMounted = false;

  state = {
    event: {},
  };
  componentDidMount() {
    this._isMounted = true;

    let id = this.props.match.params.event_id;
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=fmTj6tMFhW1yjqhNhe1aLYa5IiWHNP7X&id=${id}`
      )
      .then((res) => {
        if (this._isMounted) {
          this.setState({
            event: res.data,
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { event } = this.state;

    const date = moment(event._embedded?.events[0].dates.start.dateTime).format(
      "lll"
    );

    //**************************** const for eventResults ****************************/
    const eventResults = this.state.event ? (
      <div className="event-container container center">
        <div className="event-time">
          <h4 className="margin-closer">
            {moment(event._embedded?.events[0].dates.start.dateTime).format(
              "lll"
            )}
          </h4>
        </div>
        <div>
          <h4 className="event-name margin-closer">
            {event._embedded?.events[0].classifications[0].segment.name} Event
          </h4>
        </div>
        <div className="event-name ">
          <h4 className="center bottom-closer">
            {event._embedded?.events[0].name}
          </h4>
        </div>
        <div>
          <img
            className="event-img2"
            src={event._embedded?.events[0].images[2].url}
            alt={event._embedded?.events[0].name}
          />
        </div>
      </div>
    ) : (
      <div className="center">Loading event...</div>
    );

    //**************************** const for location ****************************/
    const location = this.state.event._embedded?.events[0]._embedded.venues[0]
      .city.name ? (
      <div className="center top-further larger-font">
        {event._embedded?.events[0]._embedded.venues[0].city.name},{" "}
        {event._embedded?.events[0]._embedded.venues[0].state.stateCode}{" "}
      </div>
    ) : (
      <div className="center">City not mentioned</div>
    );

    //**************************** const for boxOfficeInfo ****************************/
    const boxOfficeInfo = this.state.event._embedded?.events[0]._embedded
      .venues[0].boxOfficeInfo ? (
      <div className="center">
        {
          event._embedded?.events[0]._embedded.venues[0].boxOfficeInfo
            .phoneNumberDetail
        }
      </div>
    ) : (
      <div className="center">No phone number given</div>
    );

    //**************************** const for price ******************************/
    const price = this.state.event._embedded?.events[0].priceRanges ? (
      <div className="center">
        Price Range ${event._embedded?.events[0].priceRanges[0].min.toFixed(2)}
        -$
        {event._embedded?.events[0].priceRanges[0].max.toFixed(2)}
      </div>
    ) : (
      <div className="center">No price range given</div>
    );

    return (
      <div className="container">
        <h4>{eventResults}</h4>
        <Clock3 eventDate={date} />
        <h4>{location}</h4>
        <h4>{boxOfficeInfo}</h4>
        <h4>{price}</h4>
      </div>
    );
  }
}

export default Event;
