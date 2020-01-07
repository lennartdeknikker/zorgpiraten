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
        element.values.sort(function(a, b) {
          return b.perc_winst - a.perc_winst;
        });
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
      const svg_width = 3000;
      const svg_height = 4100;
      const colorScale = d3
        .scaleLinear()
        .domain([-100, -50, 0, 50, 100])
        .range(["red", "yellow", "green", "yellow", "red"]);

      const svg = d3
        .select(".graph")
        .attr("width", svg_width)
        .attr("height", svg_height);

      const div = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip");

      function handleMouseOver(d) {
        div
          .html(d.bedrijfsnaam + "<br />" + d.perc_winst + "%")
          .style("left", d3.event.pageX + 30 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      }

      svg
        .selectAll(".dataGroup")
        .data(values)
        .enter()
        .append("g")
        .attr("data-key", d => d.key)
        .attr("class", "dataGroup")
        .selectAll(".dataPoint")
        .data(d => d.values)
        .enter()
        .append("circle")
        .attr("class", "dataPoint")
        .attr("data-revenue", d => d.perc_winst)
        .on("mouseover", d => handleMouseOver(d))
        .attr("r", 8)
        .attr("data-index", (d, i) => i)
        .attr("cx", (d, i) => {
          if (i == 0) {
            return svg_width / 2;
          } else if (i % 2 == 0) {
            return svg_width / 2 + 20 * (i / 2);
          } else {
            return svg_width / 2 - 20 * (i / 2) - 10;
          }
        })
        .attr("cy", d => {
          return -Math.round(d.perc_winst) * 20 + svg_height / 2;
        })
        .style("fill", d => {
          return colorScale(d.perc_winst);
        });
    }
  }
};
</script>

<style>
.tooltip {
  width: 8em;
  height: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: red;
  position: absolute;
  text-align: center;
  border: 2px solid green;
}

.dataPoint:hover {
  stroke: blue;
}
</style>
