<template>
  <div>
    <h4 class="col-sm-12 text-primary">
      权限设置
      <small class="text-primary cusor" @click="checkAllFn">全选</small>
      <small class="text-primary">/</small>
      <small class="text-primary cusor" @click="checkDepartMent">全不选</small>
    </h4>
    <div
      class="col-sm-12"
      v-if="filterPermissions && filterPermissions.length > 0"
      style="max-height: 500px; overflow-y: auto; border: 1px solid #ccc"
    >
      <zkt-tree
        :ref="treeRef"
        :show-checkbox="true"
        :default-expand-all="true"
        :is-linked="false"
        systemCode="zktPermission"
        :default-checked-keys="checkedKeys"
        :data="filterPermissions"
        :options="treeOptions"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "permissionsTree",
  model: {
    prop: "checkedPermissions",
    event: "updateUserPermissions",
  },
  props: {
    treeRef: {
      type: String,
      default: "treeRef",
    },
    type: {
      type: String,
      required: true,
    },
    permissions: {
      type: Array,
      default: () => [],
    },
    checkedPermissions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkedKeys: [],
      // eb tree 和 mis tree 的权限配置是一样的
      treeOptions: {
        dataType: "tree",
        idKey: "menuId",
        levelKey: "_level",
        childrenKey: "subList",
        sortKey: "sort",
        labelKey: "menuName",
      },
      checkAll: [],
      checkNone: [],
    };
  },
  computed: {
    filterPermissions() {
      let temp = this.stringifyTreeKey(this.permissions);
      if (temp && temp.length > 0) {
        this.deleteMenuRight(temp);
        this.formatTree(temp,(item)=>{
          if(item.menuType===2){
            item.menuName=`${item.menuName}【权限】`;
          }
        })
      }
      return temp;
    },
  },
  watch: {
    filterPermissions() {
      if (this.filterPermissions.length) {
        this.changeDisabled();
      }
    },
    checkedKeys(newVal, oldVal) {
      // 给异常数据擦屁股：多个权限id对应一个permission，删除一个时将所有的都删除了
      let changeStatus, changeCheckedKeys;
      if (newVal.length > oldVal.length) {
        changeStatus = "ADD";
        changeCheckedKeys = newVal.filter((v) => !oldVal.includes(v));
      } else {
        changeStatus = "DELETE";
        changeCheckedKeys = oldVal.filter((v) => !newVal.includes(v));
      }
      if (
        this.type === "eb" &&
        this.checkAll.length === this.checkedKeys.length
      ) {
        this.$emit("updateUserPermissions", ["all"]);
        return;
      }
      const permissionsList = this.$refs[this.treeRef].listTree._list;
      const oldEmitPermissions = oldVal.map(
        (menuId) =>
          permissionsList.find((fp) => fp.menuId === menuId).permission
      );
      const emitPermissions = this.checkedKeys.map(
        (menuId) =>
          permissionsList.find((fp) => fp.menuId === menuId).permission
      );
      const changeEmitPermissions = changeCheckedKeys.map(
        (menuId) =>
          permissionsList.find((fp) => fp.menuId === menuId).permission
      );
      if (changeStatus === "DELETE") {
        this.$emit(
          "updateUserPermissions",
          this.useless(
            emitPermissions.filter((p) => !changeEmitPermissions.includes(p))
          )
        );
      } else {
        this.$emit("updateUserPermissions", this.useless(emitPermissions));
      }

      console.log("oldEmitPermissions", oldEmitPermissions);
      console.log("emitPermissions", emitPermissions);
    },
  },
  created() {
    if (this.filterPermissions.length) {
      this.changeDisabled();
    }
  },
  methods: {
    formatTree(data,callback){
      if(!Array.isArray(data)) return;
      if(typeof callback!=='function') return;
      data.forEach(item=>{
        callback(item);
        this.formatTree(item.subList,callback);
      })
    },
    // tree id是数字时，树顺序会改变，将id改成字符串
    stringifyTreeKey(permissions) {
      if (!permissions) return [];
      return permissions.map((p) => ({
        ...p,
        menuId: `.${p.menuId}`,
        subList: p.subList ? this.stringifyTreeKey(p.subList) : [],
      }));
    },
    handleCheckChange(arr) {
      console.log("handleCheckChange arr", arr);
      this.checkedKeys = JSON.parse(JSON.stringify(arr));
    },
    checkDepartMent() {
      this.checkedKeys = JSON.parse(JSON.stringify(this.checkNone));
      this.$nextTick(() => {
        this.treeInit();
      });
    },
    checkAllFn() {
      this.checkedKeys = JSON.parse(JSON.stringify(this.checkAll));
      this.$nextTick(() => {
        this.treeInit();
      });
    },
    changeDisabled() {
      console.log("fn changeDisabled");
      let blankRight = [];
      this.checkAll = [];
      const { checkedPermissions } = this;
      this.matchRight(this.filterPermissions, blankRight);
      if (
        checkedPermissions &&
        checkedPermissions.length &&
        checkedPermissions[0] === "all"
      ) {
        this.checkedKeys = JSON.parse(JSON.stringify(this.checkAll));
      }
      this.$nextTick(() => {
        this.treeInit();
      });
    },
    // node 点击
    handleNodeClick(node) {
      console.log("fn handleNodeClick", node);
    },
    treeInit() {
      this.$refs[this.treeRef] &&
        this.$refs[this.treeRef].init &&
        this.$refs[this.treeRef].init();
    },
    deleteMenuRight(data) {
      for (let item = 0; item < data.length; item++) {
        if (
          data[item] &&
          data[item].subList &&
          !data[item].subList.length &&
          (!data[item].permission ||
            data[item].permission.indexOf("useless_") >= 0)
        ) {
          data.splice(item, 1);
          item--;
        }
        if (data[item] && data[item].subList && data[item].subList.length) {
          this.deleteMenuRight(data[item].subList);
        }
      }
      return data;
    },
    // 忽略 useless_ 开头的权限
    useless(data) {
      for (let item = 0; item < data.length; item++) {
        if (data[item].indexOf("useless_") >= 0) {
          data.splice(item, 1);
          item--;
        }
      }
      return data;
    },
    matchRight(data, blankRight) {
      data.map((item) => {
        if (item.disabled) {
          delete item.disabled;
        }
        item.disabled = false;
        if (item.permission === null || item.permission === "") {
          item.permission = "useless_" + Math.random(0, 1);
        }
        if (item.menuName.indexOf(item.menuSubTitle) < 0 && item.menuSubTitle) {
          item.menuName = item.menuName + "(" + item.menuSubTitle + ")";
        }
        delete item.parentId;
        this.checkAll.push(item.menuId);
        blankRight &&
          blankRight.map((ditem) => {
            if (ditem === item.permission) {
              item.disabled = true;
              item._checked = true;
              this.checkedKeys.push(ditem);
              this.checkNone.push(ditem);
            }
          });
        this.checkedPermissions.map((ditem) => {
          if (ditem === item.permission) {
            item._checked = true;
            this.checkedKeys.push(item.menuId);
          }
        });
        if (item.subList && item.subList.length) {
          this.matchRight(item.subList, blankRight);
        }
      });
      return data;
    },
  },
};
</script>

<style scoped>
.cusor {
  cursor: pointer;
}
</style>
