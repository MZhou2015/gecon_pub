/*****************************************************************************************/
/****      Component  product Edit   October 27 , 2020     by Michael zhou            *****/
/******************************************************************************************/
var  proEdit = Vue.component('proEdit' , 
 { 
  props: ['cab','prod'] ,
  template:  ` <div class="product" >
  {{cab}} <br> Hello ! {{pinfo}}
  <h2>  Gecon Product List</h2>                       
     <table class="tgc1">
     <caption> all product list for website </caption>
     <tr><th>Item</th><th>Ptcode</th><th>Product Name</th><th>Model</th><th>Price</th><th>Shipping Cost</th><th>Cost &nbsp;</th></tr>

     <tr v-for= "(item, index ) in cab.list" ><th>{{index +1 }}</th><td><router-link :to="rout + item.ptcode " > {{item.ptcode}} </router-link></td><td>{{item.name}}</td>
                                              <td>{{item.model}}</td><td>{{item.price}}</td><td>{{item.shipping}}</td></tr>
     </table>

  </div> `  ,
  data() {
      return {  
            checked: false,
            records:'proEdit',
            pinfo:'E23048',
            rout:'/proEdit/',
            tot:{} 
               }
 },
mounted: function(){
    console.log(this.records);
    let passdata = this.pinfo ;
   this.get_info(passdata)
},
methods:{
    postfor_update: function (passdata){
        let url = './src/php/db_write.php'; 
        axios.post(url, JSON.stringify(passdata)).then(function (response) {
          app.amp = response.data ;       console.log(app.amp);
                      }).catch(function (error) {
                        console.log(error);
                            });
            },
    get_info:    function (passdata){
        let url2 = './src/php/product/product_edit.php?act=list'
        axios.get(url2).then(function (response) {
           console.log(response.data) ;app.amp = response.data ;
                      }) .catch(function(error){ console.log(error) ; }) ; 
        }                     
      // const words = mn.split('-');
      // mn = words[0] ;
    
     }
})
/**********************************************/