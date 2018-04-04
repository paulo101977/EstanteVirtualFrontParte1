let currentDataArr = [], current;

if (localStorage) {
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
      current: current,
      loading: false
    };
  },
  watch:{
    'form.cep': function(){
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
