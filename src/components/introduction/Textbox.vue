<template>
  <div id="textbox" class="textbox-container">
    <div class="text-container">
      <button
        class="x-button"
        @click="
          scrollTo('.graph-container');
          $emit('x-button-clicked');
        "
      >
        <i class="fa fa-times" />
      </button>
      <h2 class="first-header">De winstlijn</h2>
      <p class="normal-text">
        Welkom bij de winstlijn van Pointer.
        Exploreer door de data en doe zelf onderzoek naar de zorgcowboys.
        <br>
        <br>
        Van boven naar onder zie je de 
        grootste winst tot het grootste verlies wat wordt gemaakt door 
        bedrijven in de zorg.
        <br>
        Bedrijven die in onze eerdere stukken over zorgcowboys zijn 
        voorgekomen zijn uitgelicht.
        <br>
        <br>
        Gebruik het filtermenu en begin met het vergelijken van data!
        <br>
        Iets opvallends gevonden? Laat het Pointer weten.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Textbox",
  methods: {
    scrollTo: function(selector) {
      document.querySelector(selector).scrollIntoView();
    }
  }
};
</script>

<style>
.textbox-container {
  width: calc(var(--top-view-width) - 6px);
  min-width: 18rem;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-container {
  background-color: var(--pointerblue);
  /* decreases the width with the box-shadow width */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: -5px 5px var(--blue-light);
  text-align: left;
  padding: 1rem;
  box-sizing: border-box;
}

.first-header {
  font-family: var(--font-family-zilla);
  color: var(--yellow);
  text-align: left;
  margin: 2rem 0 1rem;
  text-decoration: solid darkgrey underline;
}

.normal-text {
  font-family: var(--font-family-zilla);
  color: var(--grey);
  font-weight: 200;
  margin: 0 0 1rem;
}

/* x button */
.x-button {
  padding: 0.1em;
  min-height: 1.6em;
  min-width: 1.6em;
  border-radius: 2em;
  margin-bottom: -2em;
  border: none;
  align-self: flex-end;
  background-color: var(--input-color);
  color: var(--grey-light);
  font-size: 1.3em;
  cursor: pointer;
}

.fa-times {
  margin-top: 0.2em;
}

.hidden {
  display: none;
}
</style>
