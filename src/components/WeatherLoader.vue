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
    <skycon
      v-bind:title="this.condition"
      v-if="this.condition"
      :condition="this.condition" />

    <span
      title="Carregando" 
      v-if="!this.condition && !this.notfound"
      class="loader" />

    <span  title="Não encontrado" v-if="this.notfound">
      <icon name="exclamation-circle" class="error"/>
    </span>
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
          error: false,
          notfound: false,
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
          let that = this;

          if(that.location){
             that
              .$http
              .get(`${BASE_URL}${API_KEY}&q=${that.location}`)
              .then((response) => {
                if(response && response.data){
                  let { data } = response
                  let { main , description} = data.weather[0];

                  //ensure location is defined and lower case
                  description = description ? description.toLowerCase() : "";

                  //main = main.toLowerCase();
                  //
                  // set the location
                  that.condition = that.convertWeather(description);
                  that.error = false;
                  that.notfound = false;
                }
              })
              .catch((err)=>{
                that.error = true;
                if(err) that.notfound = true;
              })
          }
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loader {
    border: 10px solid #DDDDDD77;
    border-radius: 50%;
    border-top: 10px solid orangered;
    width: 64px;
    height: 64px;
    animation: spin 1.5s linear infinite;
    display: block;
  }

  svg.error{
    color: red;
    width: 4rem;
    height: 4rem;
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
