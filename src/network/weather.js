import axios from "axios";

export function getNowWeather(location) {
  return axios({
    url: "https://api.seniverse.com/v3/weather/now.json?key=SPP1qS4aqhUjiINm7&language=zh-Hans&unit=c",
    method: "GET",
    params: {
      location,
    },
  });
}

export function getAdm(data) {
  return axios({
    url: "https://geoapi.qweather.com/v2/city/lookup?key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: data,
  });
}

export function getLocation(data) {
  return axios({
    url: `https://geoapi.qweather.com/v2/city/lookup?key=5b81005e51744ced8ec0525d17ed39d4&location=${data}`,
    method: "GET",
  });
}

export function getWeather(location) {
  return axios({
    url: "https://devapi.qweather.com/v7/weather/now?key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: {
      location,
    },
  });
}

export function getWill(location) {
  return axios({
    url: "https://devapi.qweather.com/v7/weather/3d?lang=zh&key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: {
      location,
    },
  });
}

export function getAir(location) {
  return axios({
    url: "https://devapi.qweather.com/v7/air/5d?lang=zh&key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: {
      location,
    },
  });
}

export function getNowAir(location) {
  return axios({
    url: "https://devapi.qweather.com/v7/air/now?lang=zh&key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: {
      location,
    },
  });
}

export function getMinutely(location) {
  return axios({
    url: "https://devapi.qweather.com/v7/minutely/5m?lang=zh&key=5b81005e51744ced8ec0525d17ed39d4",
    method: "GET",
    params: {
      location,
    },
  });
}
