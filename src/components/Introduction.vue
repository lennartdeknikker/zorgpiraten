<template>
  <div class="introduction-container">
    <Textbox class="textbox" />
    <Buttons />
  </div>
</template>

<script>
import Textbox from "@/components/introduction/Textbox.vue";
import Buttons from "@/components/introduction/Buttons.vue";

export default {
  components: {
    Textbox,
    Buttons
  }
};
</script>

<style>
.introduction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.textbox {
  margin: 0 0 2.5rem;
}
</style>
