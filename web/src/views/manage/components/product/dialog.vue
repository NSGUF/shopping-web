<template>
  <el-dialog
    :title="title"
    :visible.sync="isVisible"
    @closed="onClose"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px;">
      <el-form-item prop="title" label="标题：">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item prop="detail" label="详情：">
        <el-input type="textarea" v-model="formData.detail"></el-input>
      </el-form-item>
      <el-form-item prop="price" label="价格：">
        <el-input v-model="formData.price"></el-input>
      </el-form-item>
      <el-form-item prop="total" label="库存：">
        <el-input v-model="formData.total"></el-input>
      </el-form-item>
      <el-form-item prop="picture" label="图片：">
        <el-upload
          action="/api/img"
          :on-success="onSuccess"
          :on-remove="onRemove"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="isVisible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { addProduct } from "../../../../api/product";
import { ElUpload } from "element-ui/types/upload";

@Component({
  name: "Dialog",
})
export default class Dialog extends Vue {
  @Ref("form")
  readonly form!: ElForm;
  @Ref("upload")
  readonly upload!: ElUpload;

  @Prop({ type: String, default: "" })
  readonly title!: string;

  @Prop({ type: Boolean, default: false })
  readonly isShow!: boolean;

  @Watch("isShow", {
    immediate: true,
  })
  onIsShowChange() {
    this.isVisible = this.isShow;
  }

  loading = false;
  isVisible = false;

  formData = {
    title: "234",
    detail: "123",
    price: 10,
    total: 10,
    picture: [],
  };
  rules = {
    title: [
      {
        required: true,
        message: "不能为空",
        trigger: "change",
      },
    ],
    detail: [
      {
        required: true,
        message: "不能为空",
        trigger: "change",
      },
    ],
    price: [
      {
        required: true,
        message: "不能为空",
        trigger: "change",
      },
    ],
    total: [
      {
        required: true,
        message: "不能为空",
        trigger: "change",
      },
    ],
    picture: [
      {
        required: true,
        message: "不能为空",
      },
    ],
  };

  onSuccess(data) {
    let fileName = data.data?.fileName;
    fileName && this.formData.picture.push(fileName);
  }

  onRemove(file) {
    this.formData.picture = this.formData.picture.filter(
      (item) => item !== file.response?.data?.fileName
    );
  }

  onClose() {
    this.$emit("close");
  }

  onSubmit() {
    this.form.validate(async (valid) => {
      if (valid) {
        // this.loading = true;

        let { data } = await addProduct({
          ...this.formData,
          picture: JSON.stringify(this.formData.picture),
        });
        this.loading = false;
        data.success && (this.isVisible = false);
      }
    });
  }
}
</script>
<style scoped lang='less'>
</style>
