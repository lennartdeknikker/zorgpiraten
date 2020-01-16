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
  width: 5%;
  max-width: 5em;
  height: 50em;
  background-color: aquamarine;
  position: fixed;
  top: 3em;
  right: 0;
  z-index: 10;
}

.alt-thumb {
  width: 100%;
  height: 5%;
  background-color: red;
  position: absolute;
  top: 0;
}

input[type="range"] {
  height: 36px;
  width: 100%;
  height: 100%;
  -webkit-appearance: slider-vertical;
  writing-mode: bt-lr;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #50555c;
  background: #50555c;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 30px;
  width: 30px;
  border-radius: 0px;
  background: #529de1;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 0px;
  opacity: 0;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #50555c;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #50555c;
  background: #50555c;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 30px;
  width: 30px;
  border-radius: 0px;
  background: #529de1;
  cursor: pointer;
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
  background: #50555c;
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #50555c;
}
input[type="range"]::-ms-fill-upper {
  background: #50555c;
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #50555c;
}
input[type="range"]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 0px solid #000000;
  height: 30px;
  width: 30px;
  border-radius: 0px;
  background: #529de1;
  cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #50555c;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #50555c;
}
</style>
