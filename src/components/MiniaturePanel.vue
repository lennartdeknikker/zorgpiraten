<template>
  <div class="miniature-panel-container" :class="{ hide: showMiniature }">
    <div class="miniature-panel">
      <h1 class="miniature-text">Totaal overzicht</h1>
      <Miniature :rawData="rawData" />
    </div>
    <button
      class="button-show-miniature"
      @click="showMiniature = !showMiniature"
    >
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
import Miniature from "./Miniature.vue";
export default {
  props: {
    rawData: Array
  },
  data() {
    return {
      showMiniature: true
    };
  },
  components: {
    Miniature
  }
};
</script>

<style>
.miniature-panel-container {
  display: flex;
  height: auto;
  color: var(--grey);
  position: fixed;
  bottom: 0;
  transition: transform 0.5s ease;
  align-items: center;
  justify-content: center;
  z-index: 2;
  left: -2rem;
}

.miniature-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--pointerblue);
  height: 100%;
  width: 20em;
  overflow: hidden;
  padding: 1.5rem 0;
  position: relative;
  left: 2rem;
}

.miniature-text {
  font-size: 1.4em;
  margin-top: 0;
}

.button-show-miniature {
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em;
  transition: transform 0.3s ease;
  background-color: #4f29b1;
  width: 2em;
  height: 6em;
  font-size: 1.2em;
  position: relative;
  left: 2rem;
}

.hide {
  transform: translateX(-20rem);
}

@media (max-width: 600px) {
  .miniature-panel {
    width: 55vw;
  }
  .hide {
    transform: translateX(-55vw);
  }
}
</style>
