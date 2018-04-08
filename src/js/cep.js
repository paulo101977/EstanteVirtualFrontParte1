
import { MAP_URL } from '../config'

import Vuex from 'vuex'



export default {
  name: 'EstanteVirtualCepVerification',
  created(){
    this.$store.dispatch('updateData', this.$db_obj.ref('cep_collect'))
  },
  computed: Vuex.mapGetters(['items']),
  mounted(){
    this.getCurrentCoord();
    this.userId = this.getId();
  },
  data() {
    return {
      form: {
        cep: "",
      },
      error: false,
      errorCoord: false,
      cepClass: '',
      response: {
        logradouro: "",
        localidade: ""
      },
      isOk: false,
      loading: false,
      hasCoordinates: false,
      coordinates: {lat:10, lng:10},
      mapUrl: "",
      userId: "",
      open: true,
    };
  },
  watch:{
    'hasCoordinates': function(){
        let that = this;

        this.$store.dispatch('hasCoordinatesChanged', this.hasCoordinates)

        /*if(this.$refs.distance){
          this.$refs.distance.forEach((comp)=>{
            comp.hasCoordinates = that.hasCoordinates;
          })
        }*/

    },
    'form.cep': function (){
      let cep = this.form.cep.replace('-', '');
      let request = "";
      let that = this, currentData = [];

      //clean the data
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
    openListGroup(){
      this.open = !this.open;
    },
    onRemove(index, data) {
        this.$db_obj.ref('cep_collect').child(data['.key']).remove()
        this.$refs.popover[index].$emit('close')
    },
    onCancel(index){
        this.$refs.popover[index].$emit('close')
    },
    getId(){
      let hasId = this.$cookie.get('userId') || false
      let id = hasId ? this.$cookie.get('userId') : ''


      id = id ? id : this.$store.getters.generatedId;

      if(!hasId){
        //save the generatedId
        this.$cookie.set('userId', id)
      }


      return id;
    },
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
      let that = this, currentData, id = '';
      let request = `https://viacep.com.br/ws/${that.form.cep}/json/`;

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

            id = that.getId();

            that.response.userId = id;

            that.$db_obj.ref('cep_collect').push(that.response)

        }
      })
      .catch(() => {
        that.loading = false
      })
    }
  }
};
