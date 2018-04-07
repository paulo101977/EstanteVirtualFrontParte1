<!-- map modal -->
<template>
  <b-modal
    id="maps"
    title="Mapa">
    <iframe
      width="470"
      height="300"
      frameborder="0" style="border:0"
      v-bind:src="mapUrl" />
    </iframe>
  </b-modal>
</template>
<script>
  export default{
      'name': 'ModalMaps',
      props: ['mapUrl']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
