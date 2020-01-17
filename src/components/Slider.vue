<template>
  <div class="slider-container">
    <input
      type="range"
      class="slider"
      @input="scrollHeight = Math.round($event.target.value)"
      id="scroll-range"
      min="-9"
      max="9"
      orient="vertical"
    />
    <div class="alt-thumb"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollHeight: 9
    };
  },
  watch: {
    scrollHeight: function() {
      let labelValueToShow = this.scrollHeight;
      this.$emit("scrolled");
      document
        .querySelector(`[data-value="l${labelValueToShow}"]`)
        .scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      document.querySelector(".alt-thumb").style = `top: ${-0.5 *
        labelValueToShow *
        10 +
        45}%;`;
    }
  }
};
</script>

<style scoped>
.slider-container {
  width: 2em;
  height: 50em;
  position: fixed;
  top: 3em;
  right: 0;
  z-index: 10;
}

.alt-thumb {
  width: 100%;
  height: 5%;
  background-color: #c9473d;
  position: absolute;
  top: 0;
}

input[type="range"] {
  height: 36px;
  width: 100%;
  height: 100%;
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
  margin: 0;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px var(--grey);
  background: var(--grey);
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-webkit-slider-thumb {
  opacity: 0;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: var(--grey);
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px var(--grey);
  background: var(--grey);
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: var(--grey);
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px var(--grey);
}
input[type="range"]::-ms-fill-upper {
  background: var(--grey);
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px var(--grey);
}
input[type="range"]:focus::-ms-fill-lower {
  background: var(--grey);
}
input[type="range"]:focus::-ms-fill-upper {
  background: var(--grey);
}
</style>
