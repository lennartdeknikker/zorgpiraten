<template>
    <div class="filters-container">
      <h1>Filters</h1>
      <div>
        <form action="#" @submit.prevent="scroll">
          <fieldset>
            <label for="year">Kies een jaar:</label><br />
            <input
              v-model="selectedYear"
              type="radio"
              name="year"
              value="2018"
            />
            2018<br />
            <input
              v-model="selectedYear"
              type="radio"
              name="year"
              value="2017"
            />
            2017<br />
            <input
              v-model="selectedYear"
              type="radio"
              name="year"
              value="2016"
            />
            2016<br />
            <input
              v-model="selectedYear"
              type="radio"
              name="year"
              value="2015"
            />
            2015
          </fieldset>
          <fieldset>
            <label for="category">Kies een categorie:</label><br />
            <input
              v-model="selectedCategory"
              type="radio"
              name="category"
              value="alles"
            />
            alles<br />
            <input
              v-model="selectedCategory"
              type="radio"
              name="category"
              value="geestelijkegezondheidszorg"
            />
            geestelijke gezondheidszorg<br />
            <input
              v-model="selectedCategory"
              type="radio"
              name="category"
              value="gehandicaptenzorg"
            />
            gehandicaptenzorg<br />
            <input
              v-model="selectedCategory"
              type="radio"
              name="category"
              value="thuiszorg"
            />
            thuiszorg
          </fieldset>
          <fieldset>
            <label for="search">Zoek een zorginstelling: </label><br />
            <input v-model="searchText" type="text" name="search" />
            <button type="submit">zoek</button>
            <p v-if="matches.length > 1">
              {{ matches.length }} resultaten gevonden.
            </p>
            <p v-if="matches.length === 1"></p>
            <p v-if="matches.length === 1">
              {{ matches.length }} resultaat gevonden.
            </p>
            <div v-if="matches.length < 10">
              <ul
                class="search-result-list"
                v-for="match of matches"
                :key="match"
              >
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
      </div>
    </div>
</template>

<script>
import * as d3 from "d3";
export default {
  components: {},
  props: ['rawData'],
  data() {
    return {
      selectedYear: "2018",
      selectedCategory: "alles",
      categorizedData: [],
      dataForSelectedYear: [],
      nestedData: [],
      dataToShow: [],
      searchText: "",
      matches: []
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.highlight {
  border: 10px solid var(--purple);
  width: 20px;
  height: 20px;
}

.search-result {
  cursor: pointer;
  color: var(--purple);
}

.search-result-list {
  list-style-type: none;
  text-align: left;
}
</style>
