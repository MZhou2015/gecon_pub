<template>
  <div class='temp_gt'>
   <div class="subt1" >  My Recent Activities </div>
   <select class="custom-select" v-model="selectedCoin" @change="onCoinChange">
      <option v-for="(tk,index) in mtb.myticker" :key="'k' + index" :value=tk.ticker>{{tk.symbol}} </option>
    </select>
    <table>
      <caption><span class="sp">{{selectedCoin}}</span> history Price</caption>
      <tr>
        <th>Low Price and Date</th>
        <th>High Price and Date</th>
      </tr>
      <tr>
        <td>{{mpl.mynewlow[0]}}</td>
        <td>{{mpl.mynewhigh[0]}}</td>
      </tr>
      <tr>
        <td>{{mpl.mynewlow[4]}}</td>
        <td>{{mpl.mynewhigh[4]}}</td>
      </tr>
      <tr>
        <th>Item</th>
        <th>Date</th>
        <th>High</th>
        <th>Low</th>
        <th>Close Price</th>
      </tr>
      <tr v-for="(tx,index) in mpl.mynew25" :key="'x' + index">
        <td>{{index + 1}}</td>
        <td>{{tx[0]}}</td>
        <td>{{tx[2]}}</td>
        <td>{{tx[3]}}</td>
        <td>{{tx[3]}}</td>
      </tr>
    </table>
    <canvas id="stock-chart"></canvas>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Chart from 'chart.js/dist/chart.js' // Update import statement

export default {
  name: 'invmain',
  data () {
    return {
      jsdd: null,
      selectedCoin: 'LTC-USD' // Initial selected coin value
    }
  },
  created () {
    this.getApitrade('LTC')
    this.getHisPrice(this.selectedCoin)
  },
  mounted () {
    // Fetch the data
    // Extract the date and close price from the data
    // const labels = this.mpl.mynew25.map(item => item.Date)
    // const closePrices = this.mpl.mynew25.map(item => item['Close Price'])

    // Create a line chart using Chart.js
    /* new Chart('stock-chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Close Price',
          data: closePrices,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Close Price'
            }
          }
        },
        title: {
          display: true,
          text: 'Stock Close Price Trend'
        }
      }
    })   ***/
  },

  computed: {
    ...mapGetters({mtb: 'INV/mxtrade', mpl: 'INV/hisprice'})
  },
  methods: {
    ...mapActions({getApitrade: 'INV/tradeanaly', getHisPrice: 'INV/price_history'}),
    onCoinChange () {
      this.getHisPrice(this.selectedCoin)
      console.log('Selected coin:', this.selectedCoin)
    }
  }
}
</script>

<!-- Add'scoped' attribute to limit CSS to this component only -->
<style scoped>
caption {
  caption-side: top;
  text-align: center;
  background-color: #eded95;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
}
.sp{
  margin-right: 12px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #b4c6e8;
  padding: 8px;
  font-weight: bold;
  text-align: center;
}
td {
  padding: 8px;
}
.sell {
  color: #f53322;
}
.subt1 {
  font-size:22px; padding:6px;
  color:#000044; font-weight:bold;
  text-align: center;
  background-color :#e09040;
  opacity: 0.85;
   }
.custom-select {
  width: 200px;
  font-size: 16px;
  padding: 8px;
  margin: 6px;
  border-radius: 4px;
}
</style>
