<template>
  <fieldset class="search-company">
    <div class="search-bar">
      <svg aria-hidden="true" class="icon-search" viewBox="-8 -1 35 18">
        <path
          d="M18 16.5l-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5zM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z"
        ></path>
      </svg>
      <input
        v-model="searchText"
        type="text"
        name="search"
        class="search-input"
        placeholder="zoek naar zorginstellingen"
      />
    </div>
    <p v-if="matches.length > 1">{{ matches.length }} resultaten gevonden.</p>
    <p v-if="matches.length === 1"></p>
    <p v-if="matches.length === 1">{{ matches.length }} resultaat gevonden.</p>
    <div v-if="matches.length < 10">
      <ul class="search-result-list" v-for="match of matches" :key="match.id">
        <li
          class="search-result"
          @click="
            match.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
            showFilters = true;
          "
        >
          {{ match.getAttribute("data-name") }}
        </li>
      </ul>
    </div>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      matches: []
    };
  },
  computed: {
    TransformedSearchText: function() {
      return this.searchText.toLowerCase().replace(/\s+/g, "-");
    }
  },
  watch: {
    searchText: function() {
      this.highlightMatches();
    }
  },
  methods: {
    highlightMatches() {
      let nodes = document.querySelectorAll(".highlight");
      for (let node of nodes) {
        node.classList.remove("highlight");
      }
      this.matches = document.querySelectorAll(
        `[data-name*=${this.TransformedSearchText}]`
      );
      for (let node of this.matches) {
        node.classList.add("highlight");
      }
    },
    scroll() {
      document
        .querySelector(`[data-name*=${this.TransformedSearchText}]`)
        .scrollIntoView({ behavior: "smooth" });
      this.showFilters = true;
    }
  }
};
</script>

<style scoped>
.search-result-list {
  list-style-type: none;
  text-align: left;
}

.search-company {
  margin: 0;
  border-style: none;
  width: 100%;
}

.search-company input {
  margin: 1em;
}

/* search bar */
.search-bar {
  border: 2px solid var(--textcolor);
  background-color: var(--grey-light);
  width: 60%;
  max-width: 20em;
  margin: auto;
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
  border-radius: 0.3em;
}

.icon-search {
  fill: darkgrey;
  width: 10%;
  height: 100%;
  min-width: 2rem;
  margin: auto;
}

.search-input {
  color: var(--purple);
  font-family: var(--font-family-tenso);
  background-color: transparent;
  border: none;
  width: 90%;
}

.search-input:focus {
  outline: none;
}

fieldset {
  margin-block-end: 2em;
}
</style>
