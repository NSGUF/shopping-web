import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const routes: RouteConfig[] = [
  {
    name: "index",
    path: "/",
    component: () => import("@/views/home/index.vue"),
  },
  {
    name: "login",
    path: '/login',
    component: () => import("@/views/login/index.vue"),
  },
];
const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});
export default router;
