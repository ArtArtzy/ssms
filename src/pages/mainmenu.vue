<template>
  <div class="mainPage shadow-4">
    <div class="topBar row">
      <div class="q-pl-md q-pt-xs">
        <img src="../../public/image/favicon.svg" alt="" />
      </div>
      <div class="titlePro col">Smart Sensor Monitoring System</div>
      <div class="filterTypeDiv row justify-end q-pt-xs">
        <q-icon
          name="fa-solid fa-circle-user"
          color="white"
          size="28px"
          class="q-pt-xs cursor-pointer"
          v-show="isAdmin"
          @click="userBtn()"
        />
        <q-icon
          name="fa-solid fa-right-from-bracket"
          color="white"
          size="28px"
          class="q-pt-xs q-px-md cursor-pointer"
          @click="logoutBtn()"
        />
      </div>
    </div>
    <div class="picDiv">
      <div>
        <img src="../../public/image/banner1.jpg" alt="" width="100%" />
      </div>
      <div class="projectTypeDiv">
        <q-select
          v-model="projectType"
          :options="projectList"
          dense
          filled
          bg-color="white"
          class="projectTypeSel"
          @input="selectType"
        />
      </div>
    </div>

    <div class="mainPanel row content-start">
      <div class="col-4 row justify-center box" @click="addProjectBtn">
        <q-card class="projectBox shadow-4 cursor-pointer">
          <div class="addIcon">
            <q-icon
              name="fa-solid fa-plus"
              size="48px"
              class="plusSign"
            ></q-icon>
          </div>
          <div class="txtAdd">Add project</div>
        </q-card>
      </div>
      <div
        class="col-4 row justify-center box"
        v-for="(item, index) in dataShow"
        :index="index"
      >
        <q-card
          class="projectBox shadow-4 cursor-pointer"
          @click="goDetail(item.id)"
        >
          <div class="projectName">{{ item.name }}</div>
          <div class="shorturl fontgrey">{{ item.shortURL }}</div>
          <div class="row lastLine justify-between">
            <div class="fontgrey">{{ item.loggingDate }}</div>
            <div class="row" style="width: 80px">
              <div>
                <q-icon
                  name="fa-solid fa-lock fontgrey"
                  v-show="item.isPassword == 1"
                ></q-icon>
                <q-icon
                  name="fa-solid fa-lock-open fontgrey"
                  v-show="item.isPassword != 1"
                ></q-icon>
              </div>
              <div class="q-pl-sm activeText" v-show="item.active == 1">
                Active
              </div>
              <div class="q-pl-sm inactiveText" v-show="item.active == 0">
                Inactive
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>

    <!-- Add project Dialog -->
    <q-dialog v-model="addProjectDia" persistent>
      <q-card class="addDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/p01.jpg" alt="" />
          </div>
          <div class="col q-pa-md">
            <div class="font24">Add project</div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Project name:</div>
              <div class="col q-pr-md">
                <q-input v-model="input.projectName" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <div>Short URL:</div>
                <div class="font10">small letters no space</div>
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.shorturl" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Address:</div>
              <div class="col q-pr-md">
                <q-input
                  v-model="input.address"
                  dense
                  placeholder="EXAMPLE: Bangkok 11400"
                />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <q-checkbox v-model="input.isPassword" dense label="Password" />
              </div>
              <div class="col q-pr-md">
                <q-input
                  v-model="input.password"
                  dense
                  v-show="input.isPassword"
                />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Start logging Date</div>
              <div class="col q-pr-md">
                <q-input
                  v-model="input.startLogDate"
                  dense
                  placeholder="EXAMPLE: 01/11/2022"
                />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Start logging Time</div>
              <div class="col q-pr-md">
                <q-input
                  v-model="input.startLogTime"
                  dense
                  placeholder="EXAMPLE: 20:30"
                />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Duration (sec)</div>
              <div class="col q-pr-md">
                <q-input
                  v-model="input.duration"
                  dense
                  placeholder="EXAMPLE: 3600"
                />
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  style="width: 120px"
                  @click="closeAddDia()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  color="teal-9"
                  style="width: 120px"
                  @click="saveAddDia()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Logout Dialog -->
    <q-dialog v-model="logoutDia" persistent>
      <q-card class="logoutDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/logout.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Confirm logout</div>
            <div class="q-px-md">Do you want to logout this user?</div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeLogoutDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Logout"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="logoutConfirmBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- User main dialog -->
    <q-dialog v-model="userDia" persistent transition-hide="flip-up">
      <q-card class="userDia">
        <div class="row">
          <div style="width: 400px; height: 375px; overflow-y: hidden">
            <img src="../../public/image/user01.jpg" width="100%" alt="" />
          </div>
          <div class="col">
            <div class="row justify-between q-pa-md">
              <div class="font24">User</div>
              <div>
                <q-btn
                  icon="fa-solid fa-plus"
                  round
                  class="activeBtn"
                  @click="addNewUserBtn()"
                />
              </div>
            </div>
            <div class="userMainBlock">
              <div class="row headTable q-mx-md">
                <div class="col-8 q-pl-md">Username</div>
                <div class="col-2 textCenter">Edit</div>
                <div class="col-2 textCenter">Delete</div>
              </div>
              <div class="">
                <div
                  class="row q-mx-md"
                  style="line-height: 30px"
                  v-for="(item, index) in userData"
                  :index="index"
                  :class="{ zebraLine: index % 2 }"
                >
                  <div class="col-8 q-pl-md">{{ item.username }}</div>
                  <div
                    class="col-2 textCenter cursor-pointer"
                    @click="editUserBtn(item.id)"
                  >
                    <u>Edit</u>
                  </div>
                  <div
                    class="col-2 textCenter cursor-pointer"
                    @click="delUserBtn(item.id)"
                  >
                    <u>Delete</u>
                  </div>
                </div>
              </div>
            </div>
            <div class="textCenter q-pt-sm">
              <q-btn
                label="Close"
                no-caps
                outline
                class="longBtn"
                @click="closeUserBtn()"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- User add new dialog -->
    <q-dialog v-model="addNewUserDia" persistent transition-hide="flip-down">
      <q-card class="addUserDia">
        <div class="row">
          <div style="width: 300px">
            <img src="../../public/image/user02.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Add new user</div>
            <div class="q-px-md">
              <div class="row">
                <div class="col-3 q-pt-md">
                  <div>username</div>
                  <div class="font10">at least 3 letters</div>
                </div>
                <div class="col-7">
                  <q-input v-model="user.username" dense />
                </div>
              </div>
              <div class="row">
                <div class="col-3 q-pt-md">
                  <div>password</div>
                  <div class="font10">at least 4 letters</div>
                </div>
                <div class="col-7">
                  <q-input v-model="user.password" dense />
                </div>
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeAddNewUserDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="addNewUserConfirmBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- User edit dialog -->
    <q-dialog v-model="editUserDia" persistent transition-hide="flip-down">
      <q-card class="addUserDia">
        <div class="row">
          <div style="width: 300px">
            <img src="../../public/image/user03.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Edit user</div>
            <div class="q-px-md">
              <div class="row">
                <div class="col-3 q-pt-md">
                  <div>username</div>
                  <div class="font10">at least 3 letters</div>
                </div>
                <div class="col-7">
                  <q-input v-model="userEdit.username" readonly dense />
                </div>
              </div>
              <div class="row">
                <div class="col-3 q-pt-md">
                  <div>password</div>
                  <div class="font10">at least 4 letters</div>
                </div>
                <div class="col-7">
                  <q-input v-model="userEdit.password" dense />
                </div>
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEditUserDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="editUserConfirmBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- User delete -->
    <q-dialog v-model="delUserDia" persistent transition-hide="flip-down">
      <q-card class="delUserDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/del.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Confirm delete</div>
            <div class="q-px-md">Do you want to delete this user?</div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeDelUserDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Delete"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="delUserConfirmBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      showBackdrop: false,
      // Logout
      logoutDia: false,
      // user management
      isAdmin: false,
      userDia: false,
      userData: [],
      addNewUserDia: false,
      user: {
        username: "",
        password: "",
      },
      editUserDia: false,
      userEdit: {
        id: 0,
        username: "",
        password: "",
      },
      delUserDia: false,
      delUserId: 0,
      //project
      addProjectDia: false,
      input: {
        projectName: "",
        shorturl: "",
        isPassword: true,
        password: "",
        address: "",
        startLogDate: "",
        startLogTime: "",
        duration: "",
      },

      projectType: "All project",
      projectList: ["All project", "Active project", "Inactive project"],
      dataList: [],
      dataShow: [],
    };
  },
  methods: {
    // logout
    logoutBtn() {
      this.showBackdrop = true;
      this.logoutDia = true;
    },
    closeLogoutDiaBtn() {
      this.showBackdrop = false;
      this.logoutDia = false;
    },
    logoutConfirmBtn() {
      this.$q.localStorage.clear();
      this.$router.push("/");
    },

    // user management
    async loadUser() {
      let url = this.apiPath + "loaduser.php";
      let res = await axios.get(url);
      this.userData = res.data;
    },
    userBtn() {
      this.loadUser();
      this.showBackdrop = true;
      this.userDia = true;
    },
    closeUserBtn() {
      this.showBackdrop = false;
      this.userDia = false;
    },
    addNewUserBtn() {
      this.userDia = false;
      this.addNewUserDia = true;
    },
    closeAddNewUserDiaBtn() {
      this.userDia = true;
      this.addNewUserDia = false;
    },
    async addNewUserConfirmBtn() {
      if (this.user.username.length == 0 || this.user.password.length == 0) {
        this.redNotify("Please input username/password");
        return;
      }
      if (this.user.username.length < 3) {
        this.redNotify("The username must be at least 3 characters long.");
        return;
      }
      if (this.user.password.length < 4) {
        this.redNotify("The password must be at least 4 characters long.");
        return;
      }
      let url = this.apiPath + "addnewuser.php";
      let res = await axios.post(url, JSON.stringify(this.user));
      if (res.data == "username exists") {
        this.redNotify("This username already exists.");
        return;
      } else {
        this.greenNotify("Add new user complete.");
        this.loadUser();
        this.closeAddNewUserDiaBtn();
      }
    },
    editUserBtn(id) {
      this.userEdit.id = id;
      this.userDia = false;
      this.editUserDia = true;
      this.userEdit.username = this.userData.filter(
        (x) => x.id == id
      )[0].username;
    },
    closeEditUserDiaBtn() {
      this.userDia = true;
      this.editUserDia = false;
    },
    async editUserConfirmBtn() {
      if (this.userEdit.password.length < 4) {
        this.redNotify("The password must be at least 4 characters.");
        return;
      }
      let url = this.apiPath + "edituser.php";
      let res = await axios.post(url, JSON.stringify(this.userEdit));
      if (res.data == "finish") {
        this.greenNotify("Update complete");
        this.closeEditUserDiaBtn();
      }
    },
    delUserBtn(id) {
      this.delUserId = id;
      this.userDia = false;
      this.delUserDia = true;
    },
    closeDelUserDiaBtn() {
      this.userDia = true;
      this.delUserDia = false;
    },
    async delUserConfirmBtn() {
      let url = this.apiPath + "deluser.php";
      let temp = {
        delId: this.delUserId,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Delete user complete");
        this.loadUser();
        this.closeDelUserDiaBtn();
      }
    },
    //******** */
    selectType() {
      if (this.projectType == "Active project") {
        this.dataShow = this.dataList.filter((x) => x.active == 1);
      } else if (this.projectType == "Inactive project") {
        this.dataShow = this.dataList.filter((x) => x.active == 0);
      } else {
        this.dataShow = this.dataList;
      }
    },
    async loadProjectData() {
      let url = this.apiPath + "loadproject.php";
      let res = await axios.get(url);
      this.dataList = res.data;
      this.setData();
      this.projectType = "All project";
    },
    setData() {
      this.dataShow = this.dataList;
    },
    addProjectBtn() {
      this.showBackdrop = true;
      this.addProjectDia = true;
      this.input.projectName = "";
      this.input.shorturl = "";
      this.input.isPassword = true;
      this.input.password = "";
      this.input.address = "";
      this.input.startLogDate = "";
      this.input.startLogTime = "";
      this.input.duration = "";
    },
    closeAddDia() {
      this.showBackdrop = false;
      this.addProjectDia = false;
    },
    async saveAddDia() {
      if (
        this.input.projectName.length == 0 ||
        this.input.shorturl.length == 0 ||
        this.input.address.length == 0 ||
        this.input.startLogDate.length == 0 ||
        this.input.startLogTime.length == 0 ||
        this.input.duration.length == 0
      ) {
        this.redNotify("Please input all fields!");
        return;
      }
      let url = this.apiPath + "addProject.php";
      let res = await axios.post(url, JSON.stringify(this.input));
      if (res.data == "finish") {
        this.greenNotify("Add new projectt completely");
        this.loadProjectData();
        this.showBackdrop = false;
        this.addProjectDia = false;
      }
    },
    goDetail(id) {
      this.$router.push("/info/" + id);
    },

    async checkHashKey() {
      let keyHash = this.$q.localStorage.getItem("keypass");
      let url = this.apiPath + "checkhashkey.php";
      let temp = {
        hashkey: keyHash,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "Not pass") {
        this.$q.localStorage.clear();
        this.$router.push("/");
      } else if (res.data == "admin") {
        this.isAdmin = true;
      }
    },
  },
  mounted() {
    this.checkHashKey();
    this.loadProjectData();
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}

//logout
.logoutDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
//** */

// user
//usermain
.userDia {
  width: 100%;
  max-width: 900px;
  height: 375px;
}
.userMainBlock {
  width: 100%;
  height: 240px;
  overflow-y: auto;
}
.headTable {
  line-height: 35px;
}
.addUserDia {
  width: 100%;
  max-width: 800px;
  height: 279px;
  overflow: hidden;
}
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
//***** */
.rowinput {
  height: 45px;
}
.addDia {
  width: 100%;
  max-width: 900px;
  height: 440px;
}
.mainPage {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-color: #f2f2f2;
  height: 100vh;
}
.topBar {
  height: 45px;
  background-color: #585858;
}
.titlePro {
  color: white;
  font-size: 18px;
  padding-top: 7px;
  padding-left: 10px;
}
.filterTypeDiv {
  width: 200px;
}
.projectTypeSel {
  width: 160px;
}
.picDiv {
  position: relative;
}
.projectTypeDiv {
  position: absolute;
  padding: 20px;
  right: 0px;
  top: 0px;
}
.mainPanel {
  width: 1000px;
  position: absolute;
  top: 250px;
  left: calc((100% - 1000px) / 2);
  height: calc(100vh - 250px);
  overflow-y: auto;
}
.projectBox {
  width: 90%;
  height: 170px;
}
.addIcon {
  padding-top: 45px;
  text-align: center;
}
.plusSign {
  color: #287377;
}
.txtAdd {
  text-align: center;
  color: #287377;
}
.box {
  height: 200px;
}
.projectName {
  font-size: 18px;
  padding-top: 20px;
  padding-left: 10px;
}
.shorturl {
  padding-left: 10px;
}
.lastLine {
  padding-top: 70px;
  padding-left: 10px;
  padding-right: 10px;
}
.activeText {
  color: #148b12;
}
.inactiveText {
  color: #de611a;
}
</style>
