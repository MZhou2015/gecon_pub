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
     <tr><th>Item</th><th>Model</th><th>profit in 2020å¹´</th><th>Qty in 2020å¹´ </th><th>æœ€è¿‘3ä¸ªæœˆ</th><th>è¿‘1ä¸ªæœˆ &nbsp;&nbsp;</th><th>çŽ°åº“å­˜&nbsp;</th></tr>

     <tr v-for= "(item, index ) in cab.list" ><th>{{index +1 }}</th><td>{{item.ptcode}}</td><td>{{item.name}}</td>
                                              <td>{{item.model}}</td><td>{{item.price}}</td><td>{{item.shipping}}</td></tr>
     </table>

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
           console.log(response.data) ;
                      }) .catch(function(error){ console.log(error) ; }) ; 
        }                     
      // const words = mn.split('-');
      // mn = words[0] ;
    
     }
})
/**********************************************/