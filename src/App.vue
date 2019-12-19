<template>
  <div id="app">
    <Logo class="logo-small" />
    <Explanation />
  </div>
</template>

<script>
import Explanation from "./components/Explanation.vue";
import Logo from "./components/Logo.vue";

export default {
  name: "app",
  components: {
    Explanation,
    Logo
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Zilla+Slab&display=swap");

:root {
  /* color variables */
  --purple-light: #d8cedb;
  --grey: #e6e6e6;
  --grey-light: #f2f2f2;
  --yellow: #faff2e;
  --red: #f65645;
  --blue-light: #1beaae;
  --purple: #6b38e8;
  --textcolor: #1d2939;
  /* font variables */
  --font-family-tenso: "Tenso", Helvetica, Arial, "Nimbus Sans L", sans-serif;
  --font-family-zilla: "Zilla Slab", Georgia, "Times New Roman", "DejaVu Serif",
    serif;
}

/* main app styling */
html {
  background-color: var(--purple-light);
}

#app {
  font-family: var(--font-family-tenso);
  font-weight: 700;
  color: var(--textcolor);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-small {
  width: 5em;
}
</style>
