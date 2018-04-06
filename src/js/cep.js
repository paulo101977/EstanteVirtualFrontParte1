
let currentDataArr = [], current;

if (localStorage) {
  currentDataArr = localStorage.getItem("currentData")
  currentDataArr = currentDataArr ? JSON.parse(currentDataArr) : []
}


current = currentDataArr[currentDataArr.length - 1]


const BASEURL = "https://www.google.com/maps/embed/v1/directions?"
                      + "key=AIzaSyCSnTtzEDEPMJDUpkHhZspwZ3nRrURPpWE"


export default {
  name: 'EstanteVirtualCepVerification',
  mounted(){
    this.getCurrentCoord();
  },
  data() {
    return {
      form: {
        cep: current ? current.cep : "",
      },
      error: false,
      cepClass: '',
      response: {
        logradouro: current ? current.logradouro : "",
        localidade: current ? current.localidade : ""
      },
      isOk: false,
      currentDataArr: currentDataArr,
      current: current,
      loading: false,
      hasCoordinates: false,
      coordinates: {lat:10, lng:10},
      mapUrl: ""
    };
  },
  watch:{
    'mapUrl': function(){

    },
    'form.cep': function (){
      let cep = this.form.cep.replace('-', '');
      let request = "";
      let that = this, currentData = [];

      //clean the data
      that.response.logradouro = "";
      that.response.localidade = "";
      that.isOk = false;
      that.error = false;

      if(cep.length === 0){
        that.cepClass = '';
      } else if(cep.length === 8){
        //this.cepClass = 'clean';

      } else {
        that.cepClass = 'clean';
      }
    }
  },
  methods: {
    onChange: function(value){

    },
    getCurrentCoord : function(){
      let that = this, mapUrl = "";

      that.hasCoordinates = false;

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            that.hasCoordinates = true;
            that.coordinates = {lat:coords.latitude, lng: coords.longitude};

          })
      } else {
        that.hasCoordinates = true;
      }
    },
    showModal :function(cep) {
      let coords = this.coordinates

      let   mapUrl = BASEURL + `&origin=${cep}&destination=`
          + `${coords.lat},${coords.lng}`

      this.mapUrl = mapUrl

      this.$root.$emit('bv::show::modal','maps')
    },
    makeRequest: function(){
      let that = this, currentData;
      let request = `http://viacep.com.br/ws/${that.form.cep}/json/`;

      that.loading = true

      that
      .$http
      .get(request)
      .then(response  =>  {

        console.log('loaded')
        that.loading = false

        if(response && response.data.erro){
            that.cepClass = 'dirty';
            that.error = true;
        } else {
            that.response = response.data;
            that.isOk = true;

            if(localStorage){
              currentData = localStorage.getItem("currentData")

              currentData = currentData ?  JSON.parse(currentData) : []

              that.currentDataArr = currentData;

              console.log(currentData)

              currentData.push(that.response)

              localStorage.setItem(
                "currentData",
                JSON.stringify(currentData)
              )
            }
        }
      })
      .catch(() => {
        that.loading = false
      })
    }
  }
};
