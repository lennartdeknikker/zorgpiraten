<template>
  <div>
    <h2>Graph</h2>
    <svg class="graph"></svg>
    <h2>Data List</h2>
    <ul v-for="element of transformedData" :key="element.key">
      <li>{{ element.key }}: {{ element.amount }}</li>
      <ul>
        <li
          v-for="value of element.values"
          :key="value.concerncode + value.jaar"
        >
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
      chart: null
    };
  },
  computed: {
    // filters entries with impossible revenue values
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
  watch: {
    transformedData(values) {
      if (this.chart != null) this.chart.remove();
      this.renderChart(values);
    }
  },
  methods: {
    renderChart(values) {
      const svg_width = 1000;
      const svg_height = 600;

      const svg = d3
        .select(".graph")
        .attr("width", svg_width)
        .attr("height", svg_height);

      svg
        .selectAll(".dataPoint")
        .data(values)
        .enter()
        .append("circle")
        .attr("class", "dataPoint")
        .attr("r", d => d.amount / 4)
        .attr("cx", svg_width / 2)
        .attr("cy", d => {
          return d.key * 4 + svg_height / 2;
        });
    }
  }
};
</script>
