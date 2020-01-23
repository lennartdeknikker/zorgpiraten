<template>
  <div class="filters-container" :class="{ hide: showFilters }">
    <form action="#" @submit.prevent="scroll" class="form-filters">
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
  height: auto;
  flex-direction: row;
  align-items: flex-end;
  color: var(--grey);
  position: fixed;
  top: 3rem;
  transition: transform 0.5s ease;
  z-index: 2;
  overflow: hidden;
}

.filters-text {
  font-size: 1.4em;
  margin-top: 0;
}

.form-filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--pointerblue);
  height: 100%;
  width: 20em;
  overflow: hidden;
  padding: 1.5rem 0;
  border-bottom: 2px var(--yellow) solid;
}

.pick-year {
  width: 10em;
  margin-bottom: 0.5rem;
}

.pick-category {
  display: flex;
  flex-direction: column;
  width: 3rem;
}

fieldset {
  border: 0;
  z-index: 1;
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
  display: inline-flex;
  border-radius: 0.5em;
  cursor: pointer;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .label-text {
  background-color: var(--input-color);
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
  background-color: var(--input-color);
  width: 2em;
  height: 6em;
  font-size: 1.2em;
  margin-bottom: 0.1em;
}

.button-show-filters:focus {
  outline: none;
}

.hide {
  transform: translateX(-20em);
}

@media (max-width: 600px) {
  .form-filters {
    width: 55vw;
  }
  .hide {
    transform: translateX(-55vw);
  }
}
</style>
