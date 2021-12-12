import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: '/shopping',
  },
  {
    name: "shopping",
    path: '/shopping',
    component: () => import("@/views/shopping/index.vue"),
  },
  {
    name: "manage",
    path: '/manage',
    component: () => import("@/views/manage/index.vue"),
    redirect: '/manage/product',
    children: [
      {
        name: "product",
        path: 'product',
        component: () => import("@/views/manage/product.vue"),
      }
    ]
  },
  {
    name: "login",
    path: '/login',
    component: () => import("@/views/login/index.vue"),
  },
  {
    name: "register",
    path: '/register',
    component: () => import("@/views/register/index.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});
export default router;
