<template>
  <div class="main-container">
    <h1>Winstpercentages</h1>
    <div>
      <form action="#">
        <fieldset @change="fetchData">
          <label for="year">Kies een jaar:</label><br />
          <input v-model="selectedYear" type="radio" name="year" value="2018" />
          2018<br />
          <input v-model="selectedYear" type="radio" name="year" value="2017" />
          2017<br />
          <input v-model="selectedYear" type="radio" name="year" value="2016" />
          2016<br />
          <input v-model="selectedYear" type="radio" name="year" value="2015" />
          2015
        </fieldset>
        <fieldset>
          <label for="search">Zoek een zorginstelling: </label><br />
          <input type="text" name="search" />
        </fieldset>
        <fieldset>
          <label for="category">Kies een categorie:</label><br />
          <input
            v-model="selectedCategory"
            type="radio"
            name="category"
            value="alles"
          />
          alles<br />
          <input
            v-model="selectedCategory"
            type="radio"
            name="category"
            value="geestelijkegezondheidszorg"
          />
          geestelijke gezondheidszorg<br />
          <input
            v-model="selectedCategory"
            type="radio"
            name="category"
            value="gehandicaptenzorg"
          />
          gehandicaptenzorg<br />
          <input
            v-model="selectedCategory"
            type="radio"
            name="category"
            value="thuiszorg"
          />
          thuiszorg
        </fieldset>
      </form>
    </div>
    <Graph :data="dataToShow" :year="selectedYear"></Graph>
  </div>
</template>

<script>
import Graph from "./Graph2.vue";
import * as d3 from "d3";
export default {
  components: {
    Graph
  },
  data() {
    return {
      rawData: [],
      selectedYear: "2018",
      selectedCategory: "thuiszorg",
      dataForSelectedYear: [],
      dataToShow: []
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    categorizedData: function() {
      if (this.selectedCategory != "alles") {
        let categorized = this.rawData.filter(
          item =>
            item[this.selectedCategory] === "ja" ||
            item[this.selectedCategory] === "yes"
        );
        return categorized;
      } else return this.rawData;
    }
  },
  watch: {
    categorizedData: function() {
      this.filterCategorizedDataByYear();
      this.nestDataByRevenueValues();
    }
  },
  methods: {
    async fetchData() {
      this.rawData = await d3.json("./rawData.json");
    },
    filterCategorizedDataByYear() {
      this.dataForSelectedYear = this.categorizedData.filter(
        d => d.jaar === this.selectedYear
      );
    },
    nestDataByRevenueValues() {
      let nestedData = d3
        .nest()
        .key(d => {
          return Math.floor(d["perc_winst"] / 10);
        })
        .entries(this.dataForSelectedYear);
      nestedData.forEach(element => {
        element.amount = element.values.length;
        element.key = element.key * 10;
      });
      this.dataToShow = nestedData;
    }
  }
};
</script>

<style>
.main-container {
  width: calc(var(--top-view-width) - 6px);
  min-width: 18rem;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
