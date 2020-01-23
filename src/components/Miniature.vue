<template>
  <svg
    class="miniature"
    width="10em"
    height="10em"
  ></svg>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    rawData: Array
  },
  data: function() {
    return {
      chart: null,
      big: false
    };
  },
  computed: {
    // filters entries with impossible revenue values
    transformedData() {
      let result = this.rawData;
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
    async transformedData(values) {
      if (this.chart != null) this.chart.remove();
      this.renderChart(values);
    }
  },
  methods: {
    renderChart(values) {
      d3.selectAll(".dgroup").remove();
      const svg_width = 1500;
      const svg_height = 2000;
      const colorScale = d3
        .scaleLinear()
        .domain([-100, -10, 0, 10, 100])
        .range(["#f65645", "#faff2e", "#1beaae", "#faff2e", "#f65645"]);
      const svg = d3.select(".miniature");
      svg
        .attr("viewBox", "-10000 -1000 20000 3800")
        .selectAll(".dgroup")
        .data(values)
        .enter()
        .append("g")
        .attr("data-key", d => d.key)
        .attr("data-amount", d => d.amount)
        .attr("class", "dgroup")
        .selectAll(".dpoint")
        .data(d => d.values)
        .enter()
        .append("circle")
        .attr("class", "dpoint")
        .attr("data-revenue", d => d.perc_winst)
        // .on("mouseover", d => handleMouseOver(d))
        .attr("r", 100)
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
          return -Math.round(d.perc_winst) * 80 + svg_height / 2;
        })
        .style("fill", d => {
          return colorScale(d.perc_winst);
        });
    }
  }
};
</script>

<style>
.miniature {
  height: 100%;
  width: 100%;
  transition: width 1.2s ease;
}
</style>
