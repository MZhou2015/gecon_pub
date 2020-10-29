/*****************************************************************************************/
/****      Component  product Edit   October 27 , 2020     by Michael zhou            *****/
/******************************************************************************************/
var  proEdit = Vue.component('proEdit' , 
 { 
  props: ['cab','prod'] ,
  template:  ` <div class="product" >
   <br> Hello ! {{pinfo}}   This prodcut id:  {{id}} {{mitx}} and {{maxd}}  {{age}}
   <div class="petty" >
   <input type="text" class="prinf1" v-model="pinfo" >
       </div>
  <h2>  Gecon Product List</h2>                       
     <table class="tgc1">
     <caption> all product list for website </caption>
     <tr><th>Item</th><th>Ptcode</th><th>Product Name</th><th>Model</th><th>Price</th><th>Shipping Cost</th><th>Cost &nbsp;</th></tr>

     <tr v-for= "(item, index ) in cab.list" ><th>{{index +1 }}</th><td><router-link :to="rout + index" v-on:click="age++" > {{item.ptcode}} </router-link></td><td>{{item.name}}</td>
                                              <td>{{item.model}}</td><td>{{item.price}}</td><td>{{item.shipping}}</td></tr>
     </table>

  </div> `  ,
  data() {
      return {  
            checked: false,
            records:'proEdit',
            id: 2 ,
            age:12
            mitx:{},
            maxd:[],
            pinfo:'E23048',
            rout:'/proEdit/',
            tot:{} 
               }
 },
 beforeRouteUpdate(to,from,next) {
  let val = to.params.pid
  this.id  = val 
    next();
 },
mounted: function(){
    console.log(this.records);
    this.id = this.$route.params.pid
    console.log(this.$route.params.pid) ;
    let passdata = this.pinfo ;
   this.get_info(passdata)
   this.maxd = this.cab.list
   console.log(this.maxd) ;
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
    saveinvar: function (mvar){
      console.log(mvar) ;
        this.maxd = mvar;
            },
    get_info: function (passdata){
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