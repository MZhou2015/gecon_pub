/*****************************************************************************************/
/****      Component  product Edit   October 27 , 2020     by Michael zhou            *****/
/******************************************************************************************/
var  proEdit = Vue.component('proEdit' , 
 { 
  props: ['prod','sum'] ,
  template:  ` <div class="product" >
  {{checked}} <br> Hello ! {{pinfo}}
  </div> `  ,
  data() {
      return {  
            checked: false,
            records:'proEdit',
            pinfo:'E23048',
            tot:{} 
               }
 },
mounted: function(){
    console.log(this.records);
    let passdata = this.pinfo ;
   this.postfor_update(passdata)
},
methods:{
    postfor_update: function (passdata){
        let url = './src/php/db_write.php'; 
        axios.post(url, JSON.stringify(passdata)).then(function (response) {
                        console.log(response.data);
                      }).catch(function (error) {
                        console.log(error);
                            });
            },
    get_info:    function (passdata){
        let url2 = './src/php/product/product.php?acc='
        axios.get(url2).then(function(response){
           console.log(url2) ;
                      }) .catch(function(error){ console.log(error) ; }) ; 
        }                     
      // const words = mn.split('-');
      // mn = words[0] ;
    
     }
})
/**********************************************/