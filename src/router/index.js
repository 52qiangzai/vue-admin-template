import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "Dashboard", icon: "dashboard" },
      },
    ],
  },

  // 自定义路由
  {
    path: "/user",
    component: Layout,
    meta: {
      title: "用户管理",
      icon: "nested",
    },
    redirect: "/user/userlist",
    children: [
      {
        path: "userlist",
        name: "user",
        component: () => import("@/views/user/userlist/index"),
        meta: { title: "用户列表", icon: "user" },
      },
    ],
  },
  {
    path: "/permission",
    component: Layout,
    meta: {
      title: "权限管理",
      icon: "nested",
    },
    redirect: "/permission/rolelist",
    children: [
      {
        path: "rolelist",
        name: "rolelist",
        component: () => import("@/views/permission/rolelist"),
        meta: { title: "角色列表", icon: "userlist" },
      },
      {
        path: "permissionlist",
        name: "permissionlist",
        component: () => import("@/views/permission/permissionlist"),
        meta: { title: "权限列表", icon: "permission" },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    meta: {
      title: "商品管理",
      icon: "goods",
    },
    redirect: "/good/goodslist",
    children: [
      {
        path: "goodslist",
        name: "goodslist",
        component: () => import("@/views/good/goodslist"),
        meta: { title: "商品列表", icon: "goodslist" },
      },
      {
        path: "paramslist",
        name: "paramslist",
        component: () => import("@/views/good/paramslist"),
        meta: { title: "分类参数", icon: "params" },
      },
      {
        path: "goodscategory",
        name: "goodscategory",
        component: () => import("@/views/good/goodscategory"),
        meta: { title: "商品分类", icon: "catecory" },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    meta: {
      title: "订单管理",
      icon: "order",
    },
    redirect: "/order/orderlist",
    children: [
      {
        path: "orderlist",
        name: "orderlist",
        component: () => import("@/views/order/orderlist"),
        meta: { title: "订单列表", icon: "order" },
      },
    ],
  },
  {
    path: "/report",
    component: Layout,
    meta: {
      title: "数据统计",
      icon: "el-icon-s-help",
    },
    redirect: "/report/reportlist",
    children: [
      {
        path: "reportlist",
        name: "reportlist",
        component: () => import("@/views/report/reportlist"),
        meta: { title: "数据报表", icon: "el-icon-s-help" },
      },
    ],
  },
  // 自定义路由结束
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://q6q.cc",
        meta: { title: "blog", icon: "link" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
