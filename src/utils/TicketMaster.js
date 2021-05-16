import axios from "axios";

const apiKey = "fmTj6tMFhW1yjqhNhe1aLYa5IiWHNP7X";

const TicketMaster = {
  search(city) {
    return axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default TicketMaster;
