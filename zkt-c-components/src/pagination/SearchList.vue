<template>
  <table
    id="item_table"
    class="list-table table table-striped table-bordered table-hover end-data-table"
  >
    <thead>
      <tr>
        <th
          v-for="(item, ind) in basicInfo.listhead[tabInd]"
          v-if="selectVal[tabInd].length > 0"
          :key="'head_' + ind"
          :style="'width:'+ basicInfo.listpercent[tabInd][ind]"
          :title="item"
          class="classset"
        >
          <span
            v-if="basicInfo.jsonopt[tabInd][ind] === 'check'"
          >
            <input
              v-model="checkAll"
              :disabled="forbidArr.length > 0"
              @change="checkAllFn"
              type="checkbox"
            />
            {{selectVal[tabInd][ind].txt}}
          </span>
          {{item}}
          <a
            v-show="basicInfo.listheadsearch[tabInd][ind] === 'rank'"
            @click="rankFn(ind, selectVal[tabInd][ind].val)"
            :title="basicInfo.searchtxt"
            style="font-weight:normal;margin-left:5px;"
            class="closeta"
            href="javascript:void(0);"
          >
            <i
              :class="selectVal[tabInd][ind].val === '' ? 'glyphicon-sort' : (selectVal[tabInd][ind].val === 0 ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down')"
              class="glyphicon "
            >
            </i>
          </a>
          <!-- 不等于复选，不等于操作，不等于排序，不等于空显示按钮 -->
          <a
            v-show="basicInfo.listheadsearch[tabInd][ind] !== 'check' && basicInfo.listheadsearch[tabInd][ind] !== 'opt' && basicInfo.listheadsearch[tabInd][ind] !== 'rank' && basicInfo.listheadsearch[tabInd][ind] !== ''"
            @click="headSearchIconFn(ind)"
            :title="basicInfo.searchtxt"
            style="font-weight:normal;margin-left:5px;"
            class="closeta"
            href="javascript:void(0);"
          >
            <i
              :class="(basicInfo.listheadsearch[tabInd][ind] === 'input' || basicInfo.listheadsearch[tabInd][ind].type === 'input') ?  ' glyphicon-search' : (basicInfo.listheadsearch[tabInd][ind] === 'check' ? '' : 'glyphicon-filter')"
              class="glyphicon"
            >
            </i>
          </a>
          <div
            v-if="typeof basicInfo.listheadsearch[tabInd][ind] === 'object' && selectVal[tabInd][ind].show"
            class="small_popup"
          >
            {{basicInfo.searchtxt}} "{{item}}":
            <br>
            <select
              v-model="selectVal[tabInd][ind].val"
              @change="inputBlurFn(ind)"
            >
              <option
                v-for=" (sitem, sind) in basicInfo.listheadsearch[tabInd][ind]"
                :key="'opt_' + sind"
                :value="sitem.val"
                :disabled="sitem.disabled"
              >
                {{sitem.txt}}
              </option>
            </select>
          </div>
          <div
            v-if="(basicInfo.listheadsearch[tabInd][ind] === 'input' || basicInfo.listheadsearch[tabInd][ind].type === 'input') && selectVal[tabInd][ind].show"
            class="small_popup"
          >
            {{basicInfo.searchtxt}} "{{item}}":
            <br>
            <input
              v-model="selectVal[tabInd][ind].val"
              @blur="inputBlurFn(ind)"
              @keyup.enter="inputBlurFn(ind, 'enter')"
              :type="basicInfo.listheadsearch[tabInd][ind].typeVal ? basicInfo.listheadsearch[tabInd][ind].typeVal : 'text'"
            />
          </div>
          <span
            v-if="basicInfo.jsonopt[tabInd][ind] !== 'input' && basicInfo.jsonopt[tabInd][ind] !== 'check'"
            @click="deleteFn(ind)"
          >
            {{selectVal[tabInd][ind].txt === '...' ? '' : selectVal[tabInd][ind].txt}}
            <a
              v-show="selectVal[tabInd][ind].txt !== '...' && selectVal[tabInd][ind].txt !== ''"
              style="font-size:12px;"
              href="javascript:void(0)"
            >
              <sup>x</sup>
            </a>
          </span>
          <span
            v-if="basicInfo.jsonopt[tabInd][ind] === 'input'"
            @click="deleteFn(ind)"
          >
            {{selectVal[tabInd][ind].txt}}
            <a
              v-show="selectVal[tabInd][ind].txt !== '...' && selectVal[tabInd][ind].txt !== ''"
              style="font-size:12px;"
              href="javascript:void(0)"
            >
              <sup>x</sup>
            </a>
          </span>
        </th>
        <th
          v-for="(item, ind) in basicInfo.listhead[tabInd]"
          v-if="selectVal[tabInd].length <= 0"
          :key="'head_' + ind"
          :style="'width:'+ basicInfo.listpercent[tabInd][ind]"
          :title="item"
          class="classset"
        >
        {{item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, ind) in listArray"
        :key="'tr_' + ind"
      >
        <td
          v-for="(subitem, subind) in  basicInfo.jsonopt[tabInd]"
          v-if="subitem === 'check'"
          :key="'jsoncheck_' + subind"
          :style="'width:'+ basicInfo.listpercent[tabInd][subind]"
        >
          <input
            v-model="checkObj[item.id]"
            :disabled="forbidArr.indexOf(Number(item.id)) >= 0"
            @change="checkChangeFn(item.id)"
            type="checkbox"
          />
        </td>
        <td
          v-for="(subitem, subind) in  basicInfo.jsonopt[tabInd]"
          v-if="subitem !== 'opt' && subitem != 'check'"
          :key="'jsoncontent_' + subind"
          :style="'width:'+ basicInfo.listpercent[tabInd][subind]"
        >
          <div
            v-if="subitem.indexOf('HTML_') >= 0"
            v-html="item[subitem]"
            class="table-cell"
          >
          </div>
          <div
            v-else
            :title="item['Hover_' + subitem] ? item['Hover_' + subitem] : item[subitem]"
            class="table-cell"
          >
            {{item[subitem]}}
          </div>
        </td>
        <td
          v-for="(subitem, subind) in basicInfo.jsonopt[tabInd]"
          v-if="subitem === 'opt'"
          :key="'jsonopt_' + subind"
          :style="'width:'+ basicInfo.listpercent[tabInd][subind]"
        >
          <div
            class="table-cell"
          >
            <a
              v-for="(optitem, optind) in item.opt"
              :key="'optevent_' + optind"
              @click='optEventFn(ind, optitem.ev, item, [item.id])'
              :class="optitem.class"
              href="javascript:void(0)"
            >
              {{optitem.val}}
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data () {
    return {
      checkAll: false,
      checkObj: {}
    }
  },
  props: {
    forbidArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    listArray: { // 分页数据
      type: Array,
      default: () => {
        return []
      }
    },
    initCheckArray: { // 分页数据
      type: Array,
      default: () => {
        return []
      }
    },

    tabInd: { // 配置项索引
      type: Number,
      default: 0
    },

    basicInfo: { // 配置信息
      type: Object,
      default: () => {
        return {}
      }
    },

    selectVal: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    checkChangeFn: function (id) {
      // 判定是否需要全选
      var count = 0
      for (var key in this.checkObj) { // 遍历当前对象与当前当前数组比对
        for (var i = 0; i < this.listArray.length; i++) {
          if (key.toString() === this.listArray[i].id.toString() && this.checkObj[key]) {
            count++
          }
        }
      }
      if (count === this.listArray.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.$emit('check-val-fn', { checkval: this.checkObj, chckall: this.checkAll })
    },
    deleteFn: function (ind) {
      this.$emit('delete-fn', { ind: ind })
    },
    checkAllFn () {
      for (var i = 0; i < this.listArray.length; i++) {
        if (this.checkAll) {
          this.$set(this.checkObj, this.listArray[i].id, true)
          this.checkAll = true
        } else {
          this.$set(this.checkObj, this.listArray[i].id, false)
          this.checkAll = false
        }
      }
      this.$emit('check-all-fn', { checkall: this.checkAll, checkval: this.checkObj })
    },
    optEventFn (ind, ev, item, id) {
      this.$emit('opt-event-fn', { ind: ind, ev: ev, item: item, id: id })
    },
    headSearchIconFn (ind) {
      this.$emit('head-search-icon-fn', { ind: ind })
    },
    rankFn (ind, val) {
      if (val === '') {
        this.selectVal[this.tabInd][ind].val = 0
      } else if (val === 0) {
        this.selectVal[this.tabInd][ind].val = 1
      } else if (val === 1) {
        this.selectVal[this.tabInd][ind].val = ''
      }
      this.$emit('head-search-icon-fn', { ind: ind, rankFlag: this.selectVal[this.tabInd][ind].val, type: 'rank' })
    },
    inputBlurFn: function (ind, enterflag) {
      this.$emit('input-blur-fn', { ind: ind, enterflag: enterflag })
    },
    closeSet (param, idarr, fn) {
      let tempDom = param
      if (!tempDom) {
        return false
      }
      let j = 0
      let resflag = false
      if (tempDom.nodeName.toLowerCase() === 'body' || tempDom.nodeName.toLowerCase() === 'document' || tempDom.nodeName.toLowerCase() === 'html') {
        if (typeof fn === 'function') {
          fn(resflag)
        }
      } else {
        for (var i = 0; i < idarr.length; i++) {
          if (resflag) {
            break
          }
          if (tempDom.className === '') {
            break
          }
          if (tempDom.className === idarr[i]) {
            ++j
            resflag = true
            break
          }
        }
        if (j === 0 && !resflag) {
          tempDom = tempDom.parentNode
          this.closeSet(tempDom, idarr, fn)
        } else {
          if (typeof fn === 'function') {
            fn(resflag)
          }
        }
      }
    },
    setInitCheckVal (id) {
      if (this.initCheckArray.length === 0) {
        this.checkObj = {}
        this.checkAll = false
      } else {
        this.checkAll = false
        // for (let keys in this.checkObj) {
        //   this.$set(this.checkObj, keys, false)
        // }
        for (let item = 0; item < this.initCheckArray.length; item++) {
          this.$set(this.checkObj, this.initCheckArray[item], true)
        }
        let count = 0
        for (var i = 0; i < this.listArray.length; i++) {
          if (this.checkObj[this.listArray[i].id]) {
            count++
          }
        }
        if (count === this.listArray.length && this.listArray.length !== 0) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
      if (id) {
        delete this.checkObj[id]
      }
      this.$emit('init-check-result', { checkval: this.checkObj })
    }
  },
  mounted () {
    if (this.basicInfo.jsonopt[this.tabInd].toString().indexOf('check,') >= 0) {
      this.setInitCheckVal()
    }
    var that = this
    document.addEventListener('click', function (e) {
      var ev = window.event || e
      that.closeSet(ev.target, ['classset'], function (flag) {
        if (!flag) { // 关闭下拉菜单列表
          that.$emit('head-search-icon-fn', { ind: null })
        }
      })
    })
  },
  watch: {
    listArray: function (newval, oldval) {
      if (this.basicInfo.jsonopt[this.tabInd].toString().indexOf('check,') >= 0) {
        this.checkAll = false
        let count = 0
        for (var i = 0; i < this.listArray.length; i++) {
          if (this.checkObj[this.listArray[i].id]) {
            count++
          }
        }
        if (count === this.listArray.length && this.listArray.length !== 0) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      }
    }
  }
}
</script>
<style>
.text_mouseover { background-color:#ffff99; }
.text_input { outline:none; }

.small_popup {position:absolute;background-color:#ffffbb;padding:0px 5px 3px;border:1px solid #aaaa66;}

table.end-data-table thead th { white-space:nowrap;}
table tbody td { word-break: break-all}
</style>
