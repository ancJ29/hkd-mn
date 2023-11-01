import axios from "axios";

export default async function _isValidIP() {
  _fetch();
  return localStorage.validIP === "true";
}

function _fetch() {
  if (parseInt(localStorage.last || 0) + 3600e3 > Date.now()) {
    return;
  }
  axios.get("https://api.ipify.org/?format=jso").then((res) => {
    localStorage.last = Date.now();
    if ("125.253.116.225" === res.data) {
      localStorage.validIP = "true";
    }
    localStorage.validIP = "false";
  });
}
