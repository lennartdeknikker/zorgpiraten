<template>
  <div class="miniature-container">
    <svg class="miniature-svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: ["rawData"],
  watch: {
    rawData: function() {
      this.createVisualisation();
    }
  },
  methods: {
    createVisualisation() {
      const miniatureSvg = d3.select(".miniature-svg");
      const dataPoints = miniatureSvg
        .append("g")
        .attr("class", "svg-datapoint-group")
        .selectAll(".data-point")
        .data(this.rawData);
      dataPoints
        .enter()
        .append("circle")
        .merge(dataPoints)
        .attr("class", "data-point")
        .attr("r", "2px")
        .attr("cx", "10")
        .attr("cy", "10")
        .attr("fill", "red");
    }
  }
};
</script>

<style scoped>
.miniature-container {
  width: 100%;
  height: 15em;
  border: 1px solid red;
  box-sizing: border-box;
  background-color: var(--pointerblue);
}
</style>
