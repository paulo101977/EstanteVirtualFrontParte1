<!-- map modal -->
<template>
  <div>
    <!-- <skycon condition="clear-day"  />
    <skycon condition="clear-night" />
    <skycon condition="partly-cloudy-day" />
    <skycon condition="partly-cloudy-night" />
    <skycon condition="cloudy" />
    <skycon condition="rain" />
    <skycon condition="sleet" />
    <skycon condition="snow" />
    <skycon condition="wind" />
    <skycon condition="fog" /> -->

    <!-- Width and height -->
    <skycon v-if="this.condition" :condition="this.condition" />
    <div v-if="!this.condition" class="loader" />
  </div>
</template>
<script>
  const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?"
  const API_KEY = "appid=d8d409f23f334713a789b30beb5daa84"


  export default{
      'name': 'WeatherLoader',
      props: ["location"],
      mounted(){
        this.getCurrentWeather()
      },
      data(){
        return {
          condition: ""
        }
      },
      methods: {
        convertWeather(weather){
          switch (weather) {
            case "clear sky":
              return "clear-day";
            case "broken clouds":
            case "few clouds":
            case "scattered clouds":
            case "wind":
              return "cloudy";
            case "shower rain":
            case "rain": return "rain";
            case "thunderstorm":
              return "sleet"
            case "snow":
              return "snow";
            default: return "clear-day"
          }
          //
        },
        getCurrentWeather: function(){
            console.log(this.location)

          if(this.location){
             this
              .$http
              .get(`${BASE_URL}${API_KEY}&q=${this.location}`)
              .then((response) => {
                if(response && response.data){
                  let { data } = response
                  let { main , description} = data.weather[0];

                  //main = main.toLowerCase();
                  this.condition = this.convertWeather(description)
                }
              })
              .catch((err)=>{
                console.log(err)
              })
          }
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loader {
    border: 10px solid white;
    border-radius: 50%;
    border-top: 10px solid grey;
    width: 64px;
    height: 64px;
    animation: spin 2s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
