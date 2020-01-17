<template>
  <div class="graph-container">
    <h2 class="jaartekst">
      <span v-if="categoryToShow === 'alles'">
        Alle zorginstellingen in <span class="yeartoshow"> {{ yearToShow }} </span>
      </span>
      <span v-if="categoryToShow === 'geestelijkegezondheidszorg'">
        Instellingen voor geestelijke gezondheidszorg in <span class="yeartoshow"> {{ yearToShow }} </span>
      </span>
      <span
        v-if="
          categoryToShow !== 'alles' &&
            categoryToShow !== 'geestelijkegezondheidszorg' &&
            categoryToShow !== ''
        "
      >
        Instellingen voor {{ categoryToShow }} in <span class="yeartoshow"> {{ yearToShow }} </span>
      </span>
    </h2>
    <Search />
    <div class="tooltip"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import Search from "./Search.vue";

export default {
  components: {
    Search
  },
  props: {
    revenueData: Array,
    zorgCowboys: Array,
    yearToShow: String,
    categoryToShow: String
  },
  data: function() {
    return {
      colorScale: {
        domain: [-100, -20, 0, 20, 100],
        range: ["#f65645", "#faff2e", "#1beaae", "#faff2e", "#f65645"]
      }
    };
  },
  watch: {
    async revenueData(d) {
      await this.renderDataGroups(d).then(graph =>
        this.renderDataPoints(graph)
      );
      await this.renderDataGroups(d).then(graph =>
        this.renderDataPoints(graph)
      );
      this.renderLabels();
    }
  },
  methods: {
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
    getCowboyData(subject) {
      return this.zorgCowboys.filter(
        cowboy => cowboy.name === subject.bedrijfsnaam
      )[0];
    },
    isZorgcowboy(subject) {
      return (
        this.zorgCowboys.filter(cowboy => cowboy.name === subject.bedrijfsnaam)
          .length > 0
      );
    },
    renderDataPoints(graph) {
      let dataPoints = graph.selectAll(".dataPoint").data(d => d.values);

      const colorScale = d3
        .scaleLinear()
        .domain(this.colorScale.domain)
        .range(this.colorScale.range);

      const tooltip = d3.select(".tooltip");

      function handleMouseOver(d, object, isCowboy) {
        d3.select(object)
          .style("transform", `scale(${isCowboy ? 4 : 1.5})`)
          .style("z-index", `${isCowboy ? 1 : 0}`);
        tooltip
          .html(d.bedrijfsnaam + "<br />" + d.perc_winst + "%" + d3.event.pageX)
          .style("left", d3.event.pageX - 65 + "px")
          .style("top", d3.event.pageY + 40 + "px")
          .style("z-index", "2")
          .transition()
          .duration(500)
          .style("opacity", "1");
      }

      function handleMouseOut() {
        d3.select(this).style("transform", "scale(1)");
        tooltip
          .transition()
          .duration(500)
          .style("opacity", "0")
          .style("z-index", "-1");
      }

      function handleClick(target) {
        if (!target) window.location.href = target;
      }

      dataPoints
        .enter()
        .append("div")
        .merge(dataPoints)
        .attr("class", d => {
          return this.isZorgcowboy(d) ? "dataPoint zorg-cowboy" : "dataPoint";
        })
        .style("width", d => {
          return this.isZorgcowboy(d) ? "60px" : "30px";
        })
        .style("height", d => {
          return this.isZorgcowboy(d) ? "60px" : "30px";
        })
        .style("background", d => {
          if (!this.isZorgcowboy(d)) {
            return colorScale(d.perc_winst);
          } else {
            return `center / contain no-repeat url("images/${
              this.getCowboyData(d).gif
            }")`;
          }
        })
        .attr("data-name", d => {
          return d.bedrijfsnaam.replace(/\s+/g, "-").toLowerCase();
        })
        .on("mouseover", function(d) {
          if (d3.select(this).classed("zorg-cowboy")) {
            handleMouseOver(d, this, true);
          } else {
            handleMouseOver(d, this, false);
          }
        })
        .on("mouseout", handleMouseOut)
        .on("click", d => {
          if (this.isZorgcowboy(d)) {
            handleClick(this.getCowboyData(d).link);
          }
        })
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
        .attr("data-value", d => "l" + d.key / 10)
        .html(d => d.key + " %");
    }
  }
};
</script>

<style>
.graph-container {
  padding: 4em;
  width: calc(100% - 8em);
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
  margin: 0.4em;
  opacity: 0;
  transition-property: transform, margin;
  transition-duration: 0.3s, 0.5s;
  position: relative;
  z-index: 0;
}

.yeartoshow {
  background-color: var(--yellow);
}
</style>
