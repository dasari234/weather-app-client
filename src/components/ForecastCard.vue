<template>
  <div class="weather-card">
    <div class="weather-card__body">
      <div class="current-weather__panel">
        <div class="current-weather__subtitle">
          {{ forecastday.time.split(" ")[1] }}
        </div>

        <div class="forecast-container">
          <img
            class="weather-icon"
            v-bind:src="forecastday.condition.icon"
            width="88"
            height="88"
          />
          <div class="temp-container">
            <div class="temp">
              {{ forecastday.temp_c }}°<span class="after-temp">C</span>
            </div>
            <div class="real-feel">
              RealFeel® {{ forecastday.feelslike_c }}°
            </div>
          </div>
        </div>
      </div>
      <div class="current-weather__panel details-container">
        <div class="spaced-content detail">
          <span class="label">Wind Gusts</span>
          <span class="value">{{ forecastday.gust_kph }} km/h</span>
        </div>
        <div class="spaced-content detail">
          <span class="label">Wind</span>
          <span class="value"> {{ forecastday.wind_kph }} km/h</span>
        </div>
        <div class="spaced-content detail">
          <span class="label">Humidity</span>
          <span class="value">{{ forecastday.humidity }}</span>
        </div>
        <div class="spaced-content detail">
          <span class="label">Wind Degree</span>
          <span class="value">{{ forecastday.wind_degree }}</span>
        </div>
      </div>
      <div></div>
    </div>
    <div class="spaced-content align-left">
      <span class="phrase">{{ forecastday.condition.text }}</span>
      <span class="phrase"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    forecastday: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.weather-card {
  margin: 1.26rem 2rem;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  width: 40%;
  padding: 1rem;
  border-radius: 4px;
}
.weather-card__body {
  display: flex;
  flex-grow: 1;
  margin-bottom: 16px;
  justify-content: space-between;
}
.current-weather__panel {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.current-weather__title {
  text-transform: uppercase;
  font-size: 1.2rem;
  text-align: left;
}
.current-weather__subtitle {
  font-size: 1.5rem;
  color: #ccc;
  text-align: left;
}
.forecast-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
  flex-grow: 1;
}
.forecast-container .weather-icon {
  width: 88px;
  height: 88px;
  margin-right: 12px;
}
.forecast-container .temp {
  font-size: 4rem;
  letter-spacing: -0.7px;
  font-weight: 500;
  line-height: 1.07;
}
.forecast-container .real-feel {
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.43;
}
.spaced-content {
  justify-content: space-between;
}
.forecast-container .after-temp {
  opacity: 0.6;
  line-height: 1.28;
  font-size: 1.4rem;
  margin-left: -24px;
}
.detail {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 8px 0;
}
.detail .value {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.33;
}
.phrase {
  font-size: 1.2rem;
  font-weight: 500;
}
.align-left {
  text-align: left;
}
</style>