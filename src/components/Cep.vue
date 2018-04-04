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
              @change="onChange"
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

        <!-- message -->
        <div class="form-group">
          <div
            v-if="error"
            class="error-message">
            CEP Inválido
          </div>
          <div v-if="isOk" class="form-group">
            <div class="location">{{response.logradouro}}</div>
            <div class="city">{{response.localidade}}</div>
          </div>
        </div>

        <!-- list of all items -->
        <b-card header="Últimos CEPs:"
                header-tag="header">
            <b-list-group>
              <b-list-group-item
                v-for="data in currentDataArr">
                  <a href="#">
                    {{`${data.logradouro}, ${data.localidade} - ${data.cep}`}}
                  </a>
              </b-list-group-item>
            </b-list-group>
        </b-card>

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
