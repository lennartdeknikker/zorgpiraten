<template>
  <div id="app">
    <div class="header">
      <Logo />
      <img src="images/asset1.png" class="triangle" />
    </div>
    <Introduction class="introduction" />
    <Filters
      class="filters"
      :rawData="rawData"
      @selection-changed="dataToShow = $event"
      @year-changed="yearToShow = $event"
      @category-changed="categoryToShow = $event"
    />
    <MiniaturePanel :rawData="dataToShow" />
    <Graph
      class="graph"
      :revenueData="dataToShow"
      :zorgCowboys="zorgCowboys"
      :yearToShow="yearToShow"
      :categoryToShow="categoryToShow"
    ></Graph>
    <!-- <Slider v-if="dataToShow" /> -->
  </div>
</template>

<script>
import * as d3 from "d3";
import Logo from "./components/Logo.vue";
import Introduction from "./components/Introduction.vue";
import Filters from "./components/Filters.vue";
import Graph from "./components/Graph.vue";
// import Slider from "./components/Slider.vue";
import MiniaturePanel from "./components/MiniaturePanel.vue";

export default {
  name: "app",
  components: {
    Logo,
    Introduction,
    Filters,
    Graph,
    // Slider,
    MiniaturePanel
  },
  data() {
    return {
      rawData: [],
      zorgCowboys: [],
      dataToShow: [],
      yearToShow: "2018",
      categoryToShow: "alles"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.zorgCowboys = await d3.json("./zorgcowboys.json");
      this.rawData = await d3.json("./rawdata.json");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Zilla+Slab&display=swap");
@import url("https://fonts.googleapis.com/css?family=Zilla+Slab&display=swap");

:root {
  /* color variables */
  --purple-light: #d8cedb;
  --grey: #e6e6e6;
  --grey-light: #f2f2f2;
  --yellow: #faff2e;
  --red: #f65645;
  --input-color: #6b38e8;
  --blue-light: #1beaae;
  --purple: #6b38e8;
  --textcolor: #1d2939;
  --pointerblue: #1f2938;
  /* font variables */
  --font-family-tenso: "Tenso", Helvetica, Arial, "Nimbus Sans L", sans-serif;
  --font-family-zilla: "Zilla Slab", Georgia, "Times New Roman", "DejaVu Serif",
    serif;
  /* widths */
  --top-view-width: 50%;
}

/* Main app styling */
html {
  background-color: var(--grey-light);
  background-image: radial-gradient(
    var(--purple-light) 5%,
    var(--grey-light) 5%
  );
  background-position: 0 0;
  background-size: 40px 40px;
  background-attachment: fixed;
  scrollbar-width: none;
}

body {
  margin: 0;
}

#app {
  font-family: var(--font-family-tenso);
  color: var(--textcolor);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 3em;
  width: 100%;
  background-color: var(--pointerblue);
  position: fixed;
  z-index: 2;
  display: flex;
  filter: drop-shadow(0 -2px 4px black);
}

.header-title {
  font-size: 1.5em;
  color: var(--grey-light);
}

.triangle {
  width: 3em;
  display: flex;
}
</style>
