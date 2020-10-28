/*****************************************************************************************/
/****      Component  product Edit   October 27 , 2020     by Michael zhou            *****/
/******************************************************************************************/
var  proEdit = Vue.component('proEdit' , 
 { 
  props: ['prod','sum'] ,
  template:  ` <div class="product" >
  {{checked}}
  </div> `  ,
  data() {
      return {  
            checked: false,
            records:'proEdit',
            pinfo:'',
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
    this.tm = false ; 
    this.stat1 = "New Transation completed !" ;
    console.log(mn) ;
         // const words = mn.split('-');
         // mn = words[0] ;
      } 
   
     }
})
/**********************************************/