<template>
<div class="end-pager">
  <!--
    分页规则：
    1. 小于pageShow的分页，全部展示
    2. 大于等于halfPageShow分页，展示前面三个，后面三个，中间。。。
    3. 前面的三个是变化的，随着分页的增加，展示分页后两页，以及。。。
    4. 跳转分页，number类型，需做最大值判断
    5. 增加首页和尾页功能

  -->
  <a
    v-show="pageVal > 1 && firstLast"
    @click="jumpToFn('first')"
    class="normal"
    href="javascript:void(0)"
  >
    {{pageBasicInfo.first}}
  </a>
  <a
    v-show="pageVal > 1 && prevNext"
    @click="jumpToFn('prev')"
    class="normal"
    href="javascript:void(0)"
  >
    {{pageBasicInfo.prev}}
  </a>
  <!-- 总分页小于要展示的分组页码综合，全部展示 -->
  <a
    :key="item"  v-for="item in misNum"
    v-if="totalPage <= pageShow"
    @click="jumpToFn(item)"
    :class="pageVal !== item ? 'normal' : 'current'"
    href="javascript:void(0)"
  >
    {{item}}
  </a>
  <!--
    当总页码大于要显示的总页码时，
    并且循环页码大于当前页码，
    并且总页码减去展示总页码的一半的差值大于等于当前分页与展示总页码的一半的值的合

    页码初始位置小于总页码减去展示总页码的一半的差值
    v-for="item in (pageVal + halfPageShow - 1)"
    v-if="totalPage > pageShow && && ((totalPage - halfPageShow) >= pageVal + halfPageShow)"
  -->
  <a
    v-for="item in halfPageShow"
    v-if="totalPage > pageShow && ((totalPage - halfPageShow) >= pageVal + halfPageShow)"
    :key="item"
    @click="jumpToFn(item + pageVal -1 )"
    :class="pageVal !== (item + pageVal - 1) ? 'normal' : 'current'"
    href="javascript:void(0)"
  >
    {{item + pageVal - 1}}
  </a>
  <!--
    当前总页码大于要显示的总页码时，
    并且当前循环页码大于总页码减去要显示页码的总和，
    并且当前页码与展示页码的一般的合大于总页码减去展示总页码的一半的差值

    页码初始位置大于总页码减去展示总页码的一半的差值
  -->
  <a
    v-for="item in halfPageShow"
    v-if="firstNum"
    :key="item"
    @click="jumpToFn(item + firstNum)"
    :class="pageVal !== item + firstNum ? 'normal' : 'current'"
    href="javascript:void(0)"
  >
    {{item + firstNum}}
  </a>
  <span
    v-show="totalPage > pageShow && pageVal <= totalPage - Math.round(pageShow/2) * 2"
    style="cursor: text;"
    class="dots normal"
  >
    ...
  </span>
  <a
    v-for="item in halfPageShow"
    v-if="totalPage > pageShow"
    :key="item"
    @click="jumpToFn(item + lastNum)"
    :class="pageVal !== item + lastNum ? 'normal' : 'current'"
    href="javascript:void(0)"
  >
    {{item + lastNum}}
  </a>
  <a
    v-show="pageVal < totalPage && prevNext"
    @click="jumpToFn('next')"
    class="normal"
    href="javascript:void(0)"
  >
    {{pageBasicInfo.next}}
  </a>
  <a
    v-show="pageVal < totalPage && firstLast"
    @click="jumpToFn('last')"
    class="normal"
    href="javascript:void(0)"
  >
    {{pageBasicInfo.last}}
  </a>
  <span
    v-show="txt"
    class="end-total"
  >
    {{pageBasicInfo.txtinfo[0]}}{{pageSize}}{{pageBasicInfo.txtinfo[1]}}{{pageBasicInfo.txtinfo[2]}}{{totalNum}}{{pageBasicInfo.txtinfo[1]}}
    </span>
  <input
    v-show="totalPage > pageShow && jump"
    v-model="jumpPageVal"
    type="number"
    style="border-radius: 6px 0 0 6px !important;;margin-right: 0;min-width:50px"
    :style="'width:'+jumpPageVal.toString().length * 15 + 'px'"
    min="1"
    class="normal input"
  />
  <span
    v-show="totalPage > pageShow && jump"
    @click="jumpToFn('jump')"
    class='jump'
  >
    {{pageBasicInfo.jump}}
  </span>
</div>
</template>
<script>
export default {
  data () {
    return {
      jumpPageVal: 1,
      halfPageShow: 4,
      lastNum: 0,
      firstNum: 0,
      misNum: 0
    }
  },
  created () {
    this.init()
  },
  props: {
    firstLast: { // 首页末页开关
      type: Boolean,
      default: true
    },
    prevNext: { // 上一页下一页
      type: Boolean,
      default: true
    },
    jump: { // 跳转开关
      type: Boolean,
      default: true
    },
    txt: { // 文本开关
      type: Boolean,
      default: true
    },
    pageVal: { // 分页页码
      type: Number,
      default: 1
    },
    totalPage: { // 总页码
      type: Number,
      default: 0
    },
    pageShow: { // 显示几个页码
      type: Number,
      default: 8
    },
    totalNum: { // 总条数
      type: Number,
      default: 0
    },
    pageSize: { // 分页条数
      type: Number,
      default: 10
    },
    pageBasicInfo: { // 配置信息
      type: Object,
      default () {
        return {
          prev: '上一页',
          next: '下一页',
          txtinfo: ['每页', '条', '，共计'],
          jump: '跳转到',
          first: '首页',
          last: '末页'
        }
      }
    }
  },
  methods: {
    init () {
      this.totalPage = Math.ceil(this.totalNum / this.pageSize)
      this.halfPageShow = this.pageShow ? Math.round(this.pageShow / 2) : 4
      this.jumpPageVal = this.pageVal
      if (this.totalPage > this.pageShow) {
        this.lastNum = this.totalPage - this.halfPageShow
      } else {
        this.lastNum = 0
      }
      if (this.totalPage > this.pageShow && this.pageVal > (this.totalPage - this.pageShow) && (this.pageVal + this.halfPageShow > this.totalPage - this.halfPageShow)) {
        this.firstNum = this.totalPage - this.pageShow
      } else {
        this.firstNum = 0
      }
      if (this.totalPage <= this.pageShow) {
        this.misNum = this.totalPage
      } else {
        this.misNum = 0
      }
    },
    jumpToFn (item) {
      let temp = 1
      if (typeof item === 'string') {
        if (item === 'next') {
          temp = this.pageVal + 1
        } else if (item === 'prev') {
          temp = this.pageVal - 1
        } else if (item === 'first') {
          temp = 1
          // console.log('第一页')
        } else if (item === 'last') {
          temp = this.totalPage
          // console.log('最后一页')
        } else if (item === 'jump') {
          if (parseInt(this.jumpPageVal) > this.totalPage || this.jumpPageVal === '') {
            window.swal({
              title: '请输入正确的页码',
              timer: 1500
            })
            this.jumpPageVal = ''
          } else {
            temp = parseInt(this.jumpPageVal)
          }
        }
      } else {
        if (item === this.pageVal) {
          temp = this.pageVal
          // console.log('点击的是当前分页', item)
        } else {
          // console.log('点击的是其他分页，', item)
          temp = item
        }
      }
      this.jumpPageVal = temp
      this.$emit('page-list-fn', { page: temp })
    }
  },
  watch: {
    totalNum () {
      if (this.totalNum >= 0) {
        this.init()
      }
    },
    pageVal () {
      if (this.totalNum >= 0) {
        this.init()
      }
    }
  }
}
</script>
<style >
.end-pager{
  float: left;
  width: 100%;
}
.end-pager a ,.end-pager span{
  display:inline-block;
  background-color: #FAFAFA;
  border-color: #6FAED9;
  color: #2283C5;
  padding: 6px 10px;
  line-height: 1;
  text-decoration: none;
  border:1px solid #ccc;
  border-radius:6px;
}

.end-pager a:hover,.end-pager .current { background-color:#6FAED9; border-color:#6FAED9; color:white; }
.end-pager span.dots { border-color:transparent; background-color:transparent; color:#333; }
.end-pager .end-total{background-color: white;color: #2283C5;border: none;}
.end-pager .jump{
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  float: left;
  margin-left: -5px;
}
.end-pager .normal, .end-pager .current, .end-pager .end-total{
  cursor: pointer;
  margin-right: 3px;
  float: left;
  outline: none;
}
.end-pager .input{
  border: 1px solid #ccc;
  height: 28px;
}
.end-pager .end-total{
  cursor: text;
}
</style>
