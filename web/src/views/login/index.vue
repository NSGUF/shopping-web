<template>
  <div class="login">
    <header class="login-header">
      <h1>购物网站登陆界面</h1>
    </header>
    <div class="login-content">
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            type="phone"
            placeholder="请输入手机号"
            prop="phone"
            v-model="formData.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prop="password"
            placeholder="请输入密码"
            v-model="formData.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="login-button"
        type="primary"
        @click="onSubmit"
        :loading="loading"
        >登陆</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { login } from "../../api/login";
import { RoleType } from "../../const";
import { MUTATIONS_KEYS } from "../../const/vuex";
import { namespace } from "vuex-class";
const user = namespace("user");

@Component({
  name: "Login",
})
export default class Login extends Vue {
  @Ref("form")
  readonly form!: ElForm;

  @user.Mutation(MUTATIONS_KEYS.updateUserInfo)
  mutationUpdateUserInfo!: Function;

  loading = false;

  formData = {
    phone: "13333333333",
    password: "123123",
  };
  rules = {};

  created() {
    this.rules = {
      phone: [
        {
          required: true,
          message: "请输入正确的手机号",
          pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          trigger: "change",
        },
      ],
    };
  }

  onSubmit() {
    this.form.validate(async (valid) => {
      if (valid) {
        this.loading = true;
        let { data } = await login(this.formData);
        this.loading = false;
        let userInfo = {
          phone: this.formData.phone,
          isAdmin: data?.role === RoleType.admin,
        };
        this.mutationUpdateUserInfo(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$router.push(data?.role === RoleType.member ? "/" : "/manage");
      }
    });
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-header {
    text-align: center;
  }

  &-button {
    margin: 36px auto;
    display: block;
    width: 400px;
  }
}
</style>
