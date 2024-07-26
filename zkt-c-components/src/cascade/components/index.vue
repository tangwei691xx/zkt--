<template>
<div class="form-group" ref="select" :style="'width:'+boxInfo.width+'px;margin-bottom:0px;position:relative;float:left;height:'+boxInfo.height + 'px'">
  <!-- <span style="position:fixed;left:0">{{listFlag}}</span> -->
  <input
    v-model="indexValue"
    :readonly="!searchFlag"
    :placeholder="placeholder"
    :style="'position:absolute;width:'+boxInfo.width+'px;line-height:'+boxInfo.height + 'px;height:'+boxInfo.height + 'px;top:'+($refs.selectDom ? ((!listFlag && !showSearchListFlag || !searchFlag) ? 0 : $refs.selectDom.clientHeight) : 0) + 'px'"
    @input="search"
    @focus="showlist"
    @keyup.stop.prevent="keyupFn($event)"
    class="showvalue"
  />
  <div
    v-if="multipleValue.length >= 0"
    :style="multipleZindex + 'top:0px;position:absolute;background: #fff;width:'+boxInfo.width+'px;line-height:'+boxInfo.height + 'px;min-height: '+boxInfo.height + 'px;'+(boxInfo.forbidStyle ? boxInfo.forbidStyle : '')"
    ref="selectDom"
    @click="multipleSearchFn"
    class="showvalue showvaluediv"
  >
    <span
      v-for="(mulitem, mulind) in multipleValue"
      class="value"
      :key="mulind"
      :style="(multipleFlag ? 'border:1px solid #ccc' : '')"
      @click="search"
    >
      {{mulitem.keyname}}
      <span class="delete" @click.stop="multipleDelete(mulind)" v-if="deleteFlag">x</span>
    </span>
  </div>
  <div class="showvaluearrow glyphicon glyphicon-menu-down" :style="'line-height:'+boxInfo.height+'px;'" @click="showDrop"></div>
  <div
    :style="'position:absolute;left:0;top:'+($refs.selectDom ? $refs.selectDom.clientHeight + (searchFlag ? boxInfo.height : 0) : boxInfo.height)+'px;'"
    v-show="listFlag"
  >
    <cascade
      ref="child"
      :search-value="indexValue"
      v-bind="$props"
      @is-end="isEnd"
      @get-select-id="getSelectId"
      @getParentScrollTop="getParentScrollTop"
    ></cascade>
  </div>
  <div
    v-if="showSearchListFlag && res.length > 0 && searchFlag"
    :style="'width:'+boxInfo.width+'px;overflow-y:scroll;position:absolute;left:0;top:'+($refs.selectDom ? $refs.selectDom.clientHeight + (searchFlag ? boxInfo.height : 0) : boxInfo.height)+'px;max-height:'+boxInfo.maxheight + 'px;'"
    class="searchpart"
  >
    <div :key="ind" v-for="(item, ind) in res" :style="'line-height:'+boxInfo.height+'px;'+(item.disabled ? 'background:#eee;' : '')" @click="setSearchValue(item)">
      {{item.keyname}}
    </div>
  </div>
</div>
</template>
<script>
import cascade from './cascade.vue'
export default {
  name: '',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchFlag: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    deleteFlag: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    multipleFlag: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    resultFlag: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    placeholder: {
      type: String,
      default: () => {
        return ''
      }
    },
    childKey: {
      type: String,
      default: () => {
        return 'data'
      }
    },
    idKey: {
      type: String,
      default: () => {
        return 'id'
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
    keyName: {
      type: String,
      default: () => {
        return 'name'
      }
    },
    forbid: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    async: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      multipleZindex: '',
      indexValue: '',
      multipleValue: [],
      listFlag: false,
      showSearchListFlag: false,
      res: []
    }
  },
  components: {
    cascade
  },
  created () {
    this.value.map((item) => {
      this.multipleValue.push(item)
    })
  },
  methods: {
    keyupFn (ev) {
      this.$emit('keyup', ev.keyCode, this.indexValue)
    },
    getParentScrollTop () {
      if (this.$refs['child']) {
        this.$refs['child'].parentScroll = this.$refs['child'].scrollTop
      }
    },
    multipleSearchFn () {
      if (this.forbid) {
        return false
      }
      if (!this.searchFlag) {
        this.showDrop()
        return
      }
      // this.multipleZindex = 'z-index: -1;'
      this.$refs.select.querySelector('input').focus()
    },
    multipleDelete (ind) {
      if (this.forbid) {
        return false
      }
      let temp = Object.assign({}, this.multipleValue[ind])
      this.multipleValue.splice(ind, 1)
      if (this.multipleValue.length === 0) {
        this.indexValue = ''
      }
      this.$emit('input', this.multipleValue, temp)
    },
    search () {
      if (this.forbid) {
        return false
      }
      this.res = []
      this.listFlag = false
      this.showSearchListFlag = true
      if(this.async){
        this.$emit('async-search', this.indexValue, this.getSearchList)
      } else {
        this.getSearchList()
      }
    },
    setSearchValue (item) {
      if (this.forbid) {
        return false
      }
      if (item.disabled) {
        return false
      }
      // this.indexValue = item.keyname
      this.indexValue = ''
      this.showSearchListFlag = false
      this.res = []
      item = this.clearRes(item)
      if (!this.multipleFlag) {
        this.multipleValue = [item]
      } else {
        if (!this.noRepeat(item)) {
          this.multipleValue.push(item)
        }
      }
      this.$emit('input', this.multipleValue)
    },
    noRepeat (item) {
      let count = 0
      this.multipleValue.map((items) => {
        if (item.id === items.id) {
          count++
        }
      })
      return count
    },
    showlist () {
      if (this.forbid) {
        return false
      }
      if (this.res.length > 0) {
        this.listFlag = false
        this.showSearchListFlag = true
      } else {
        this.listFlag = true
      }
    },
    getSearchList (temp, id, name, index) {
      if (this.forbid) {
        return false
      }
      if (!temp) {
        temp = this.data
        id = ''
        name = ''
        index = ''
      }
      for (let item = 0; item < temp.length; item++) {
        let ids = (id === '' ? temp[item][this.idKey] : (id + this.flag + temp[item][this.idKey]))
        let names = (name === '' ? temp[item][this.keyName] : (name + this.flag + temp[item][this.keyName]))
        let indexs = (index === '' ? item : (index + this.flag + item))
        if (temp[item][this.keyName] && temp[item][this.keyName].toString().indexOf(this.indexValue) >= 0) {
          this.res.push({
            id: ids,
            index: indexs,
            keyname: names,
            disabled: temp[item].disabled
          })
        }
        if (temp[item][this.childKey] && temp[item][this.childKey].length > 0) {
          this.getSearchList(temp[item][this.childKey], ids, names, indexs)
        }
      }
    },
    showDrop () {
      if (this.forbid) {
        return false
      }
      this.listFlag = !this.listFlag
      this.multipleZindex = ''
    },
    clearRes (obj) {
      if (!this.resultFlag) {
        let tempobj = {}
        let objsplit = obj.id.toString().split(this.flag)
        let objnamesplit = obj.keyname.toString().split(this.flag)
        tempobj.id = objsplit[objsplit.length - 1]
        tempobj.keyname = objnamesplit[objnamesplit.length - 1]
        obj = tempobj
      }
      return obj
    },
    getSelectId (obj) {
      obj = this.clearRes(obj)
      // 单选情况
      if (!this.multipleFlag) {
        this.indexValue = obj.keyname
        this.multipleValue = []
        this.multipleValue.push(obj)
        this.$emit('input', this.multipleValue)
      } else {
        if (!this.noRepeat(obj)) {
          this.multipleValue.push(obj)
        }
        this.$emit('input', this.multipleValue)
      }
      this.showDrop()
    },
    outside (e) {
      if (this.$refs.select) {
        if (!this.$refs.select.contains(e.target)) {
          if (this.listFlag) {
            this.listFlag = !this.listFlag
            this.multipleZindex = ''
          } else {
            this.multipleZindex = ''
          }
          this.showSearchListFlag = false
        }
      }
    },
    isEnd (key) {
      this.$emit('is-end', key)
    }
  },
  mounted () {
    document.addEventListener('click', this.outside, false)
  },
  watch: {
    value: function (val) {
      this.multipleValue = val
    }
  }
}
</script>
<style scoped>
.searchpart{
  background: #fff;
  z-index: 100000;
}
.searchpart, .showvalue{
  border:none;
  /* box-shadow: 0 0 0 1px #ccc; */
  border: 1px solid #ccc;
  border-radius: 3px;
  float: left;
}
.showvalue {
  padding: 0 5px;
}
.showvalue .value{
  border-radius: 3px;
  cursor: pointer;
  float: left;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
  padding: 0 10px 0 3px;
  position: relative;
  margin-top: 3px;
  margin-right: 5px;
  margin-bottom: 3px;
}
.showvalue .value .delete{
  height: 10px;
  line-height: 10px;
  padding: 0 10px 0 3px;
  position: absolute;
  right: 0px;
  top: 5px;
  width: 10px;
}
.searchpart div{
  cursor: pointer;
  float: left;
  padding: 0 5px;
  width: 100%;
}
.searchpart div:hover{
  color: #03a9f4;
}
.showvalue:focus{
  outline: none;
}
.showvaluearrow{
  position: absolute;
  right: 0px;
  width: 20px;
}
</style>
