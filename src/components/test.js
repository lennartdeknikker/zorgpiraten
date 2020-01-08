

      const settings = {
        filter: {
          enabled: true,
          property: "jaar",
          value: [this.selectedYear]
        },
        nest: {
          enabled: true,
          property: "perc_winst"
        }
      };

      data = filter(data, settings.filter.property, settings.filter.value);
      data = nest(data, settings.nest.property);

      function filter(data, property, value) {
        function contains(d) {
          let doesContain = false;
          for (let i = 0; value.length > i; i++) {
            d[property].includes(value[i])
              ? (doesContain = true)
              : (doesContain = false);
          }
          return doesContain;
        }
        return data.filter(contains);
      }

      function nest(data, property) {
        let nestedData = d3
          .nest()
          .key(d => {
            return Math.floor(d[property] / 10);
          })
          .entries(data);
        nestedData.forEach(element => {
          element.amount = element.values.length;
          element.key = element.key * 10;
        });
        return nestedData;
      }