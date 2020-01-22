<template>
  <div class="miniature-panel-container">
    <Miniature :rawData="rawData" />
  </div>
</template>

<script>
import Miniature from "./Miniature.vue";
export default {
  props: {
    rawData: Array
  },
  components: {
    Miniature
  }
};
</script>

<style>
.miniature-panel-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--pointerblue);
}
</style>
