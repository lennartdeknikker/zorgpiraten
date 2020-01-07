<template>
  <div>
    <h2>{{ msg }}</h2>
    <svg class="graph" :height="height" :width="width"></svg>
    <ul v-for="element of transformedData" :key="element.key">
      <li>{{ element.key }}: {{ element.amount }}</li>
      <ul>
        <li v-for="value of element.values" :key="value.concerncode">
          {{ value.bedrijfsnaam }}
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    data: Array
  },
  data: function() {
    return {
      msg: "This is a chart",
      height: 600,
      width: 600
    };
  },
  computed: {
    transformedData() {
      let result = this.data;
      result = result.filter(value => {
        return !isNaN(value.key) && value.key < 100 && value.key > -100;
      });
      result.forEach(element => {
        element.amount = element.values.length;
      });
      result.sort(function(a, b) {
        return b.key - a.key;
      });
      return result;
    }
  },
  created() {
    this.colourScale = d3
      .scaleOrdinal()
      .range(["#FFFFFF", "#FE9922", "#93c464"]);
  }
};
</script>
