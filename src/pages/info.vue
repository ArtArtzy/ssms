<template>
  <div class="mainDiv shadow-4">
    <div class="row">
      <div class="leftMenu">
        <leftMenu :data="projectData" :menu="menuIndex" />
      </div>
      <div class="col rightArea">
        <div class="q-pa-md">
          <div class="topBox">
            <div class="row">
              <div style="width: 900px">
                <div class="text-h5">
                  {{ projectData.name }} ({{ projectData.shortURL }})
                  <q-icon
                    name="fa-solid fa-trash"
                    color="teal-9"
                    class="cursor-pointer"
                    @click="delProject()"
                  />
                </div>
                <div class="font16Grey">{{ projectData.address }}</div>

                <div class="font16Grey">
                  Start logging time: {{ projectData.startLogDate }} :
                  {{ projectData.startLogTime }}
                </div>
                <div class="font16Grey">
                  Data logging duration: {{ projectData.dataDuration }} s
                </div>
              </div>
              <div class="col row justify-end">
                <div>
                  <q-btn
                    label="Active"
                    no-caps
                    outline
                    dense
                    style="width: 120px"
                    v-show="projectData.status"
                    @click="isActiveBtn()"
                    color="secondary"
                  />
                  <q-btn
                    label="Inactive"
                    outline
                    no-caps
                    dense
                    style="width: 120px"
                    v-show="!projectData.status"
                    @click="isInactiveBtn()"
                    color="negative"
                  />
                </div>
                <div class="q-pt-sm">
                  <q-btn
                    label="Edit"
                    outline
                    no-caps
                    dense
                    style="width: 120px"
                    @click="editBtn()"
                  />
                </div>
                <div class="q-pt-sm">
                  <q-btn
                    label="Picture"
                    dense
                    outline
                    no-caps
                    style="width: 120px"
                    @click="addPictureBtn()"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in picData">
            <pic-show :data="item" @clickReload="loadPic" />
          </div>
        </div>
      </div>
    </div>

    <div class="fullscreen backdrop" v-show="showBackdrop"></div>

    <!-- edit project -->
    <q-dialog v-model="editProjectDia" persistent>
      <q-card class="addDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/p02.jpg" alt="" />
          </div>
          <div class="col q-pa-md">
            <div class="font24">Edit project</div>
            <hr />
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Project name</div>
              <div class="col q-pr-md">
                <q-input v-model="input.projectName" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <div>Short URL</div>
                <div class="font10">one word and no space</div>
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.shorturl" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <div>Address</div>
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.address" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <div>Start logging Date</div>
                <div class="font10">use format dd/mm/yyyy</div>
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.startLogDate" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">
                <div>Start logging Time</div>
                <div class="font10">use format hh:mm</div>
              </div>
              <div class="col q-pr-md">
                <q-input v-model="input.startLogTime" dense />
              </div>
            </div>
            <div class="row rowinput">
              <div class="col-4 q-pt-md">Duration (sec)</div>
              <div class="col q-pr-md">
                <q-input v-model="input.duration" dense />
              </div>
            </div>
            <div class="row justify-center q-pt-lg">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  style="width: 120px"
                  @click="closeAddDia()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  color="teal-9"
                  no-caps
                  style="width: 120px"
                  @click="saveAddDia()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Add new picture -->
    <q-dialog v-model="addNewPicDia" persistent>
      <q-card class="addNewPicDia">
        <div class="row">
          <div class="addPicLeft">
            <img src="../../public/image/pic01.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-px-md q-pt-md">Add new picture</div>
            <hr />
            <div class="row">
              <div class="col-3 q-pl-md q-pt-md">Order ID</div>
              <div class="col-8">
                <q-input v-model="addNewPic.orderID" dense />
              </div>
            </div>
            <div class="row">
              <div class="col-3 q-pl-md q-pt-md">Label</div>
              <div class="col-8">
                <q-input v-model="addNewPic.label" dense />
              </div>
            </div>
            <div class="row">
              <div class="col-3 q-pl-md q-pt-md">
                <div>Filename</div>
                <div class="font10">850x450px JPG</div>
              </div>
              <div class="col-8 q-pt-md">
                <q-input
                  v-model="addNewPic.fileName"
                  type="file"
                  bg-color="white"
                  filled
                />
              </div>
            </div>
            <div class="row justify-center q-pt-lg">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  style="width: 120px"
                  no-caps
                  @click="closeAddPicDia()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  color="teal-9"
                  no-caps
                  style="width: 120px"
                  @click="saveAddPicDia()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- confirm delete -->
    <q-dialog v-model="delProjectDia" persistent transition-hide="flip-down">
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
                  @click="closeDelProjectDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Delete"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="delProjectConfirmBtn()"
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
import leftMenu from "../components/leftmenu";
import picShow from "../components/pic";
export default {
  components: { leftMenu, picShow },
  data() {
    return {
      projectId: 0,
      addNewPicDia: false,
      addNewPic: {
        orderID: "",
        label: "",
        fileName: null,
      },
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
      input: {
        projectName: "",
        shorturl: "",
        address: "",
        startLogDate: "",
        startLogTime: "",
        duration: "",
      },
      delProjectDia: false,
      menuIndex: 1,
      editProjectDia: false,
      showBackdrop: false,
      picData: [],
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
      this.input.projectName = res.data[0].name;
      this.input.shorturl = res.data[0].shortURL;
      this.input.address = res.data[0].address;
      this.input.startLogDate = res.data[0].loggingDate;
      this.input.startLogTime = res.data[0].loggingTime;
      this.input.duration = res.data[0].duration;
    },
    async isActiveBtn() {
      this.projectData.status = false;
      let temp = {
        id: this.projectId,
        active: "0",
      };
      let url = this.apiPath + "projectActive.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Change project status complete");
      }
    },
    async isInactiveBtn() {
      this.projectData.status = true;
      let temp = {
        id: this.projectId,
        active: "1",
      };
      let url = this.apiPath + "projectActive.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Change project status complete");
      }
    },
    //delete project
    delProject() {
      this.showBackdrop = true;
      this.delProjectDia = true;
    },
    closeDelProjectDiaBtn() {
      this.showBackdrop = false;
      this.delProjectDia = false;
    },
    async delProjectConfirmBtn() {
      let temp = {
        id: this.projectId,
      };
      let url = this.apiPath + "delProject.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.$router.push("/mainmenu");
      }
    },
    // edit project
    editBtn() {
      this.loadProjectInfo();
      this.showBackdrop = true;
      this.editProjectDia = true;
    },
    closeAddDia() {
      this.showBackdrop = false;
      this.editProjectDia = false;
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
        this.redNotify("Please input all fields");
        return;
      }
      let temp = {
        id: this.projectId,
      };
      temp = {
        ...temp,
        ...this.input,
      };
      let url = this.apiPath + "projectEdit.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Save project info complete");
        this.loadProjectInfo();
        this.closeAddDia();
      }
    },
    // add picture
    addPictureBtn() {
      this.showBackdrop = true;
      this.addNewPicDia = true;
      this.addNewPic.orderID = "";
      this.addNewPic.label = "";
      this.addNewPic.fileName = null;
    },
    closeAddPicDia() {
      this.showBackdrop = false;
      this.addNewPicDia = false;
      this.loadPic();
    },
    async saveAddPicDia() {
      if (
        this.addNewPic.orderID.length == 0 ||
        this.addNewPic.label.length == 0 ||
        this.addNewPic.fileName.length == 0
      ) {
        this.redNotify("Please input all fields");
        return;
      }
      let url = this.apiPath + "addpic.php";
      const formData = new FormData();
      formData.append("projectID", this.projectId);
      formData.append("orderId", this.addNewPic.orderID);
      formData.append("label", this.addNewPic.label);
      formData.append("fileName", this.addNewPic.fileName[0].name);
      formData.append("fileNameData", this.addNewPic.fileName[0]);
      const headers = { "Content-Type": "multipart/form-data" };
      let res2 = await axios.post(url, formData, { headers });
      this.closeAddPicDia();
    },
    async loadPic() {
      let url = this.apiPath + "loadpic.php";
      let temp = {
        projectID: this.projectId,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      this.picData = [];
      res.data.forEach((x) => {
        let temp = {
          id: x.id,
          label: x.label,
          orderID: x.orderID,
          fileName: x.filename,
          realName:
            this.apiPath + "image/" + x.id + ".jpg?" + Math.random() * 2000,
        };
        this.picData.push(temp);
      });
      this.picData.sort((a, b) => Number(a.orderID) - Number(b.orderID));
    },
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.loadProjectInfo();
    this.loadPic();
  },
};
</script>
<style lang="scss" scoped>
.rightArea {
  height: 100vh;
  overflow-y: auto;
}
.mainDiv {
  width: 100%;
  max-width: 1440px;
  margin: auto;
  background-color: white;
  height: 100vh;
}
.leftMenu {
  width: 300px;
}
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
.topBox {
  width: 100%;
  height: 130px;
  border: 1px solid #837f7f;
  padding: 5px;
}
.editDia {
  max-width: 900px;
  width: 900px;
  height: 410px;
}
.textTitle {
  font-size: 20px;
}
.activeText {
  color: #148b12;
}
.inactiveText {
  color: #de611a;
}
.addNewPicDia {
  width: 100%;
  max-width: 900px;
  height: 320px;
  overflow: hidden;
}
.addPicLeft {
  width: 400px;
}
.addDia {
  width: 100%;
  max-width: 900px;
  height: 440px;
}
</style>
