import { createRouter, createWebHashHistory, RouteLocationNormalized } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: '关系图',
      pageTitle: '关系图',
    },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to:RouteLocationNormalized, from:RouteLocationNormalized, next) => {
  // 修改标签页标题
  document.title = to.meta.title as string || '默认标题';

  // 修改网页标题
  const pageTitle = to.meta.pageTitle || '默认网页标题';
  const appTitle = '我的应用'; // 应用名称
  document.title = `${pageTitle} - ${appTitle}`;

  next();
})
export default router;
