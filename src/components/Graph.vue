<template>
  <div>
    <h2>
      {{ year }}
    </h2>
    <div class="graph"></div>
    <div class="tooltip"></div>
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
    return {};
  },
  watch: {
    data(d) {
      this.renderChart(d);
      this.renderChart(d);
    }
  },
  methods: {
    renderChart(values) {
      const colorScale = d3
        .scaleLinear()
        .domain([-100, -20, 0, 20, 100])
        .range(["#f65645", "#faff2e", "#1beaae", "#faff2e", "#f65645"]);

      const tooltip = d3.select(".tooltip");

      function handleMouseOver(d) {
        tooltip
          .html(d.bedrijfsnaam + "<br />" + d.perc_winst + "%")
          .style("left", d3.event.pageX + 30 + "px")
          .style("top", d3.event.pageY - 28 + "px")
          .style("z-index", "1")
          .transition()
          .duration(500)
          .style("opacity", "1");
      }

      function handleMouseOut() {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", "0")
          .style("z-index", "-1");
      }

      let graph = d3
        .select(".graph")
        .selectAll(".data-group")
        .data(values);

      graph
        .enter()
        .append("div")
        .merge(graph)
        .attr("class", "data-group");

      graph.exit().remove();

      let dataPoints = graph.selectAll(".dataPoint").data(d => d.values);

      dataPoints
        .enter()
        .append("div")
        .merge(dataPoints)
        .attr("class", "dataPoint")
        .style("background-color", d => {
          return colorScale(d.perc_winst);
        })
        .attr("data-name", d => d.bedrijfsnaam.toLowerCase())
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .transition()
        .duration(800)
        .style("opacity", "1");

      dataPoints
        .exit()
        .transition()
        .duration(800)
        .style("opacity", "0")
        .remove();

      let labels = d3.selectAll(".label");
      labels.remove();

      d3.selectAll(".data-group")
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
  opacity: 0;
}

.data-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1em;
}

.dataPoint {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin: 0.2em;
  opacity: 0;
}
</style>
