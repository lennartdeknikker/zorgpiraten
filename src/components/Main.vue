<template>
  <div>
    <h1>Main</h1>
    <Graph :data="loadData"></Graph>
  </div>
</template>

<script>
import Graph from "./Graph.vue";
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
