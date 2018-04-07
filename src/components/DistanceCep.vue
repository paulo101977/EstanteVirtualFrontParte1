<!-- map modal -->
<template>
  <span>
    Distância:
      <span v-if="distance">{{this.distance}}</span>
      <span v-if="!distance">...</span>
  </span>
</template>
<script>

  //request example:
  // origins={location}&destinations={cep}

  import { DIST_URL } from '../config'

  export default{
      name: 'DistanceCep',
      mounted(){
        //try load the distance
        this.loadDistanceInfo()
      },
      watch:{
        'hasCoordinates': function(){
          this.loadDistanceInfo()
        }
      },
      props: ['coords', 'cep'],
      data(){
        return{
          distance: '',
          hasCoordinates: false
        }
      },
      methods: {
        loadDistanceInfo: function(){
          let { lat , lng } = this.coords;

          if(this.hasCoordinates){
            this
              .$http
              .get(`${DIST_URL}&origins=${lat},${lng}&destinations=${this.cep}`)
              .then((req)=>{
                this.distance =req.data.rows[0].elements[0].distance.text
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

</style>
