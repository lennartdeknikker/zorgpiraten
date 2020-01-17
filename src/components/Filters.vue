<template>
  <div class="filters-container" :class="{ hide: showFilters }">
    <form action="#" @submit.prevent="scroll" class="form-filters">
      <button class="close-button-mobile" @click.prevent="showFilters = true">
        <i class="fas fa-times"></i>
      </button>
      <h1 class="filters-text">Filters</h1>
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
          <img src="images/asset14.png" class="filterimage"/>
          <img src="images/asset4.png" class="filterimage1"/>
    </form>
    <button class="button-show-filters" @click="showFilters = !showFilters">
      <i class="fas fa-filter"></i>
    </button>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  props: ["rawData"],
  data() {
    return {
      selectedYear: "2018",
      selectedCategory: "alles",
      categorizedData: [],
      dataForSelectedYear: [],
      nestedData: [],
      dataToShow: [],
      showFilters: true
    };
  },
  mounted() {
    this.processData();
  },
  watch: {
    rawData: function() {
      this.processData();
    },
    selectedCategory: function() {
      this.processData();
      this.$emit("category-changed", this.selectedCategory);
    },
    selectedYear: function() {
      this.processData();
      this.$emit("year-changed", this.selectedYear);
    },
    dataToShow: function() {
      this.$emit("selection-changed", this.dataToShow);
    }
  },
  methods: {
    processData() {
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
    }
  }
};
</script>

<style>
.filters-container {
  display: flex;
  height: calc(100vh - 3em);
  flex-direction: row;
  color: var(--grey);
  position: fixed;
  top: 3em;
  transition: transform 0.5s ease;
  z-index: 2;
}

.filterimage {
  width: 13em;
  margin-top: 10em;
  margin-left: -3em;
  transform: rotate(45deg);
  position: absolute;
  opacity: 30%;
}

.filterimage1 {
  width: 4.5em;
  margin-top: -12.9em;
  /* margin-left: 11.6em; */
  /* transform: rotate(90deg); */
  position: absolute;
  opacity: 30%;
}

.filters-text {
  font-size: 1.4em;
  margin-top: -0.5em;
  margin-bottom: 1em;
  /* margin-right: 6em; */
}

.form-filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--pointerblue);
  height: 70%;
  width: 20em;
  overflow: hidden;
}

.pick-year {
  /* display: grid; */
  width: 10em;
  margin-bottom: -2.5em;
}

.pick-category {
  display: grid;
  width: 2em;
}

fieldset {
  border: 0;
  width: 5em;
  height: 10em;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}

.highlight {
  border: 10px solid var(--purple-light);
  width: 20px;
  height: 20px;
}

.fieldset-title {
  font-size: 1em;
  font-weight: 900;
  color: var(--yellow);
}

/* filter buttons */
.label-text {
  justify-content: center;
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
  background-color: var(--darkred);
  color: #f2f2f2;
  cursor: default;
}

.button-show-filters {
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5em;
  transition: transform 0.3s ease;
  background-color: var(--darkred);
  width: 2em;
  height: 6em;
  position: relative;
  top: calc(50% - 3em);
  font-size: 1.2em;
}

fieldset {
  margin-block-end: 2em;
}

.button-show-filters:focus {
  outline: none;
}

.close-button-mobile {
  position: absolute;
  top: 1em;
  right: 4em;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
}

.hide {
  transform: translateX(-25em);
}

@media (max-width: 600px) {
  .form-filters {
    width: 55vw;
  }
  .hide {
    transform: translateX(-55vw);
  }
}

@media (min-width: 600px) {
   .close-button-mobile {
    display: block;
  }
}
</style>
