<template>
  <div id="explanation">
    <h1>#zorgcowboys</h1>
    <h2>De winstlijn</h2>
    <p>Uitleg over wat er gaat gebeuren en waar het over gaat.</p>
    <button class="start-button">Start</button>
  </div>
</template>

<script>
export default {
  name: "Explanation"
};
</script>

<style>
#explanation {
  background-color: var(--blue-light);
  width: 80%;
  height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.start-button {
  width: 6em;
  height: 4em;
  border: none;
  background-color: var(--red);
  color: var(--grey-light);
  font-weight: 700;
  font-size: 1em;
}

h1 {
  font-family: var(--font-family);
}
</style>
