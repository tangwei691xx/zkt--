<template>
  <div>
    <PermissionTree
      type="eb"
      treeRef="ebTree"
      :permissions="ebPermissions"
      v-model="userEbPermissions"
    />
  </div>
</template>

<script>
import PermissionTree from "./components/permissionTree";
import { ebPermissions } from "./assets/ebPermission";
export default {
  components: {
    PermissionTree,
  },
  data() {
    return {
      ebPermissions,
      userEbPermissions: ["admin"],
    };
  },
  watch: {
    userEbPermissions(val) {
      console.log("userEbPermissions", val);
    },
  },
};
</script>

<style>
</style>