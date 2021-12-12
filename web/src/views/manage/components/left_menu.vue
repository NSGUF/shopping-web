<template>
  <div class="menu-left">
    <div class="menu-page__top">
      你好 {{ phone }}
      <el-button @click="onLogout" type="text">退出登陆</el-button>
    </div>
    <div class="menu-page__bottom">
      <el-menu
        mode="vertical"
        theme="dark"
        :default-active="$route.path"
        :style="{ width: 180 + 'px' }"
      >
        <router-link to="/manage/product">
          <el-menu-item>
            <span slot="title">管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
import { logout } from "../../../api/login";
import { MUTATIONS_KEYS } from "../../../const/vuex";
const user = namespace("user");

@Component({
  name: "LeftMenu",
})
export default class LeftMenu extends Vue {
  @user.Getter("phone") phone!: string;
  @user.Mutation(MUTATIONS_KEYS.logout)
  mutationLogout!: Function;

  async onLogout() {
    let { data, message } = await logout();
    if (data.success) {
      this.$message(message);
      this.mutationLogout();
      this.$router.push("/login");
    }
  }
}
</script>


<style lang="less" scoped>
.menu-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}

.menu-page {
  &__top {
    width: 180px;
    height: 48px;
    
    box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);
  }
  &__bottom {
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1;
    margin-top: 3px;
    z-index: 10;
    box-shadow: 0 0 10px 0 rgba(230, 224, 224, 0.5);
  }
}
</style>
