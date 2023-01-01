<template>
  <div class="mainPage shadow-4">
    <div class="topBar row">
      <div class="q-pl-md q-pt-xs">
        <img src="../../public/image/favicon.svg" alt="" />
      </div>
      <div class="titlePro col">Bridge Health Monitoring System</div>
      <div class="filterTypeDiv row justify-center q-pt-xs">
        <q-select
          v-model="projectType"
          :options="projectList"
          dense=""
          bg-color="white"
          class="projectTypeSel"
          @input="selectType"
        />
      </div>
      <div class="q-pr-sm q-pt-sm">
        <q-btn color="secondary" label="Admin">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>User</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Log out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div>
      <img src="../../public/image/banner1.jpg" alt="" width="100%" />
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
          <div class="projectName">{{ item.project }}</div>
          <div class="shorturl fontgrey">{{ item.shortURL }}</div>
          <div class="row lastLine justify-between">
            <div class="fontgrey">{{ item.date }}</div>
            <div class="row" style="width: 80px">
              <div>
                <q-icon
                  name="fa-solid fa-lock fontgrey"
                  v-show="item.password"
                ></q-icon>
                <q-icon
                  name="fa-solid fa-lock-open fontgrey"
                  v-show="!item.password"
                ></q-icon>
              </div>
              <div class="q-pl-sm activeText" v-show="item.type == 'active'">
                Active
              </div>
              <div
                class="q-pl-sm inactiveText"
                v-show="item.type == 'inactive'"
              >
                Inactive
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>
    <q-dialog v-model="addProjectDia" persistent>
      <q-card class="addDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/p01.jpg" alt="" />
          </div>
          <div class="col q-pa-md">
            <div class="font24">Add project</div>
            <hr />
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Project name:</div>
              <div class="col q-pr-md">
                <q-input v-model="input.projectName" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Short URL:</div>
              <div class="col q-pr-md">
                <q-input v-model="input.shorturl" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <q-checkbox v-model="input.isPassword" dense label="Password" />
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.shorturl" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Start logging Date</div>
              <div class="col q-pr-md">
                <q-input v-model="input.startLogDate" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Start logging Time</div>
              <div class="col q-pr-md">
                <q-input v-model="input.startLogTime" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Duration</div>
              <div class="col q-pr-md">
                <q-input v-model="input.duration" dense />
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
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
      showBackdrop: false,
      addProjectDia: false,
      projectType: "All project",
      projectList: ["All project", "Active project", "Inactive project"],
      dataList: [
        {
          id: 1,
          project: "Param5 bridge",
          shortURL: "Param5",
          date: "July 2022",
          password: true,
          type: "active",
        },
        {
          id: 2,
          project: "Param7 bridge",
          shortURL: "Param7",
          date: "Feb 2022",
          password: false,
          type: "inactive",
        },
        {
          id: 3,
          project: "Param9 bridge",
          shortURL: "Param9",
          date: "July 2022",
          password: true,
          type: "active",
        },
        {
          id: 1,
          project: "Param5 bridge",
          shortURL: "Param5",
          date: "July 2022",
          password: true,
          type: "active",
        },
        {
          id: 2,
          project: "Param7 bridge",
          shortURL: "Param7",
          date: "Feb 2022",
          password: true,
          type: "inactive",
        },
        {
          id: 3,
          project: "Param9 bridge",
          shortURL: "Param9",
          date: "July 2022",
          password: true,
          type: "active",
        },
        {
          id: 1,
          project: "Param5 bridge",
          shortURL: "Param5",
          date: "July 2022",
          password: true,
          type: "active",
        },
        {
          id: 2,
          project: "Param7 bridge",
          shortURL: "Param7",
          date: "Feb 2022",
          password: true,
          type: "inactive",
        },
        {
          id: 3,
          project: "Param9 bridge",
          shortURL: "Param9",
          date: "July 2022",
          password: true,
          type: "active",
        },
      ],
      dataShow: [],
    };
  },
  methods: {
    selectType() {
      if (this.projectType == "Active project") {
        this.dataShow = this.dataList.filter((x) => x.type == "active");
      } else if (this.projectType == "Inactive project") {
        this.dataShow = this.dataList.filter((x) => x.type == "inactive");
      } else {
        this.dataShow = this.dataList;
      }
    },
    setData() {
      this.dataShow = this.dataList;
    },
    addProjectBtn() {
      this.showBackdrop = true;
      this.addProjectDia = true;
    },
    closeAddDia() {
      this.showBackdrop = false;
      this.addProjectDia = false;
    },
    saveAddDia() {
      console.log("save add new project");
      this.showBackdrop = false;
      this.addProjectDia = false;
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
      }
    },
  },
  mounted() {
    this.checkHashKey();
    this.setData();
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
.rowinput {
  height: 45px;
}
.addDia {
  width: 100%;
  max-width: 900px;
  height: 410px;
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
  padding-top: 5px;
  padding-left: 10px;
}
.filterTypeDiv {
  width: 200px;
}
.projectTypeSel {
  width: 160px;
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
