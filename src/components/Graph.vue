<template>
  <div class="graph-container">
    <h1>Visualisatie</h1>
    {{ test }}
    <div class="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    revenueData: Array,
    zorgCowboys: Array
  },
  data: function() {
    return {
      colorScale: {
        domain: [-100, -20, 0, 20, 100],
        range: ["#f65645", "#faff2e", "#1beaae", "#faff2e", "#f65645"]
      },
      test: ""
    };
  },
  watch: {
    async revenueData(d) {
      await this.renderDataGroups(d).then(graph =>
        this.renderDataPoints(graph)
      );
      this.renderLabels();
      await this.renderDataGroups(d).then(graph =>
        this.renderDataPoints(graph)
      );
      this.renderLabels();
    }
  },
  methods: {
    isZorgcowboy(subject) {
      return (
        this.zorgCowboys.filter(cowboy => cowboy.name === subject.bedrijfsnaam)
          .length > 0
      );
    },
    getCowboyData(subject) {
      return this.zorgCowboys.filter(
        cowboy => cowboy.name === subject.bedrijfsnaam
      )[0];
    },
    async renderDataGroups(values) {
      let graph = d3
        .select(".graph-container")
        .selectAll(".data-group")
        .data(values);

      graph
        .enter()
        .append("div")
        .merge(graph)
        .attr("class", "data-group");

      graph.exit().remove();
      return graph;
    },
    renderDataPoints(graph) {
      let dataPoints = graph.selectAll(".dataPoint").data(d => d.values);

      const colorScale = d3
        .scaleLinear()
        .domain(this.colorScale.domain)
        .range(this.colorScale.range);

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

      function goToPage(bla) {
        window.location.href = bla;
      }

      dataPoints
        .enter()
        .append("div")
        .merge(dataPoints)
        .attr("class", "dataPoint")
        .style("width", d => {
          if (!this.isZorgcowboy(d)) {
            return "40px";
          } else {
            return "70px";
          }
        })
        .style("height", d => {
          if (!this.isZorgcowboy(d)) {
            return "40px";
          } else {
            return "70px";
          }
        })
        .style("background", d => {
          if (!this.isZorgcowboy(d)) {
            return colorScale(d.perc_winst);
          } else {
            let imgUrl = this.getCowboyData(d).gif;
            return `center / contain no-repeat url("images/${imgUrl}")`;
          }
        })
        .attr("data-name", d => {
          return d.bedrijfsnaam.replace(/\s+/g, "-").toLowerCase();
        })
        .on("click", d => {
          if (this.isZorgcowboy(d)) {
            goToPage(this.getCowboyData(d).link);
          }
        })
        .on("mouseover", handleMouseOver)
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
    },
    renderLabels() {
      let labels = d3.selectAll(".label");
      labels.remove();

      d3.selectAll(".data-group")
        .insert("p")
        .attr("class", "label")
        .html(d => d.key + " %");
    }
  }
};
</script>

<style>
.graph-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.label {
  display: block;
  width: 100%;
  min-width: 18rem;
  max-width: 35rem;
}

.tooltip {
  width: 8em;
  height: 8em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--purple-light);
  background-color: var(--purple);
  position: absolute;
  padding: 0.5em;
  text-align: center;
  opacity: 0;
}

.data-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1em;
  min-width: 18rem;
  max-width: 35rem;
}

.dataPoint {
  border-radius: 100%;
  margin: 0.2em;
  opacity: 0;
  transition-property: transform, margin;
  transition-duration: 0.3s, 0.5s;
}

.dataPoint:hover {
  transform: scale(1.5);
  margin: 0.7em;
}
</style>
