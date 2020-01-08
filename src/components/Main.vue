<template>
  <div class="main-container">
    <h1>Main</h1>
    <Graph :data="loadData"></Graph>
  </div>
</template>

<script>
import Graph from "./Graph2.vue";
import * as d3 from "d3";
export default {
  components: {
    Graph
  },
  data() {
    return {
      loadData: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./data.json");

      this.loadData = data;
    }
  }
};
</script>

<style>
.main-container {
  width: calc(var(--top-view-width) - 6px);
  min-width: 18rem;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
