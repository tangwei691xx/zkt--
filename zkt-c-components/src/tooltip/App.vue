<template>
  <div id="app" class="app-content">
    <section>
      <div class="com-wrapper">
        <com
          background="white"
          content="提示窗宽度默认150px"
          placement="top"
          :always="always||false">
          <div class="btn btn-default">上</div>
        </com>
      </div>
      <div class="com-wrapper">
        <com
          background="white"
          content="弹窗显示时间300ms"
          placement="right"
          :always="always||false">
          <div class="btn btn-default">右</div>
        </com>
      </div>
    </section>
    <section>
      <div class="com-wrapper">
        <com
          content="越出边界我可不管哦"
          placement="left"
          background="white"
          tip-width="50"
          :always="always||false">
          <div class="btn btn-default">左</div>
        </com>
      </div>
      <div class="com-wrapper">
        <com
          content="<div onclick='alert(1)'>xss攻击！！</div>"
          background="white"
          placement="bottom"
          :always="always||false">
          <div class="btn btn-default">下</div>
        </com>
      </div>
    </section>
    <section>
      <div class="com-wrapper">
        <com
          content="点击有惊喜"
          placement="top"
          :always="always||false"
          @click="comClick()">
          <div>
            <h1>标题</h1>
            <div>里面内容随意放</div>
            <b>内容可点,tip不能的</b>
          </div>
        </com>
      </div>
      <div class="com-wrapper">
        <com
          content="详细参数见readme"
          placement="right"
          :always="always||true"
          @click="comClick()">
          <div>
            that's all
          </div>
        </com>
      </div>
    </section>
    <section>
      <div class="com-wrapper">
        <com
          :content="htmlContent"
          background="white"
          placement="bottom"
          :always="true">
          <div>
            绑定html 已经过滤xss
          </div>
        </com>
      </div>
      <div class="com-wrapper">
        <com
          :content="htmlContent2"
          background="white"
          placement="right"
          tip-width="auto"
          :always="always||false"
          @click="comClick()">
          <div>
            左右tipWidth可以auto,上下只能固定值
          </div>
        </com>
      </div>
    </section>
    <section>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:left="'<div style=\'color:red\'>123</div>'">
          左-tooltip
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:top="'<div style=\'color:green\'>123</div>'">
          上-tooltip
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:bottom="'<div style=\'color:blue\'>123</div>'">
          下-tooltip
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:right="'<div style=\'color:yellow\'>123</div>'">
          右-tooltip
        </div>
      </div>
    </section>
    <section>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:left="{
          content: '<div>123</div>',
          type: 'popover'
        }">
          左-popover
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:top="{
          content: '<div>123</div>',
          type: 'popover'
        }">
          上-popover
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:bottom="{
          content: '<div>123</div>',
          type: 'popover'
        }">
          下-popover
        </div>
      </div>
      <div class="com-wrapper">
        <div class="btn btn-success" v-tooltip:right="{
          content: '<div>123</div>',
          type: 'popover'
        }">
          右-popover
        </div>
      </div>
      <div class="com-wrapper">
        <div class="">
          <div class="outer" v-tooltip:right="{
            content: '<div>123</div>',
            type: 'popover',
            margin: 100
          }">
            右-popover
            <div class="inner">inner</div>
          </div>
        </div>
      </div>
      <div class="com-wrapper">
        <div class="">
          <div class="outer" v-tooltip:bottom="{
            content: '<div>slkdjflksjdflkjak;lsdjflkjasdl;fk阿卡丽时间到了付款建设路口；大姐夫；拉克丝京东方数量等会计法拉克丝京东方离开；加速度数量等会计分录卡世纪东方；卡拉坚实的<br>234234</div>',
            contentStyle: 'text-align:left;',
            warpStyle: 'max-width:500px;'
          }">
            右-popover
            <div class="inner">inner</div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div>
        <span v-tooltip:bottom="{
          content: '<div>slkdjflksjdflkjak;lsdjflkjasdl;fk阿卡丽时间到了付款建设路口；大姐夫；拉克丝京东方数量等会计法拉克丝京东方离开；加速度数量等会计分录卡世纪东方；卡拉坚实的<br>234234</div>',
          contentStyle: 'text-align:left;',
          warpStyle: 'max-width:500px;'
        }">普通文本长长长长长长长长长长长长长长长长长长</span>
      </div>
    </section>
  </div>
</template>

<script>
import Com from './components/index.vue'
export default {
  name: 'app',
  components: {
    Com
  },
  data () {
    return {
      inputVal: '',
      msg: 'Welcome to Your Vue.js App',
      always: false,
      htmlContent: `
        <scr` + `ipt>alert(123)</scr` + `ipt>
      `,
      htmlContent2: `
        <div class="panel panel-default">
      <!-- Default panel contents -->
      <div class="panel-heading">Panel heading</div>
      <div class="panel-body">
        <p>Some default panel</p>
      </div>

      <!-- Table -->
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
      `
    }
  },
  methods: {
    comClick () {
      alert('你点啥')
    }
  }
}
</script>

<style lang="less">
.app-content {
  height: 600px;
  overflow: auto;
  border: 1px solid #ddd;
  margin: 50px;
  margin-left: 200px;
  position: absolute;
  .com-wrapper {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    .outer {
      width: 100px;
      height: 100px;
      display: inline-block;
      background: #ddd;
      .inner {
        width: 50px;
        height: 50px;
        display: inline-block;
        background: lightblue;
      }
    }
  }
}
</style>
