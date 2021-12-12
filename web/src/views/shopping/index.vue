<template>
  <div class="shopping">
    <div class="header">
      <div class="search">
        <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
        <el-button class="search-button" icon="el-icon-search" @click="onSearch">搜索</el-button>
      </div>
      <div v-if="phone">
        {{ phone }}
        <el-button @click="onLogout" type="text">退出登陆</el-button>
      </div>
      <div v-else>
        <router-link to="/login" class="login">登陆</router-link>
        <router-link to="/register">注册</router-link>
      </div>
    </div>
    <div class="container">
      <div class="info">
        <el-card
          class="info-card"
          v-for="(item, index) in productData"
          :key="index"
        >
          <img :src="JSON.parse(item.picture)[0]" class="info-img" />
          <div>
            <div class="info-card-title">{{ item.title }}</div>
            <div class="info-card-title">库存：{{ item.total }} </div>
            <div class="info-card-title">价格：{{ item.price }} 元</div>
            <div class="info-card-footer">
              <time class="time">{{ item.detail }}</time>
              <el-button
                v-if="phone"
                type="text"
                @click="onClick(item)"
                class="button"
                >购买</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { logout } from "../../api/login";
import { buyProduct, getProduct, Product } from "../../api/product";
import { MUTATIONS_KEYS } from "../../const/vuex";
const car = namespace("car");
const user = namespace("user");

@Component({
  name: "ShoppingIndex",
})
export default class ShoppingIndex extends Vue {
  @car.Getter("getAllCount") getAllCount!: number;
  @user.Getter("phone") phone!: string;

  @user.Mutation(MUTATIONS_KEYS.updateUserInfo)
  mutationUpdateUserInfo!: Function;
  @user.Mutation(MUTATIONS_KEYS.logout)
  mutationLogout!: Function;

  keyword = "";
  total = 0;
  pageSize = 20;
  page = 1;
  productData: Product[] = [];

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
  onSearch() {
    this.initProduct();
  }

  onClick(item: Product) {
    this.$confirm("是否购买?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    }).then(async () => {
      let { data, message } = await buyProduct({
        id: item.id,
      });
      if (data.success) {
        this.$message({ message, type: "success" });
        this.initProduct();
      }
    });
  }

  onSizeChange(size: number) {
    this.pageSize = size;
    this.initProduct();
  }
  onCurrentChange(page: number) {
    this.page = page;
    this.initProduct();
  }
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
<style lang='less' scoped>
.shopping {
  height: 100%;
  padding: 0 160px;
  width: 1366px;
  margin: 0 auto;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      display: flex;
      align-items: center;
      width: 560px;
      .search-button {
        margin-left: 6px;
      }
    }
    .login {
      margin-right: 10px;
    }
  }

  .container {
    background: #f5f5f5;
    border-top: 3px solid red;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .info {
      min-height: 1000px;
      padding-left: 16px;
      min-width: 1366px;
      .info-img {
        width: 235px;
      }

      .info-card {
        float: left;
        margin: 8px;
        &-title {
          margin-top: 4px;
        }

        &-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;
        }
      }
    }
  }
}
</style>
