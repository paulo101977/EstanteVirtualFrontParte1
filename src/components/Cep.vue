/* eslint-disable */

<template>
  <b-container>
    <b-row>
      <b-form class="form col-md-12">
        <!-- cep -->
        <div class="form-group form-inline">
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
              placeholder="Enter email"
              v-bind:class="[cepClass]"
              required />

          <button class="btn-cep-unknown">Não sei o Cep</button>
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

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
  let currentDataArr = [], current;

  if(localStorage){
    currentDataArr = localStorage.getItem("currentData")
    currentDataArr = currentDataArr ? JSON.parse(currentDataArr) : []
  }

  current = currentDataArr[currentDataArr.length - 1]

  export default {
    name: 'EstanteVirtualCepVerification',
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
        current: current
      };
    },
    watch:{
      'form.cep': function(){
        let cpf = this.form.cep.replace('-', '');
        let request = "";
        let that = this, currentData = [];

        //clean the data
        that.response.logradouro = "";
        that.response.localidade = "";
        that.isOk = false;
        that.error = false;

        if(cpf.length === 0){
          that.cepClass = '';
        } else if(cpf.length === 8){
          //this.cepClass = 'clean';
          request = `http://viacep.com.br/ws/${cpf}/json/`;

          console.log('loading')

          that.$http.get(request).then(response  =>  {

            console.log('loaded')

            if(response && response.data.erro){
                that.cepClass = 'dirty';
                that.error = true;
            } else {
                that.response = response.data;
                that.isOk = true;

                if(localStorage){
                  currentData = localStorage.getItem("currentData")

                  currentData = currentData ?  JSON.parse(currentData) : []

                  currentData.push(that.response)

                  localStorage.setItem(
                    "currentData",
                    JSON.stringify(currentData)
                  )
                }
            }
          })
        } else {
          that.cepClass = 'clean';
        }
      }
    },
    methods: {
      onChange: function(value){

      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    .form-group.form-inline{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .location{
      font-weight: bolder;
    }

    .red{
      color: red;
    }

    input{
      &.dirty{
        background-color: #dc354550 !important;
      }

      &.clean{
        background-color: #28a74550 !important;;
      }
    }

    .btn-cep-unknown{
      border: none;
      background: transparent;
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
