<template>
    <div class="webacc">
       <!--     *****************************************************    -->
     <div class="tab11" >
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</a>
        </li>
         <li class="nav-item" role="presentation">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tdbank" type="button" role="tab" aria-controls="profile" aria-selected="false">TD Bank</a>
        </li>
        <li class="nav-item" role="presentation">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#ledgers" type="button" role="tab" aria-controls="contact" aria-selected="false">General Ledgers</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <table class = "table nvt">
            <caption>Sales and Purchase Invoice</caption>
           <thead>
           <tr> <th scope="col">#</th> <th scope="col">Date</th> <th scope="col">Invoice No.</th><th scope="col">Type</th><th scope="col">amount</th>
                <th scope="col">Customer</th>     <th scope="col">Action</th>
               </tr>
             </thead>
           <tbody>
             <tr v-for="(mv,index) in $store.state.ACC.orders" :key=index  class="trans" ><td>{{index+1}}</td><td>{{mv.date}}</td><td>{{mv.reference}}</td>
                <td>{{mv.type}}</td><td>{{mv.amount}}</td><td>{{mv.company}}</td><td><button @click="btnEntry(mv)" class="btn btn-secondary btn-sm">Select</button></td></tr>
           </tbody>
          </table>
        </div>
        <div class="tab-pane fade" id="tdbank" role="tabpanel" aria-labelledby="profile-tab">
          <table class = "table ">  <!-- Show Bank account  activities  here    -->
            <caption>Bank Account Transations</caption>
           <thead>
           <tr>
            <th scope="col">#</th> <th scope="col">Date</th>  <th scope="col">description</th> <th scope="col">Debit</th>
            <th scope="col">Credit</th>  <th scope="col">Balance</th>   <th scope="col">Action</th>
           </tr>
             </thead>
             <tbody>
             <tr v-for="(mv,idx) in $store.state.ACC.midone" :key=idx  class="trans" ><td>{{idx+1}}</td><td>{{mv[0]}}</td><td>{{mv[1]}}</td>
                <td>{{mv[2]}}</td><td>{{mv[3]}}</td><td>{{mv[4]}}</td><td><button @click="btnEntry(mv)" class="btn btn-secondary btn-sm">Select</button></td></tr>
              </tbody>
           </table>
        </div> <!--    end of  Bank account list  -- -->
        </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'balance',
  data () {
    return {
      jsdd: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 caption {
    caption-side: top;
    text-align: center;
    background-color: #eded95;
  }
</style>
