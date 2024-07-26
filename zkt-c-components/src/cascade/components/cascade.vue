<template>
<div class="dropdown" :style="'left:'+ (index === '' ? 0 : boxInfo.width) + 'px;top:'+(index !== '' ? (topInd * boxInfo.height - parentScroll) : '0')+'px;'">
  <ul
  class="dropdown-menu"
  ref="root"
  :style="'width:'+boxInfo.width+'px;line-height:'+boxInfo.height+'px;max-height:'+boxInfo.maxheight+'px;margin:0;padding:0;'+ (data.length * boxInfo.height >= boxInfo.maxheight ? 'overflow:auto;' : '')"
  @scroll="onScroll">
    <li
      v-for="(item, ind) in data"
      :key="ind"
      @click.stop="getSelectId({id: (idKeyValue === '' ? '' : idKeyValue + flag) + item[idKey], index: (index === '' ? '' : index + flag) + ind, keyname: (itemName === '' ? '' : itemName + flag) + item[keyName]}, item)"
      @mouseover="over(item, ind, $event)"
      :style="'line-height:'+boxInfo.height+'px;height:'+boxInfo.height+'px;'+(item.disabled ? 'background:#eee;' : '')"
    >
    <span class="name" :style="'line-height:'+boxInfo.height+'px;height:'+boxInfo.height+'px'">{{item[keyName]}}</span>
    <span class="arrow glyphicon glyphicon-menu-right" :style="'line-height:'+boxInfo.height+'px'" v-if="item[childKey] && item[childKey].length > 0"></span>
    </li>
  </ul>
    <cascade
      v-if="subData[childKey] && subData[childKey].length > 0"
      ref="child"
      :flag="flag"
      :topInd="subData.ind"
      :index="(index === '' ? '' : index + flag) + subData.ind"
      :data="subData[childKey]"
      :key-name="keyName"
      @is-end="isEnd"
      :child-key="childKey"
      :box-info="boxInfo"
      :id-key="idKey"
      :level="level + 1"
      :item-name="(itemName === '' ? '' : itemName + flag) + subData[keyName]"
      :id-key-value="(idKeyValue === '' ? '' : idKeyValue + flag) + subData[idKey]"
      @get-select-id="getSelectId"
      @getParentScrollTop="getParentScrollTop"
    ></cascade>
</div>
</template>

<script>
export default {
  name: 'cascade',
  props: {
    childKey: {
      type: String,
      default: () => {
        return 'data'
      }
    },
    topInd: {
      type: Number,
      default: () => {
        return 0
      }
    },
    idKey: {
      type: String,
      default: () => {
        return ''
      }
    },
    boxInfo: {
      type: Object,
      default: () => {
        return {
          width: 200,
          height: 35,
          maxheight: 300
        }
      }
    },
    flag: {
      type: String,
      default: () => {
        return '_'
      }
    },
    idKeyValue: {
      type: String,
      default: () => {
        return ''
      }
    },
    itemName: {
      type: String,
      default: () => {
        return ''
      }
    },
    keyName: {
      type: String,
      default: () => {
        return ''
      }
    },
    index: {
      type: String,
      default: () => {
        return ''
      }
    },
    open: {
      type: String,
      default: () => {
        return ''
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    level: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      subData: '',
      parentScroll: 0
    }
  },
  methods: {
    getSelectId (obj, item) {
      if (item && item.disabled) {
        return false
      }
      this.$emit('get-select-id', obj)
    },
    getParentScrollTop () {
      if (this.$refs['child']) {
        console.log(this.$refs['root'].scrollTop, 'scrotop11')
        this.$refs['child'].parentScroll = this.$refs['root'].scrollTop
      }
    },
    over (item, ind, ev) {
      this.$refs['child'] && (this.$refs['child'].subData = '')
      if (this.$refs['child']) {
        this.$refs['child'].parentScroll = this.$refs['root'].scrollTop
        console.log(this.$refs['root'].scrollTop, 'scrotop')
      }
      if (item[this.childKey] && item[this.childKey].length > 0) {
        item.ind = ind
        this.subData = item
      } else {
        this.subData = ''
      }
    },
    onScroll ($event) {
      if ($event.target.scrollTop + $event.target.clientHeight >= $event.target.scrollHeight) {
        this.$emit('is-end', this.level)
      }
    },
    isEnd (key) {
      this.$emit('is-end', key)
    }
  },
  mounted () {
    this.$emit('getParentScrollTop')
  }
}
</script>

<style  scoped>
.dropdown{
  position: absolute;
  top: 0px;
}
ul{
  display: block;
  float: left;
}
ul li {
  position: relative;
  cursor: default;
  float: left;
  width:100%;
}
ul li:hover{
  background: #f1f1f1;
}
ul li .arrow{
  position: absolute;
  right: 10px;
}
ul li .name{
  float: left;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-indent: 5px;
  width: 90%;
}
</style>
