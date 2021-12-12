<template>
  <div class="product">
    <div class="toolbar">
      <el-row>
        <el-button @click="onAdd" icon="search">添加</el-button>
        <el-button @click="onDelete" icon="search">删除</el-button>
      </el-row>
      <el-row>
        <el-input
          class="search"
          v-model="keyword"
          placeholder="请搜索"
          @keyup.enter.native="onSearch"
        ></el-input>
        <el-button @click="onSearch" icon="el-icon-search">搜索</el-button>
      </el-row>
    </div>
    <el-table class="table" :data="productData" border height="800px">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="detail" label="详情"></el-table-column>
      <el-table-column fixed prop="price" label="价格"></el-table-column>
      <el-table-column fixed prop="total" label="库存"></el-table-column>
      <el-table-column fixed prop="picture" label="图片">
        <template slot-scope="scope">
          <img
            width="100px"
            :src="item"
            :key="index"
            v-for="(item, index) in JSON.parse(scope.row.picture)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template>
          <el-button type="text" size="small"> 编辑 </el-button>
          <el-button type="text" size="small"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page="page"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <product-dialog
      :title="dialogTitle"
      :isShow="isShowDialog"
      @close="onClose"
    ></product-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getProduct, Product } from "../../api/product";
import ProductDialog from "./components/product/dialog.vue";

@Component({
  name: "ProductIndex",
  components: {
    ProductDialog,
  },
})
export default class ProductIndex extends Vue {
  keyword = "";
  dialogTitle = "添加商品";
  isShowDialog = false;
  total = 0;
  page = 1;
  pageSize = 20;
  productData: Product[] = [];

  onSearch() {
    this.initProduct();
  }
  onDelete() {
    console.log('delete');
  }
  created() {
    this.initProduct();
  }

  async initProduct() {
    const { data } = await getProduct({
      page: this.page,
      limit: this.pageSize,
      keyword: this.keyword,
    });
    this.total = data.total;
    this.productData = data.items;
  }

  onAdd() {
    this.isShowDialog = true;
  }

  onClose() {
    this.isShowDialog = false;
    this.initProduct();
  }

  onSizeChange(size: number) {
    this.pageSize = size;
    this.initProduct();
  }
  onCurrentChange(page: number) {
    this.page = page;
    this.initProduct();
  }
}
</script>
<style scoped lang='less'>
.product {
  margin: 32px;
  background: #fff;
  padding: 10px;
  border-radius: 2px;
  box-sizing: border-box;

  .toolbar {
    display: flex;
    justify-content: space-between;

    .search {
      width: 260px;
      margin-right: 8px;
    }
  }
  .table {
    margin: 12px 0;
  }
}
</style>
