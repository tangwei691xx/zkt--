<template>
  <ul class="nav zkt-nav-tabs" v-if="tabs.length > 0">
    <li
      :key="ind"
      :class="value === ind ? 'active' : ''"
      v-for="(item, ind) in tabs"
      :style="'width:' + 100 / tabs.length + '%'"
      @click="clickEvent(ind)"
    >
      <a href="javascript:void(0)">{{ item[tabsInfo.label] }}</a>
      <div class="arr" v-show="value === ind && ind !== 0"></div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default() {
        return 0;
      },
    },
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    tabsInfo: {
      type: Object,
      default() {
        return {
          label: "label",
          value: "value",
        };
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    clickEvent(ind) {
      this.$emit("input", ind);
      this.$emit("hashChange", ind);
    },
  },
};
</script>
<style scoped>
.zkt-nav-tabs {
  overflow: hidden;
}
.zkt-nav-tabs > li.active {
  background: #4c68ef;
}
.zkt-nav-tabs > li.active::before {
  position: absolute;
  top: 0;
  right: -20px;
  z-index: 2;
  content: "";
  border-style: solid;
  border-width: 20px;
  border-top-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #4c68ef;
}
.zkt-nav-tabs > li:last-child::before {
  display: none;
}
.zkt-nav-tabs > li:last-child::after {
  display: none;
}
.zkt-nav-tabs > li::before {
  position: absolute;
  top: 0;
  right: -20px;
  z-index: 2;
  content: "";
  border-style: solid;
  border-width: 20px;
  border-top-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: #edf0fd;
}
.zkt-nav-tabs > li::after {
  position: absolute;
  top: 0;
  right: -40px;
  z-index: 11;
  content: "";
  border-style: solid;
  border-width: 20px;
  border-top-color: #edf0fd;
  border-right-color: #edf0fd;
  border-bottom-color: #edf0fd;
  border-left-color: #fff;
}
.zkt-nav-tabs > li {
  position: relative;
  float: left;
  height: 40px;
  color: #333;
  background-color: #edf0fd;
}
.zkt-nav-tabs > li .arr {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 21;
  border-style: solid;
  border-width: 20px;
  border-top-color: #4c68ef;
  border-right-color: #4c68ef;
  border-bottom-color: #4c68ef;
  border-left-color: #fff;
}
.zkt-nav-tabs > li > a {
  z-index: 22;
  padding: 10px 20px !important;
  margin-right: 2px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.42857143;
  color: #333;
  text-align: center;
  cursor: pointer !important;
  border: 1px solid transparent;
}
.zkt-nav-tabs > li > a:focus,
.zkt-nav-tabs > li > a:hover {
  font-size: 14px;
  color: #333;
  cursor: default;
  background-color: transparent !important;
}
.zkt-nav-tabs > li.active > a,
.zkt-nav-tabs > li.active > a:focus,
.zkt-nav-tabs > li.active > a:hover {
  font-size: 14px;
  color: #fff;
  cursor: default;
  background-color: transparent !important;
  border-bottom-color: transparent;
}
.zkt-nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.zkt-nav-tabs.nav-justified > li {
  float: none;
}
.zkt-nav-tabs.nav-justified > li > a {
  margin-bottom: 5px;
  text-align: center;
}
.zkt-nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .zkt-nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .zkt-nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }
}
.zkt-nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 4px;
}
.zkt-nav-tabs.nav-justified > .active > a,
.zkt-nav-tabs.nav-justified > .active > a:focus,
.zkt-nav-tabs.nav-justified > .active > a:hover {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .zkt-nav-tabs.nav-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 4px 4px 0 0;
  }
  .zkt-nav-tabs.nav-justified > .active > a,
  .zkt-nav-tabs.nav-justified > .active > a:focus,
  .zkt-nav-tabs.nav-justified > .active > a:hover {
    border-bottom-color: #fff;
  }
}
</style>
