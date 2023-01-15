<template>
  <div class="mainDiv shadow-4">
    <div class="row">
      <div class="leftMenu">
        <leftMenu :data="projectData" :menu="menuIndex" />
      </div>
      <div class="col rightArea">
        <div class="font24 q-pa-md">Report</div>
        <div class="boxTop q-pa-md">
          <div class="font24">On screen report</div>
          <div>
            <q-checkbox
              v-model="sReport.cover"
              label="Report front cover"
              @input="saveSreport()"
            />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.info"
              label="Project info"
              @input="saveSreport()"
            />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.overview"
              label="Overview chart & limit"
              @input="saveSreport()"
            />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.chart"
              label="Indiviual chart"
              @input="saveSreport()"
            />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.limit"
              label="Over limit event"
              @input="saveSreport()"
            />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.conclusion"
              label="Conclusion"
              @input="saveSreport()"
            />
          </div>
        </div>
        <div style="height: 20px"></div>
        <div class="boxTop">
          <div class="row justify-between q-px-md q-pt-md">
            <div class="font24">Auto generate report</div>
            <div>
              <q-btn
                label="Email"
                no-caps=""
                class="shortBtn activeBtn"
                @click="openEmailBtn()"
              />
            </div>
          </div>
          <div class="row q-px-md">
            <div style="width: 100px">
              <q-checkbox
                label="Daily"
                v-model="aReport.daily"
                @input="saveAreport()"
              />
            </div>
            <div style="width: 100px">
              <q-checkbox
                label="Weekly"
                v-model="aReport.weekly"
                @input="saveAreport()"
              />
            </div>
            <div style="width: 100px">
              <q-checkbox
                label="Monthly"
                v-model="aReport.monthly"
                @input="saveAreport()"
              />
            </div>
          </div>
          <hr />
          <div class="q-px-md">
            <div>
              <q-checkbox
                v-model="aReport.cover"
                label="Report front cover"
                @input="saveAreport()"
              />
            </div>
            <div>
              <q-checkbox
                v-model="aReport.info"
                label="Project info"
                @input="saveAreport()"
              />
            </div>
            <div>
              <q-checkbox
                v-model="aReport.overview"
                label="Overview chart & limit"
                @input="saveAreport()"
              />
            </div>
            <div>
              <q-checkbox
                v-model="aReport.chart"
                label="Indiviual chart"
                @input="saveAreport()"
              />
            </div>
            <div>
              <q-checkbox
                v-model="aReport.limit"
                label="Over limit event"
                @input="saveAreport()"
              />
            </div>
            <div class="q-pb-md">
              <q-checkbox
                v-model="aReport.conclusion"
                label="Conclusion"
                @input="saveAreport()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>
    <!-- Email list -->
    <q-dialog v-model="emailDia" persistent transition-hide="flip-down">
      <q-card class="emailDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/email.jpg" alt="" />
          </div>
          <div class="col">
            <div class="row justify-between">
              <div class="font24 q-pa-md">Email list</div>
              <div class="q-pa-md">
                <q-btn
                  round
                  icon="fa-solid fa-plus"
                  class="gbtn"
                  dense
                  @click="emailAddBtn()"
                />
              </div>
            </div>

            <div class="boxData q-mx-md">
              <div class="tGreen row">
                <div class="q-px-sm col-8">Email</div>
                <div class="col-2">Edit</div>
                <div class="col-2">Delete</div>
              </div>
              <div
                class="row lineData"
                v-for="(item, index) in emailList"
                :class="{ lineGrey: index % 2 == 1 }"
              >
                <div class="q-px-sm col-8">{{ item.email }}</div>
                <div
                  class="col-2 cursor-pointer"
                  @click="editEmail(item.id, item.email)"
                >
                  <u>Edit</u>
                </div>
                <div class="col-2 cursor-pointer" @click="delEmail(item.id)">
                  <u>Delete</u>
                </div>
              </div>
            </div>
            <div class="row justify-center q-pt-lg">
              <div>
                <q-btn
                  label="Close"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEmailMainDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Add email -->
    <q-dialog v-model="emailAddDia" persistent transition-hide="flip-down">
      <q-card class="emailAddDia">
        <div class="row">
          <div style="width: 240px">
            <img src="../../public/image/addemail.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-px-md q-pt-md">Add new email</div>
            <div class="row q-px-md">
              <div class="q-pt-md" style="width: 80px">email</div>
              <div class="col"><q-input v-model="addEmailText" dense="" /></div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEmailDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="saveEmailConfirmBtn()"
                />
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Email delete -->
    <q-dialog v-model="delEmailDia" persistent transition-hide="flip-down">
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
                  @click="closeDelEmailDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Delete"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="delEmailConfirmBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Edit email -->
    <q-dialog v-model="emailEditDia" persistent transition-hide="flip-down">
      <q-card class="emailAddDia">
        <div class="row">
          <div style="width: 240px">
            <img src="../../public/image/editemail.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-px-md q-pt-md">Edit email</div>
            <div class="row q-px-md">
              <div class="q-pt-md" style="width: 80px">email</div>
              <div class="col">
                <q-input v-model="editEmailText" dense="" />
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEditEmailDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="saveEditEmailConfirmBtn()"
                />
              </div>
            </div>
          </div>
          <div class="col-1"></div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";

import leftMenu from "../components/leftmenu";
export default {
  components: { leftMenu },
  data() {
    return {
      showBackdrop: false,
      emailDia: false,
      emailAddDia: false,
      delEmailDia: false,
      emailEditDia: false,
      addEmailText: "",
      projectId: 0,
      menuIndex: 3,
      projectData: {
        id: 1,
        name: "Param 5 bridge",
        shortURL: "Param 5",
        address: "Nontraburi 11000",
        startLogDate: "21/5/2021",
        startLogTime: "10:30",
        dataDuration: "3600",
        status: true,
      },
      sReport: {
        cover: false,
        info: false,
        overview: false,
        chart: false,
        limit: false,
        conclusion: false,
      },
      aReport: {
        daily: false,
        weekly: false,
        monthly: false,
        cover: false,
        info: false,
        overview: false,
        chart: false,
        limit: false,
        conclusion: false,
      },
      emailList: [],
      emailDelID: 0,
      editEmailText: "",
      editEmailID: 0,
    };
  },
  methods: {
    async loadProjectInfo() {
      let temp = {
        id: this.projectId,
      };
      let url = this.apiPath + "projectDetail.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.projectData.id = this.projectId;
      this.projectData.name = res.data[0].name;
      this.projectData.shortURL = res.data[0].shortURL;
      this.projectData.address = res.data[0].address;
      this.projectData.startLogDate = res.data[0].loggingDate;
      this.projectData.startLogTime = res.data[0].loggingTime;
      this.projectData.dataDuration = res.data[0].duration;
      this.projectData.status = res.data[0].active == "0" ? false : true;
    },
    async saveSreport() {
      let url = this.apiPath + "saveSreport.php";
      let temp = {
        projectID: this.projectId,
        ...this.sReport,
      };

      let res = await axios.post(url, JSON.stringify(temp));
    },
    async loadSreport() {
      let temp = {
        id: this.projectId,
      };
      let url = this.apiPath + "sReportShow.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.sReport.cover = res.data[0].cover == 1 ? true : false;
      this.sReport.info = res.data[0].info == 1 ? true : false;
      this.sReport.overview = res.data[0].overview == 1 ? true : false;
      this.sReport.chart = res.data[0].chart == 1 ? true : false;
      this.sReport.limit = res.data[0].limitData == 1 ? true : false;
    },
    async loadAreport() {
      let temp = {
        id: this.projectId,
      };
      let url = this.apiPath + "aReportShow.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.aReport.daily = res.data[0].daily == 1 ? true : false;
      this.aReport.monthly = res.data[0].monthly == 1 ? true : false;
      this.aReport.weekly = res.data[0].weekly == 1 ? true : false;
      this.aReport.cover = res.data[0].cover == 1 ? true : false;
      this.aReport.info = res.data[0].info == 1 ? true : false;
      this.aReport.overview = res.data[0].overview == 1 ? true : false;
      this.aReport.chart = res.data[0].chart == 1 ? true : false;
      this.aReport.limit = res.data[0].limitData == 1 ? true : false;
    },
    async saveAreport() {
      let url = this.apiPath + "saveAreport.php";
      let temp = {
        projectID: this.projectId,
        ...this.aReport,
      };

      let res = await axios.post(url, JSON.stringify(temp));
    },
    closeEmailDiaBtn() {
      this.emailDia = false;
      this.showBackdrop = false;
    },
    openEmailBtn() {
      this.emailDia = true;
      this.showBackdrop = true;
    },
    async loadEmail() {
      let url = this.apiPath + "loadEmail.php";
      let temp = {
        id: this.projectId,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      this.emailList = res.data;
    },
    closeEmailMainDiaBtn() {
      this.emailDia = false;
      this.showBackdrop = false;
    },
    emailAddBtn() {
      this.addEmailText = "";
      this.addEmailText = "";
      this.emailAddDia = true;
      this.emailDia = false;
      this.showBackdrop = true;
    },
    closeEmailDiaBtn() {
      this.emailAddDia = false;
      this.emailDia = true;
    },
    async saveEmailConfirmBtn() {
      if (this.addEmailText.length == 0) {
        this.redNotify("Please input email");
        return;
      }
      let url = this.apiPath + "addEmail.php";
      let temp = {
        id: this.projectId,
        email: this.addEmailText,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Save completely");
        this.loadEmail();
        this.closeEmailDiaBtn();
      }
    },
    delEmail(id) {
      this.emailDelID = id;
      this.emailDia = false;
      this.delEmailDia = true;
    },
    closeDelEmailDiaBtn() {
      this.delEmailDia = false;
      this.emailDia = true;
    },
    async delEmailConfirmBtn() {
      let url = this.apiPath + "delEmail.php";
      let temp = {
        id: this.emailDelID,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Delete completely");
        this.loadEmail();
        this.closeDelEmailDiaBtn();
      }
    },
    async editEmail(id, email) {
      this.editEmailID = id;
      this.editEmailText = email;
      this.emailDia = false;
      this.emailEditDia = true;
    },
    closeEditEmailDiaBtn() {
      this.emailEditDia = false;
      this.emailDia = true;
    },
    async saveEditEmailConfirmBtn() {
      let url = this.apiPath + "editEmail.php";
      let temp = {
        id: this.editEmailID,
        email: this.editEmailText,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Edit email completely");
        this.loadEmail();
        this.closeEditEmailDiaBtn();
      }
    },
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.loadProjectInfo();
    this.loadSreport();
    this.loadAreport();
    this.loadEmail();
  },
};
</script>

<style lang="scss" scoped>
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
.lineGrey {
  background-color: rgba(221, 221, 221, 0.4);
}
.lineData {
  height: 25px;
  line-height: 25px;
}
.mainDiv {
  width: 100%;
  max-width: 1440px;
  margin: auto;
  background-color: white;
  height: 100vh;
}
.boxTop {
  width: 90%;
  border: 1px solid #837f7f;
  margin: auto;
}
.emailDia {
  width: 100%;
  max-width: 900px;
  height: 376px;
  overflow: hidden;
}
.gbtn {
  background-color: #287377;
  color: white;
}
.tGreen {
  background-color: rgba(40, 115, 119, 0.2);
}
.boxData {
  width: 468px;
  height: 230px;
  overflow-y: auto;
}
.emailAddDia {
  width: 100%;
  max-width: 650px;
  height: 225px;
  overflow: hidden;
}
</style>
