<template>
  <th class="table-header">
    {{header}}
    <i v-if="tipContent" v-zkt-tooltip:bottom="tipContent" class="table-tips"
    ></i>
    <Sort v-if="sortable"  v-bind="$props" @sort="_onSort" />
    <i :class="{'glyphicon':true,'glyphicon-filter':filterable,'glyphicon-search':searchable}"
     @click="showDropdown=!showDropdown"></i>
    <Tooltip v-if="query" :tip="query.label||query" @close:tooltip="$emit('search', name, '')" />
    <Dropdown
      v-if="showDropdown"
      v-bind.sync="$props"
      :options="optionFormatted"
       v-on-clickaway="_onClickaway"
       @submit="_onSearch"
       />
  </th>
</template>
<script>
  import onClickaway from '../directives/clickaway'
  import Sort from './Sort.vue'
  import Dropdown from './Dropdown.vue'
  import Tooltip from './Tooltip.vue'
  import TooltipDir from '../../tooltip/directive'

  export default {
    name: 'Th',
    directives: {
      onClickaway,
      zktTooltip: TooltipDir
    },
    components: {
      Sort,
      Dropdown,
      Tooltip
    },
    props: {
      header: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      filterable: {
        type: Boolean,
        default: false
      },
      sortable: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      },
      searchQuery: {
        type: String,
        default: ''
      },
      sortQuery: {
        type: String,
        default: ''
      },
      options: {
        default () {
          return []
        }
      },
      tipContent: ''
    },
    data () {
      return {
        showDropdown: false
      }
    },
    computed: {
      query () {
        return this.optionFormatted.find(item => item.value === this.searchQuery) || this.searchQuery
      },
      optionFormatted () {
        if (Array.isArray(this.options)) {
          if (this.options.length && typeof(this.options[0]) === 'string') {
            return this.options.map(item => {
              return {
                label: item,
                value: item
              }
            })
          } else {
            return this.options
          }
        } else if (typeof(this.options) === 'object') {
          return Object.keys(this.options).map(key => {
            return {
              label: this.options[key],
              value: key
            }
          })
        }
      }
    },
    methods: {
      _onSort (dir) {
        this.$emit('sort',this.name, dir)
      },
      _onSearch (query) {
        this.showDropdown = false
        this.$emit('search', this.name, query)
      },
      _onClickaway () {
        this.showDropdown = false
      }
    }
  }
</script>
<style>
  .table-header {
    position: relative;
  }
  .table-header > i{
    color: #337ab7;
    cursor: pointer;
  }
  .table-header > .table-tips{
    position:relative;
    top:2px;
    display:inline-block;
    width:16px;
    height:16px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEo0lEQVRYR8WXe4hUdRTHP+futLKwZuWKaGqW/ZNCj7mrRloZYbt384F/ZJQS+Edolkla5txZaKz1jliQD9Ie/wgamGFk6tyxhHxgJnqn/lADKbI3smaYhqU798Sdl9PuzM5dS/r9ee/5nvM9r985PyHkMV/8ZIBEstN89aeLyC0oTcDAAvxXhNPiywnf0PcaLl3cfWDl9HNhVEstoWj7jtvEjywAfRwYUEu+8P83kM1qdK3NdEz5qjdMrwSidrpD0AXAtcDvwEFgryHGXl+ypy5Ezp+KnB+gRsQfdA0MUuF2kMkq+hBwfYBRZG3GaW2vRqIqATPmbkF4BLiI6ppIltWHVrb9GCYCpp0eomTnCnVPgg4F9nuOdV8lbEUCpu1+C4wE+RB4xXNaM2EMd5cJiKC6Ou+InvactkHdZXoQMO1UJ0iTwusZx1p0JYZ7EIm5mxBmASc9x7q5/P8/CJi2uw+4F+VdL2nN/i+MF3VE7Z0JwXgJ5X0vac0sfi8RKBRcvLtAD2/i7kR85iFYwA2l/6oveMm213ojbdqp9SDzFFleLMwcgXyr1X0Och5o9pzWXyopKnnRixXPsaoXdlATcAS0UY3s3UGL5oRNO70O9CmFRMaxllXSnyuoPHgoyh5Rlh1ZYe3JORB3Z4jyKjCqVgQvOyHrPad1vkxYsq3/n5H670ACMqOreh9PzRKVTYFBNYypmY6WHeVEzbg7H+WN4Ft9vQw8mGg9U90RPQrUkY3cJAX2HwQt5zmtM6pF17TTi0EnAydAkt2JNi91J6nBpwHeVx3zRbLteFVdha4QkSekOZberKKPqupzmWTbqmqg8YnUsEOJ6heRGUs9j0iQBgwxRhxe3vJDNV3R9l1TxPe3K7pVzLibQbnLEGPC4eUtn11J65mLtzfRL9KZwyprvKS1sJYe03b/Qjgmpu1+DwzH0Fu9jrZvagEr59XV3HfhmO/rzN7CX8QX7CJRO5UVxLhQf67/8cTMoA37dKIxd5sI0/piPN95bjDcGsS0U1mQPzzHCiZen07UdmcLbKzWGdWUjU5saWy42D/YF84UU4DnWCP6ZD3wIu7uR5moyu5M0go6JNQx21Oj8OVrVTYWi3CM51j9QqHLhEw7/VNwMQm8fcSx5obFj43vusdX/0Aw8EptKD4PFG+2sIqKBBR/WcZ5OBEe58YAR2BR2UXEOs+xng6rJJAL+hnfb8o41oa+4EzbTQMtIjK+7CqmC+SOaldxJQPNcfcxVR2a9WXrlyusk2FIjI3vGu6rfzQYfJ7TemO3YRQ+lHcudUfWGQSbU3A2eI41JwyBaCy9VkSfgcIwyocy3DjubsC08xeQwpwwaWi2d05WjI9zy2r5OM6RyG/ANReSniTSQ8Kmrdl2dys82GMhKSq9miuZaadXgS6supJdJlFcSsPXQ63cN9vuRwpTay6lZZEorOX6Jhgvhw1xhfREQdcD40Kv5SUSpYeJ/Kxk3xHq3gpLZPyS1LCuOhYi8mywIPX5YVIk0e1pdlZgnwppI8vhS9DpdxmdXY1npaGrcbChdYOzfnaciHE/MAn0un/1NCuR+D8fp+U5vVrP878BfnVHFmJcBqoAAAAASUVORK5CYII=');
    background-size: cover;
  }
</style>
