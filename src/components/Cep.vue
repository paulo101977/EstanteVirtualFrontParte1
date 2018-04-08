/* eslint-disable */

<template>
  <b-container>
    <b-row>
      <b-form class="form col-md-12">
        <!-- loading mask -->
        <div v-if="loading" class="mask">
          Loading....
        </div>

        <!-- cep -->
        <div class="form-group form-inline input-wrapper">
          <label for="cep">CEP:
            <span class="red">*</span>
          </label>

          <!-- input -->
          <b-form-input
              id="cep"
              v-mask="'#####-###'"
              v-model="form.cep"
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Digite um cep válido..."
              v-bind:class="[cepClass]"
              required />

          <b-button
            v-on:click="makeRequest"
            type="button"
            variant="primary">Submit</b-button>
        </div>

        <div v-if="errorCoord">
          <span class="red">Error ao coletar a geolocalização :(</span>
        </div>

        <!-- message -->
        <div class="form-group">
          <div
            v-if="error"
            class="error-message">
            CEP Inválido
          </div>
          <b-card v-if="isOk" class="form-group card-info-custom">
            Encontrado:
            <b>
              <span class="location">{{response.logradouro}}</span>
              <span class="city">{{response.localidade}}</span>
            </b>
          </b-card>
        </div>

        <!-- list of all items -->
        <!-- card header removed to insert a exclusive customized header -->
        <b-card>
          <!-- add custom header -->
          <div
            @click="openListGroup"
            class="custom-header">
            <span class="message">Items salvos:</span>
            <span
              class="icon"
              v-bind:class="[open ? 'opened' : 'closed']">
              <i />
            </span>
          </div>

          <!-- list any item from firebase -->
          <b-list-group v-bind:class="[open ? 'opened' : 'closed']">
            <b-list-group-item
              v-for="(data, index) in items">
                <!-- item  -->
                <div class="item btn-modal">
                  <span class="col-md-4 text-overflow">
                    {{`${data.logradouro}, ${data.localidade} - ${data.cep}`}}
                  </span>

                  <!-- the distance component -->
                  <distance-cep
                    ref="distance"
                    :coords="coordinates"
                    :cep="data.cep"
                    :hasCoordinates="hasCoordinates"
                    class="col-md-3 text-overflow" />

                  <!-- the weather -->
                  <weather-loader
                    class="col-md-2 right-align"
                    :location="`${data.bairro},${data.localidade}`"/>

                  <b-button
                    title="mapa"
                    variant="outline-primary"
                    @click="showModal(data.cep)">
                    <icon name="map-marker-alt"/>
                  </b-button>

                  <b-button
                    v-bind:id="'remove-btn' + index"
                    title="remover"
                    :disabled="userId !== data.userId"
                    variant="outline-danger">
                      <icon name="trash-alt"/>
                  </b-button>

                  <!-- remove popover -->
                  <b-popover
                      v-bind:target="'remove-btn' + index"
                      ref="popover"
                      title="Remover?"
                      placement="left"
                      triggers="click">
                      <template>
                        <b-button
                          variant="outline-primary"
                          @click="onRemove(index, data)">
                          <icon name="thumbs-up"/>
                        </b-button>
                        <b-button
                          variant="outline-danger"
                          @click="onCancel(index)">
                          <icon name="thumbs-down" />
                        </b-button>
                      </template>
                  </b-popover>

                </div>
            </b-list-group-item>
          </b-list-group>
        </b-card>

        <!-- map modal -->
        <modal-maps
          ref="googleMaps"
          :mapUrl='this.mapUrl'/>


      </b-form>
    </b-row>
  </b-container>
</template>

<script>
  export default require('../js/cep.js')
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../scss/cep.scss';
</style>
