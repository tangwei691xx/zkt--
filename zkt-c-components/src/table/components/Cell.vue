<template lang="html">
  <div class="zkt-table-cell">
    {{val}}
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    name: {
      type: String,
      default: "",
    },
    filters: {
      type: String,
    },
    filter: {
      type: Function,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    val() {
      var r = this.value[this.name];
      if (this.filters) {
        this.filters.split("|").forEach((item) => {
          r = this.$options.filters[item](r, this.value);
        });
      } else if (this.filter) {
        r = this.filter(r, this.value);
      } else if (this.options.length) {
        const selectItem = this.formatOptions(this.options).find(
          (a) => a.value === r
        );
        r = (selectItem && selectItem.label) || r;
      }
      return r;
    },
  },
  methods: {
    formatOptions(options) {
      if (Array.isArray(options)) {
        if (options.length && typeof this.options[0] === "string") {
          return options.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
        } else {
          return options;
        }
      } else if (typeof options === "object") {
        return Object.keys(options).map((key) => {
          return {
            label: options[key],
            value: key,
          };
        });
      }
    },
  },
};
</script>

<style lang="css">
.zkt-table-cell {
  word-break: break-all;
}
</style>
