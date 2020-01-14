<template>
  <div id="textbox" class="textbox-container">
    <div class="text-container">
      <h2 class="first-header">De winstlijn</h2>
      <p class="normal-text">
        Welkom bij de winstlijn van Pointer. Op deze webpagina hebben wij voor
        jou interessante en opvallende data uit onze ZorgCowboys onderzoeken
        uitgelicht.
      </p>
      <p class="normal-text">
        Wil je liever zelf de sherriff uithangen? Dat kan! Voer simpelweg een
        naam van een zorginstelling hieronder in en ga op zoek naar opvallende
        cijfers binnen de zorgindustrie.
      </p>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Textbox"
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
  background-color: var(--grey);
  /* decreases the width with the box-shadow width */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: -6px 6px red;
  text-align: left;
  padding: 1rem;
  box-sizing: border-box;
}

.first-header {
  font-family: var(--font-family-zilla);
  text-align: left;
  margin: 2rem 0 1rem;
  text-decoration: solid darkgrey underline;
}

.normal-text {
  font-family: var(--font-family-zilla);
  font-weight: 700;
  margin: 0 0 1rem ;
}

</style>
