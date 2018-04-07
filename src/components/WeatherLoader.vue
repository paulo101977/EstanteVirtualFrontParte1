<!-- map modal -->
<template>
  <span>
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

    <!-- current weather  icon -->
    <skycon v-if="this.condition" :condition="this.condition" />
    <span v-if="!this.condition" class="loader" />
  </span>
</template>
<script>

  // import the request config
  import { BASE_URL , API_KEY } from '../config'


  export default{
      'name': 'WeatherLoader',
      props: ["location"],
      mounted(){
        this.getCurrentWeather()
      },
      data(){
        return {
          condition: "",
          error: false
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
            case "light rain":
            case "rain":
              return "rain";
            case "thunderstorm":
              return "sleet"
            case "snow":
              return "snow";
            default: return "clear-day"
          }
        },
        getCurrentWeather: function(){
          //if location received require the current weather to this location
          if(this.location){
             this
              .$http
              .get(`${BASE_URL}${API_KEY}&q=${this.location}`)
              .then((response) => {
                if(response && response.data){
                  let { data } = response
                  let { main , description} = data.weather[0];

                  console.log(description)

                  //ensure location is defined and lower case
                  description = description ? description.toLowerCase() : "";

                  //main = main.toLowerCase();
                  //
                  // set the location
                  this.condition = this.convertWeather(description);
                  thit.error = false;
                }
              })
              .catch((err)=>{
                this.error = true;
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
    display: block;
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
