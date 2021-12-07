<template>
    <div class="login">
        <header class="login-header">
            <h1>购物网站</h1>
        </header>
        <div class="login-content">
            <el-form ref="form" :model="formData" label-width="60px">
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { MUTATIONS_KEYS } from "../../const/vuex";

@Component({
    name: 'LoginIndex',
})
export default class LoginIndex extends Vue {
  @Ref('form')
  readonly form!: ElForm;

  loading = false;

  formData = {
    username: "admin",
    password: "admin"
  };

  rules = {
    username: [{
        required: true,
        message: "请输入账号",
        trigger: "blur"
      }
    ],
    password: [{
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }]
  };

  onSubmit() {
    this.form.validate(valid => {
      if (valid) {
        this.loading = true;
        // TODO 后端接口判断
        if (this.formData.username == "admin" && this.formData.password == "admin") {
          this.loading = false;
          this.$store.commit(MUTATIONS_KEYS.updateUserInfo, {
            isLogin: true,
            username: this.formData.username
          });
          this.$message.success("登入成功");
          this.$router.push({ path: "/index" });
        } else {
          this.loading = false;
          this.$message.error("用户名或密码错误，登入失败");
        }
      }
    });
  }
}
</script>

<style lang="less" scoped>
.login-header {
  text-align: center;
}
</style>
