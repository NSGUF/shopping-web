<template>
  <div class="login">
    <header class="login-header">
      <h1>购物网站注册界面</h1>
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
        <el-form-item prop="password_confirm">
          <el-input
            prop="password_confirm"
            placeholder="请输入确认密码"
            v-model="formData.password_confirm"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select
            v-model="formData.role"
            placeholder="请选择角色"
            class="login-role"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button
        class="login-button"
        type="primary"
        @click="onSubmit"
        :loading="loading"
        >注册</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { RoleOptions } from "../../const";
import { register } from "../../api/login";

@Component({
  name: "Register",
})
export default class Register extends Vue {
  @Ref("form")
  readonly form!: ElForm;

  loading = false;

  formData = {
    phone: "",
    password: "",
    password_confirm: "",
    role: "",
  };

  options = Object.freeze(RoleOptions);

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
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请输入密码"));
            } else {
              if (this.formData.password !== "") {
                this.form.validateField("password_confirm");
              }
              callback();
            }
          },
        },
      ],
      password_confirm: [
        {
          message: "请输入确认密码",
          trigger: "change",
          validator: (rule, value, callback) => {
            if (value === "") {
              callback(new Error("请输入确认密码"));
            } else if (value !== this.formData.password) {
              callback(new Error("两次输入密码不一致!"));
            } else {
              callback();
            }
          },
        },
      ],
      role: [{ required: true, message: "请选择角色", trigger: "change" }],
    };
  }

  onSubmit() {
    this.form.validate(async (valid) => {
      if (valid) {
        this.loading = true;
        let { data } = await register(this.formData);

        this.loading = false;
        if (data?.success) {
          this.$message.success("注册成功");
          this.$router.push("/login");
          return;
        }
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
  &-role {
    display: block;
  }
}
</style>
