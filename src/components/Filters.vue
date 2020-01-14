<template>
  <div class="filters-container" :class="{ hide: showFilters }">
    <form action="#" @submit.prevent="scroll" class="form-filters">
      <fieldset class="pick-year">
        <legend class="fieldset-title">Jaartal</legend>
        <input
          v-model="selectedYear"
          type="radio"
          name="year"
          value="2018"
          id="2018"
        />
        <label class="label-text" for="2018">2018</label>
        <input
          v-model="selectedYear"
          type="radio"
          name="year"
          value="2017"
          id="2017"
        />
        <label class="label-text" for="2017">2017</label>
        <input
          v-model="selectedYear"
          type="radio"
          name="year"
          value="2016"
          id="2016"
        />
        <label class="label-text" for="2016">2016</label>
        <input
          v-model="selectedYear"
          type="radio"
          name="year"
          value="2015"
          id="2015"
        />
        <label class="label-text" for="2015">2015</label>
      </fieldset>
      <fieldset class="pick-category">
        <legend class="fieldset-title">Soort zorg</legend>
        <input
          v-model="selectedCategory"
          type="radio"
          name="category"
          value="alles"
          id="all"
        />
        <label class="label-text" for="all">Alle zorg</label>
        <input
          v-model="selectedCategory"
          type="radio"
          name="category"
          value="geestelijkegezondheidszorg"
          id="geestelijk"
        />
        <label class="label-text" for="geestelijk"
          >Geestelijke Gezondheidszorg</label
        >
        <input
          v-model="selectedCategory"
          type="radio"
          name="category"
          value="gehandicaptenzorg"
          id="handicap"
        />
        <label class="label-text" for="handicap">Gehandicaptenzorg</label>
        <input
          v-model="selectedCategory"
          type="radio"
          name="category"
          value="thuiszorg"
          id="thuiszorg"
        />
        <label class="label-text" for="thuiszorg">Thuiszorg</label>
      </fieldset>
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
        <p v-if="matches.length > 1">
          {{ matches.length }} resultaten gevonden.
        </p>
        <p v-if="matches.length === 1"></p>
        <p v-if="matches.length === 1">
          {{ matches.length }} resultaat gevonden.
        </p>
        <div v-if="matches.length < 10">
          <ul class="search-result-list" v-for="match of matches" :key="match">
            <li
              class="search-result"
              @click="
                match.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                })
              "
            >
              {{ match.getAttribute("data-name") }}
            </li>
          </ul>
        </div>
      </fieldset>
    </form>
    <button class="button-show-filters" @click="showFilters = !showFilters">
      FILTERS
    </button>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  components: {},
  props: ["rawData"],
  data() {
    return {
      selectedYear: "2018",
      selectedCategory: "alles",
      categorizedData: [],
      dataForSelectedYear: [],
      nestedData: [],
      dataToShow: [],
      searchText: "",
      matches: [],
      showFilters: false
    };
  },
  mounted() {
    this.processData();
  },
  computed: {
    TransformedSearchText: function() {
      return this.searchText.toLowerCase().replace(/\s+/g, "-");
    }
  },
  watch: {
    rawData: function() {
      this.processData();
    },
    selectedCategory: function() {
      this.processData();
    },
    selectedYear: function() {
      this.processData();
    },
    searchText: function() {
      this.highlightMatches();
    },
    dataToShow: function() {
      this.$emit("selection-changed", this.dataToShow);
    }
  },
  methods: {
    processData() {
      this.searchText = "";
      this.matches = [];
      this.categorizeData();
      this.filterCategorizedDataByYear();
      this.nestDataByRevenueValues();
      this.RemoveUnwantedValues();
    },
    categorizeData() {
      if (this.selectedCategory != "alles") {
        let categorized = this.rawData.filter(
          item =>
            item[this.selectedCategory] === "ja" ||
            item[this.selectedCategory] === "yes"
        );
        this.categorizedData = categorized;
      } else this.categorizedData = this.rawData;
    },
    filterCategorizedDataByYear() {
      this.dataForSelectedYear = this.categorizedData.filter(
        d => d.jaar === this.selectedYear
      );
    },
    nestDataByRevenueValues() {
      let nestedData = d3
        .nest()
        .key(d => {
          return Math.floor(d["perc_winst"] / 10);
        })
        .entries(this.dataForSelectedYear);
      nestedData.forEach(element => {
        element.amount = element.values.length;
        element.key = element.key * 10;
      });
      this.nestedData = nestedData;
    },
    RemoveUnwantedValues() {
      let dataToShow = this.nestedData;
      dataToShow = dataToShow.filter(value => {
        return (
          !isNaN(value.key) &&
          value.key < 100 &&
          value.key > -100 &&
          value.key != null
        );
      });
      dataToShow.forEach(element => {
        element.amount = element.values.length;
        element.values.sort(function(a, b) {
          return b.perc_winst - a.perc_winst;
        });
      });
      dataToShow.sort(function(a, b) {
        return b.key - a.key;
      });
      this.dataToShow = dataToShow;
    },
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
    }
  }
};
</script>

<style>
.filters-container {
  display: flex;
  height: calc(100vh - 4em);
  flex-direction: row;
  color: var(--grey);
  position: fixed;
  top: 4em;
  transition: transform 0.5s ease;
}

.form-filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #c9473d;
  height: 100%;
  width: 25em;
  overflow: hidden;
}

fieldset {
  border: 0;
}

.highlight {
  border: 10px solid var(--purple-light);
  width: 20px;
  height: 20px;
}

.search-result {
  cursor: pointer;
  color: var(--purple-light);
  display: flex;
  flex-wrap: wrap;
}

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

.fieldset-title {
  font-size: 1em;
  text-decoration: underline;
}

/* filter buttons */
.label-text {
  font-weight: 800;
  font-size: 0.9em;
  background-color: #dfdfdf;
  color: #626972;
  padding: 0.5em;
  margin: 0.3em;
  margin-top: 0.5em;
  display: inline-flex;
  border-radius: 0.5em;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .label-text {
  background-color: var(--textcolor);
  color: #f2f2f2;
  cursor: default;
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

.button-show-filters {
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em;
  transition: transform 0.3s ease;
  background-color: #c9473d;
  width: 6em;
  height: 2em;
  position: relative;
  top: 50%;
  transform: rotate(270deg);
  transform-origin: top left;
}

.hide {
  transform: translateX(-25em);
}

/* input:checked .label-text {
background-color: yellowgreen;
} */

/* width: 10em;
display: flex;
justify-content: right;
float: left;
color: #f2f2f2;
text-align: center;
padding: 14px 16px;
text-decoration: none;
font-size: 17px; */
</style>
