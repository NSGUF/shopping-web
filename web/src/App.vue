<template>
  <router-view />
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Component, Vue } from "vue-property-decorator";
import { MUTATIONS_KEYS } from "./const/vuex";

const user = namespace("user");
@Component({
  name: "App",
})
export default class App extends Vue {
  @user.Mutation(MUTATIONS_KEYS.updateUserInfo)
  mutationUpdateUserInfo!: Function;

  @user.Getter("isAdmin") isAdmin!: boolean;

  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        let userInfoJson = JSON.parse(userInfo);
        this.mutationUpdateUserInfo(userInfoJson);
        if (!userInfoJson.phone) {
          this.$router.push("/login");
        } else if (!userInfoJson.isAdmin) {
          this.$router.push("/shopping");
        } else {
          this.$router.push("/manage");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
