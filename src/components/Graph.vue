<template>
  <div class="graph">
    {{ year }}
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    data: Array,
    year: String
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
        return (
          !isNaN(value.key) &&
          value.key < 100 &&
          value.key > -100 &&
          value.key != null
        );
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
      const colorScale = d3
        .scaleLinear()
        .domain([-100, -20, 0, 20, 100])
        .range(["#f65645", "#faff2e", "#1beaae", "#faff2e", "#f65645"]);

      this.chart = d3.select(".graph").append("div");
      const tooltip = d3
        .select(".graph")
        .append("div")
        .attr("class", "tooltip");

      function handleMouseOver(d) {
        tooltip
          .html(d.bedrijfsnaam + "<br />" + d.perc_winst + "%")
          .style("left", d3.event.pageX + 30 + "px")
          .style("top", d3.event.pageY - 28 + "px")
          .style("display", "flex");
      }

      function handleMouseOut() {
        tooltip.style("display", "none");
      }

      this.chart
        .selectAll(".item")
        .data(values)
        .enter()
        .append("div")
        .attr("class", (d, i) => {
          if (i % 2 == 0) {
            return "dataGroup row-type-1";
          } else return "dataGroup row-type-2";
        })
        .selectAll(".dataPoint")
        .data(d => d.values)
        .enter()
        .append("div")
        .attr("class", "dataPoint")
        .style("background-color", d => {
          return colorScale(d.perc_winst);
        })
        .attr("data-name", d => d.bedrijfsnaam.toLowerCase())
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

      d3.selectAll(".dataGroup")
        .append("p")
        .attr("class", "label")
        .html(d => d.key + " %");
    }
  }
};
</script>

<style>
.graph {
  width: 100%;
}

.label {
  display: block;
  width: 100%;
}

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
  display: none;
}

.dataGroup {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1em;
}

.dataPoint {
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 100%;
}
</style>
