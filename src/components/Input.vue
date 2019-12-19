<template>
  <div class="input-elements-container">
    <button class="start-button">START</button>
    <span class="input-divider-text">OF</span>
    <div class="search-bar">
      <svg aria-hidden="true" class="icon-search" viewBox="-8 -1 35 18">
        <path
          d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"
        ></path>
      </svg>
      <input
        type="text"
        class="search-input"
        placeholder="zoek naar zorginstellingen"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.input-elements-container {
  width: var(--top-view-width);
  min-width: 18rem;
  display: flex;
  justify-content: space-between;
}

.start-button {
  width: 10rem;
  height: 2.2rem;
  border: none;
  background-color: var(--red);
  color: var(--grey-light);
  font-weight: 700;
  font-size: 1.3em;
}

.search-bar {
  border: 2px solid var(--red);
  background-color: var(--grey);
  width: 60%;
  display: flex;
  justify-content: space-between;
}

.icon-search {
  fill: darkgrey;
  width: 10%;
  height: 100%;
  min-width: 2rem;
}

.search-input {
  color: darkgrey;
  font-family: var(--font-family-zilla);
  background-color: transparent;
  border: none;
  width: 90%;
}

.input-divider-text {
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  margin: 0 1rem;
  flex-wrap: wrap;
}
</style>
