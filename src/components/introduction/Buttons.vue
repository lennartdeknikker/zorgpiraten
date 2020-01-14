<template>
  <div class="input-elements-container">
    <button
      class="start-button"
      @click="
        scrollTo('.graph-container');
        $emit('start-button-clicked');
      "
    >
      START
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    scrollTo: function(selector) {
      document.querySelector(selector).scrollIntoView();
    }
  }
};
</script>

<style scoped>
.input-elements-container {
  width: var(--top-view-width);
  min-width: 18rem;
  max-width: 35rem;
  display: flex;
  justify-content: center;
}

.start-button {
  width: 10rem;
  height: 2.2rem;
  border: none;
  background-color: var(--red);
  color: var(--grey-light);
  font-weight: 700;
  font-size: 1.3em;
  font-family: var(--font-family-tenso);
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
