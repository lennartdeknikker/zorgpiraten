<template>
  <transition-group tag="div" class="introduction-container" name="fade">
    <div v-if="showZeroState" key="introduction" class="introduction-elements">
      <!-- <Textbox class="textbox" /> -->
      <Textbox @x-button-clicked="showZeroState = !showZeroState" />
    </div>
  </transition-group>
</template>

<script>
import Textbox from "@/components/introduction/Textbox.vue";
// import Buttons from "@/components/introduction/Buttons.vue";

export default {
  components: {
    Textbox
  },
  data() {
    return {
      showZeroState: true
    };
  }
};
</script>

<style>
.introduction-container {
  position: fixed;
  z-index: 1;
}

.introduction-elements {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--purple);
  background-blend-mode: multiply;
  width: 100vw;
  height: 100vh;
}

.fade-leave-active {
  transition: opacity 0.3s linear;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.textbox {
  margin: 0 0 2.5rem;
}
</style>