<template>
  <div class="app-container">
    <el-card class="box-card" style="z-index: -1111">
      <!-- 搜索区域 -->
      <el-row :gutter="20" class="search">
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入搜索内容"
              prefix-icon="el-icon-search"
              v-model="searchWord"
            >
            </el-input></div
        ></el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <el-button type="primary" @click="searchAllUser">搜索</el-button>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="dialogFormVisible = true"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="80px">
          <template slot-scope="scope">
            <el-tooltip
              :content="'当前用户状态: ' + scope.row.mg_state"
              placement="top"
            >
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeState(scope.row.mg_state, scope.row.id)"
              >
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editUser(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="small"
              @click="assignRole(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户信息"
      :visible.sync="dialogFormVisible"
      :show-close="false"
    >
      <el-form :model="form" ref="addUserRef" :rules="rules">
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="addUser('addUserRef')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 修改用户对话框
     -->
    <el-dialog title="修改用户信息" :visible.sync="editFormVisible">
      <el-form :model="userInfoTempObj" ref="updateUserRef" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="userInfoTempObj.username"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input
            v-model="userInfoTempObj.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input
            v-model="userInfoTempObj.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户角色 -->
    <el-dialog
      title="分配用户角色"
      :visible.sync="roleFormVisible"
      :show-close="false"
    >
      <el-form :model="roleInfoTempObj" ref="changeUserRef">
        <el-form-item label="用户名:" :label-width="formLabelWidth">
          <el-input
            v-model="roleInfoTempObj.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="现在角色:" :label-width="formLabelWidth">
          <el-input
            v-model="roleInfoTempObj.role_name"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="新的角色：" :label-width="formLabelWidth">
          <el-select v-model="roleInfoTempObj.rid" placeholder="选择修改的角色">
            <el-option
              v-for="(k, v, i) in rolesObj"
              :key="i"
              :label="k"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserList",
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      searchWord: "",
      dialogFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度最少5位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
      },
      userInfoTempObj: {},
      roleInfoTempObj: {},
      rolesObj: {
        30: "主管",
        31: "测试角色",
        34: "测试角色2",
        39: "大发送到",
        40: "test",
        41: "dsdf",
      },
    };
  },
  mounted() {
    if (!this.userList.length) {
      this.getAllUserList("", this.pagenum, this.pagesize);
    }
  },
  computed: {
    ...mapState({
      userList: (store) => {
        return store.user.users;
      },
      total: (store) => {
        return store.user.total;
      },
      storePageNum: (store) => {
        return store.user.pagenum;
      },
    }),
  },
  methods: {
    // 获取用户列表
    getAllUserList(query, pagenum, pagesize) {
      this.$store.dispatch("user/getUserList", {
        query,
        pagenum,
        pagesize,
      });
    },
    // 改变用户状态
    changeState(mg_state, id) {
      this.$store.dispatch("user/reqChangeUserState", {
        id,
        mg_state,
      });
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$store.dispatch("user/reqDeleteUserInfo", id);
          if (res === "ok") {
            this.userList.length === 0 && this.pagenum >= 2
              ? (this.pagenum = this.pagenum - 1)
              : (this.pagenum = 1);
            this.switchPage();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 搜索用户
    searchAllUser() {
      this.getAllUserList(this.searchWord, this.pagenum, this.pagesize);
    },
    // 改变每页个数
    handleSizeChange(value) {
      this.pagesize = value;
      this.switchPage();
    },
    // 改变页
    handleCurrentChange(value) {
      this.pagenum = value;
      this.switchPage();
    },
    // 判断带搜索内容切换页
    switchPage() {
      if (this.searchWord.trim() === "" || this.searchWord === null) {
        this.getAllUserList("", this.pagenum, this.pagesize);
      } else {
        this.getAllUserList(this.searchWord, this.pagenum, this.pagesize);
      }
    },
    // 取消添加页显示
    cancelForm() {
      this.dialogFormVisible = false;
      this.form = {};
    },
    // 添加用户
    addUser(forName) {
      this.$refs[forName].validate(async (valid) => {
        if (valid) {
          let res = await this.$store.dispatch("user/reqAddUser", this.form);
          if (res === "ok") {
            this.cancelForm();
            this.switchPage();
          }
        } else {
          this.$message.error(`请正确输入每一项`);
        }
      });
    },
    // 编辑用户
    editUser(id) {
      this.userInfoTempObj = JSON.parse(
        JSON.stringify(this.userList.filter((item) => item.id === id)[0])
      );
      this.editFormVisible = true;
    },
    // 编辑用户提交
    async submitEditUser() {
      const { id, email, mobile } = this.userInfoTempObj;
      let res = await this.$store.dispatch("user/reqUpDateUserInfo", {
        id,
        email,
        mobile,
      });
      if (res === "ok") {
        this.switchPage();
        this.editFormVisible = false;
        this.userInfoTempObj = {}
      }
    },
    // 编辑用户角色
    assignRole(id) {
      this.roleInfoTempObj = JSON.parse(
        JSON.stringify(this.userList.filter((item) => item.id === id)[0])
      );
      this.roleFormVisible = true;
    },
    // 改变用户角色
    async changeRole() {
      const { id, rid } = this.roleInfoTempObj;
      let res = await this.$store.dispatch("user/reqUserRole", {
        id,
        rid,
      });
      if (res === "ok") {
        this.switchPage();
        this.roleFormVisible = false;
        this.roleInfoTempObj = {}
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 20px;
}
</style>
