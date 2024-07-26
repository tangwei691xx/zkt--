<template lang="html">
  <input class="form-control" type="text" :name="name" v-model="value">
</template>

<script>
import "eonasdan-bootstrap-datetimepicker";
const events = ['hide', 'show', 'change', 'error', 'update']

const defaultOptions={
    locale:"zh-cn",
    format: 'YYYY-MM-DD HH:mm:ss',
    useCurrent: true,
    keepOpen: false
};

export default {
  name: 'DatetimePicker',
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
    },
    options: {
      type: Object,
      default () {
        return defaultOptions;
      }
    }
  },
  watch: {
    value(newValue) {
      this.dp && this.dp.date(newValue || null)
    },
    options: {
      deep: true,
      handler(newConfig) {
        this.dp && this.dp.options(newConfig);
      }
    }
  },
  methods: {
    registerEvents() {
      events.forEach((name) => {
        $(this.$el).on(`dp.${name}`, (...args) => {
          this.$emit(`dp-${name}`, ...args);
        });
      })
    },
    onChange(event) {
      let formattedDate = event.date ? event.date.format(this.dp.format()) : null;
      this.$emit('input', formattedDate);
    }
  },
  beforeDestroy() {
    if (this.dp) {
      this.dp.destroy();
      this.dp = null;
    }
  },
  mounted () {
    const options=Object.assign({}, defaultOptions,this.options);
    var el = $(this.$el).datetimepicker(options)
    this.dp = el.data('DateTimePicker')
    this.value && this.dp.date(this.value)
    // Watch for changes
    $(this.$el).on('dp.change', this.onChange);
    // Register remaining events
    this.registerEvents();
  }
}
</script>

<style lang="css">
</style>
