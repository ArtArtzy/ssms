<template>
  <div class="mainDiv shadow-4">
    <div class="row">
      <div class="leftMenu">
        <leftMenu :data="projectData" :menu="menuIndex" />
      </div>
      <div class="col">
        <div class="q-pa-md">
          <div class="topBox">
            <div class="row">
              <div style="width: 900px">
                <div class="text-h5">
                  {{ projectData.name }} ({{ projectData.shortURL }})
                </div>
                <div>{{ projectData.address }}</div>
                <div>
                  Password:
                  {{ projectData.isPassword ? projectData.password : "-" }}
                </div>
                <div>
                  Start logging time: {{ projectData.startLogDate }} :
                  {{ projectData.startLogTime }}
                </div>
                <div>
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>
    <q-dialog v-model="editProjectDia" persistent>
      <q-card class="editDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/p01.jpg" alt="" />
          </div>
          <div class="col q-pa-md">
            <div class="font24">Edit project</div>
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
            <div class="row justify-center q-pt-lg">
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
import leftMenu from "../components/leftmenu";
export default {
  components: { leftMenu },
  data() {
    return {
      projectData: {
        id: 1,
        name: "Param 5 bridge",
        shortURL: "Param 5",
        address: "Nontraburi 11000",
        isPassword: true,
        password: "1234",
        startLogDate: "21/5/2021",
        startLogTime: "10:30",
        dataDuration: "3600",
        status: true,
      },
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
      menuIndex: 1,
      editProjectDia: false,
      showBackdrop: false,
    };
  },
  methods: {
    isActiveBtn() {
      this.projectData.status = false;
    },
    isInactiveBtn() {
      this.projectData.status = true;
    },
    editBtn() {
      this.showBackdrop = true;
      this.editProjectDia = true;
    },
    closeAddDia() {
      this.showBackdrop = false;
      this.editProjectDia = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
