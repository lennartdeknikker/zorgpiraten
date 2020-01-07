<template>
  <div id="app">
    <Logo class="logo-header" />
    <div class="view1">
      <Explanation class="explanation" />
      <Input />
    </div>
    <div class="view2">
      <Main></Main>
    </div>
  </div>
</template>

<script>
import Logo from "./components/Logo.vue";
import Explanation from "./components/Explanation.vue";
import Input from "./components/Input.vue";
import Main from "./components/Main.vue";

export default {
  name: "app",
  components: {
    Logo,
    Explanation,
    Input,
    Main
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Zilla+Slab&display=swap");
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
  /* widths */
  --top-view-width: 50%;
}

/* main app styling */
html {
  background-color: var(--grey-light);
  background-image: radial-gradient(var(--blue-light) 5%, var(--grey-light) 5%);
  background-position: 0 0;
  background-size: 40px 40px;
  background-attachment: fixed;
}

body {
  margin: 0;
}

#app {
  font-family: var(--font-family-tenso);
  color: var(--textcolor);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  display: grid;
  grid-template-areas:
    "header"
    "view1"
    "view2";
  grid-template-rows: 10vh 90vh 100vh;
  flex-direction: column;
  align-items: center;
}

.view1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 15%;
  box-sizing: border-box;
  grid-area: view1;
}

.view2 {
  width: 100%;
  display: flex;
  grid-area: view2;
  height: 100%;
}

.logo-header {
  width: 7rem;
  align-self: flex-start;
  grid-area: header;
  margin: 0.5rem;
}

.explanation {
  margin: 0 0 2.5rem;
}
</style>
