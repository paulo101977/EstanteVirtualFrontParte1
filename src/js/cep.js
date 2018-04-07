
import { MAP_URL } from '../config'

let currentDataArr = [], current;

if (localStorage) {
  currentDataArr = localStorage.getItem("currentData")
  currentDataArr = currentDataArr ? JSON.parse(currentDataArr) : []
}


current = currentDataArr[currentDataArr.length - 1]


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
      errorCoord: false,
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
    'hasCoordinates': function(){
        let that = this;

        this.$refs.distance.forEach((comp)=>{
          comp.hasCoordinates = that.hasCoordinates;
        })
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
    getCurrentCoord : function(){
      let that = this, mapUrl = "";

      that.hasCoordinates = false;
      that.errorCoord = false;

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            that.hasCoordinates = true;
            that.coordinates = {lat:coords.latitude, lng: coords.longitude};
          }, (error) => {
            that.errorCoord = true;

          }, {timeout:10000})
      } else {
        that.hasCoordinates = false;
      }
    },
    showModal :function(cep) {
      let coords = this.coordinates

      let mapUrl =`${MAP_URL}&origin=${cep}&destination=${coords.lat},${coords.lng}`

      this.mapUrl = mapUrl

      //emit event to open modal
      this.$root.$emit('bv::show::modal','maps')
    },
    makeRequest: function(){
      let that = this, currentData;
      let request = `http://viacep.com.br/ws/${that.form.cep}/json/`;

      that.loading = true

      this.$http
      .get(request)
      .then(response  =>  {

        //console.log('loaded')
        that.loading = false

        if(response && response.data.erro){
            that.cepClass = 'dirty';
            that.error = true;
        } else {
            that.response = response.data;
            that.isOk = true;

            if(localStorage){
              //get the current saved data in localStorage
              currentData = localStorage.getItem("currentData")

              //ensure dasta
              currentData = currentData ?  JSON.parse(currentData) : []

              //update view
              that.currentDataArr = currentData;
              currentData.push(that.response)

              //save to localStorage
              localStorage.setItem(
                "currentData",
                JSON.stringify(currentData)
              )

              //emit update to view item
              this.$refs.distance.forEach((comp)=>{
                comp.hasCoordinates = that.hasCoordinates;
              })
            }
        }
      })
      .catch(() => {
        that.loading = false
      })
    }
  }
};
