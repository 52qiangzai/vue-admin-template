import {
  requestLoginUser,
  requestUserList,
  requestUserState,
  deleteUserInfo,
  requestAddUser,
  updateUserInfo,
  reqAssignUserRole,
} from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { removeStorage, setStorage } from "@/utils/storage";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar:
      "https://q1.qlogo.cn/g?b=qq&nk=1724417279@qq.com&s=100&q6qcc=qiangzai",
    pagenum: 1,
    pagesize: 10,
    users: [],
    total: 0,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  GET_USERLIST: (state, data) => {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        state[key] = data[key];
      }
    }
  },
  CHANGE_STATE: (state, data) => {
    state.users = state.users.map((item, index, v) => {
      if (item.id === data) {
        v.mg_state = !v.mg_state;
      }
      return item;
    });
  },
};

const actions = {
  // 用户登录
  async userLogin({ commit }, userInfo) {
    const { data, meta } = await requestLoginUser(userInfo);
    if (meta.status === 200) {
      const { id, rid, username, mobile, email, token } = data;
      commit("SET_TOKEN", token);
      commit("SET_NAME", username);
      setToken(token);
      setStorage(
        "userInfo",
        JSON.stringify({ id, rid, username, mobile, email })
      );
      return "ok";
    }
  },
  // 退出登录
  logoutUser({ commit }) {
    commit("RESET_STATE");
    removeToken();
    removeStorage("userInfo");
  },

  // 获取用户列表
  async getUserList({ commit }, objData) {
    const { data, meta } = await requestUserList(objData);
    if (meta.status === 200) {
      commit("GET_USERLIST", data);
    }
  },
  // 改变用户状态
  async reqChangeUserState({ commit }, objData) {
    const { meta, data } = await requestUserState(objData);
    if (meta.status === 200) {
      commit("CHANGE_STATE", data.id);
    }
  },
  // 删除用户
  async reqDeleteUserInfo({ commit, dispatch }, id) {
    const { meta } = await deleteUserInfo(id);
    if (meta.status === 200) {
      return "ok";
    }
  },
  // 添加用户
  async reqAddUser({ commit, dispatch }, formData) {
    const { data, meta } = await requestAddUser(formData);
    if (meta.status === 200 || meta.status === 201) {
      return "ok";
    }
  },
  // 更新用户信息
  async reqUpDateUserInfo({ commit }, formData) {
    const { meta } = await updateUserInfo(formData);
    if (meta.status === 200) {
      return "ok";
    }
  },
  // 分配用户角色
  async reqUserRole({}, formData) {
    const { meta } = await reqAssignUserRole(formData);
    if (meta.status === 200) {
      return "ok";
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
