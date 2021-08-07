<template>
  <div>
    <Loader v-if="isLoader"></Loader>
    <div class="header">
      <div class="title">Weather App</div>
      <div class="city-search">
        <AutoComplete @selected-item="selectedCity"></AutoComplete>
      </div>
    </div>

    <div class="forecast-container" v-if="!isLoader">
      <div class="forecast-location__name">
        {{ currentLocation.name }}, {{ currentLocation.region }}
      </div>
      <div class="forecast-list">
        <ForecastCard
          :forecastday="day"
          v-for="(day, i) in forecastday"
          :key="i"
        ></ForecastCard>
      </div>
    </div>
    <div class="footer">Developed by dasari</div>
  </div>
</template>

<script>
import weatherService from "../services/weather";
export default {
  name: "weather",
  components: {
    AutoComplete: () => import(/* webpackPrefetch: true */ "./AutoComplete"),
    Loader: () => import(/* webpackPrefetch: true */ "./Loader"),
    ForecastCard: () => import(/* webpackPrefetch: true */ "./ForecastCard"),
  },
  data: () => ({
    isLoader: true,
    forecastday: null,
    currentLocation: null,
    query: null,
  }),
  created() {
    this.getIP();
  },
  methods: {
    async getIP() {
      try {
        const { data } = await weatherService.getIP();
        this.query = data;
        this.getForecast();
      } catch (error) {
        console.log(error);
      }
    },
    async getForecast() {
      try {
        const { data } = await weatherService.getForecast(`${this.query}`);
        this.isLoader = false;
        this.currentLocation = data.location;
        this.forecastday = data.forecast.forecastday[0].hour;
      } catch (error) {
        console.log(error);
      }
    },
    selectedCity(city) {
      this.isLoader = true;
      this.query = city.name;
      this.getForecast();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forecast-container {
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
}
.forecast-list {
  display: flex;
  flex-wrap: wrap;
}
.forecast-location__name {
  text-align: left;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 2rem;
}
.header {
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #3c8dbc;
  z-index: 999;
  box-shadow: rgb(0 0 0 / 16%) 0px 10px 36px 0px,
    rgb(0 0 0 / 6%) 0px 0px 0px 1px;
}
.title {
  margin-right: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
}
.city-search {
  width: 50%;
}
.footer {
  text-align: center;
  font-size: 0.8rem;
  margin: 1rem;
  color: #b7b7b7;
}
</style>
