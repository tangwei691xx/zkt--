<template lang="html">
  <div class="component-zkt-config-page clearfix" :style="pageStyle">
      <component
        v-for="(field, index) in fields"
        :key="index"
        :ref="field.name||index"
        :style="field.style"
        v-bind="field"
        v-on="$listeners"
        v-show="showFn(field)"
        :is="field.component"
        @tracker="tracker"
      >
        <div v-for="item in field.slotCom"
          v-if="field.slotCom"
          :slot="item.name">
          <component
            v-bind="item"
            v-on="$listeners"
            @tracker="tracker"
            :is="item.component"/>
        </div>
      </component>
  </div>
</template>

<script>
let components = {}
let req = require.context('./components', true)
req.keys().forEach((key) => {
  let component = req(key).default
  components[component.name] = component
})

export default {
  name: 'config-page',
  components: {
    ...components
  },
  props: {
    fields: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    pageStyle : {
      type:Object,
      default () {
        return {
          padding: '20px'
        }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    tracker (params, str, val, columns) {
      this.$emit("tracker", params, str, val, columns)
    },
    refreshData () {
      return this.$refs.list[0].handleData()
    },
    showFn (field) {
      if (field.visible) {
        if (field.visible === 'true') return true
        return false
      }
      return true
    }
  }
}
</script>
