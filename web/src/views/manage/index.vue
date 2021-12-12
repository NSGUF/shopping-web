<template>
  <div class="manage">
    <left-menu></left-menu>
    <div class="manage-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LeftMenu from "./components/left_menu.vue";

@Component({
  name: "Manage",
  components: {
    LeftMenu,
  },
})
export default class Manage extends Vue {}
</script>
<style scoped lang='less'>
.manage {
  &-right {
    overflow: auto;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f6f7fc;
    left: 180px;
  }
}
</style>
