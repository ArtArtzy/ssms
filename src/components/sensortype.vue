<template>
  <div>
    <q-btn
      label="Sensor type"
      outline
      no-caps
      class="longBtn"
      @click="sensorTypeBtn()"
    />
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>
    <!-- Sensor list -->
    <q-dialog v-model="sensorTypeDia" persistent transition-hide="flip-down">
      <q-card class="emailDia">
        <div class="row">
          <div style="width: 400px">
            <img src="../../public/image/sensortype01.jpg" alt="" />
          </div>
          <div class="col">
            <div class="row justify-between">
              <div class="font24 q-pa-md">Sensor type</div>
              <div class="q-pa-md">
                <q-btn
                  round
                  icon="fa-solid fa-plus"
                  class="gbtn"
                  dense
                  @click="sensorAddBtn()"
                />
              </div>
            </div>

            <div class="boxData q-mx-md">
              <div class="tGreen row">
                <div class="q-px-sm col-8">Type</div>
                <div class="col-2">Edit</div>
                <div class="col-2">Delete</div>
              </div>
              <div
                class="row lineData"
                v-for="(item, index) in sensorList"
                :class="{ lineGrey: index % 2 == 1 }"
              >
                <div class="q-px-sm col-8">{{ item.sensortype }}</div>
                <div
                  class="col-2 cursor-pointer"
                  @click="editType(item.id, item.sensortype)"
                >
                  <u>Edit</u>
                </div>
                <div class="col-2 cursor-pointer" @click="delType(item.id)">
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
                  @click="closeSensorTypeMain()"
                />
              </div>
              <div style="width: 30px"></div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Sensor add -->
    <q-dialog v-model="addSensorDia" persistent transition-hide="flip-down">
      <q-card class="addSensorDia">
        <div class="row">
          <div class="leftDia">
            <img src="../../public/image/sensortype02.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Add new sensor type</div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>name</div>
              </div>
              <div class="col-8">
                <q-input v-model="sensorAddTypeName" dense />
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeAddNewType()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="addNewSensorTypeConfirm()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- sensor edit -->
    <q-dialog v-model="editSensorDia" persistent transition-hide="flip-down">
      <q-card class="addSensorDia">
        <div class="row">
          <div class="leftDia">
            <img src="../../public/image/sensortype03.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Edit sensor type</div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>name</div>
              </div>
              <div class="col-8">
                <q-input v-model="sensorEditName" dense />
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEditNewType()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="editSensorTypeConfirm()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- sensor delete -->
    <q-dialog v-model="delSensorTypeDia" persistent transition-hide="flip-down">
      <q-card class="delUserDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/del.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Confirm delete</div>
            <div class="q-px-md">Do you want to delete this sensor type?</div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeDelSensorDiaBtn()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Delete"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="delSensorConfirmBtn()"
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
      sensorTypeDia: false,
      sensorList: [],
      addSensorDia: false,
      sensorAddTypeName: "",
      sensorEditId: "",
      sensorEditName: "",
      editSensorDia: false,
      delSensorTypeDia: false,
      delSensorID: 0,
    };
  },
  methods: {
    async loadSensor() {
      let url = this.apiPath + "loadSensor.php";
      let res = await axios.get(url);
      this.sensorList = res.data;
    },
    sensorTypeBtn() {
      this.showBackdrop = true;
      this.sensorTypeDia = true;
    },
    sensorAddBtn() {
      this.sensorTypeDia = false;
      this.addSensorDia = true;
      this.sensorAddTypeName = "";
    },
    closeAddNewType() {
      this.addSensorDia = false;
      this.sensorTypeDia = true;
    },
    async addNewSensorTypeConfirm() {
      let temp = {
        name: this.sensorAddTypeName,
      };
      let url = this.apiPath + "savesensortype.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.loadSensor();
        this.greenNotify("Add new sensor type.");
        this.closeAddNewType();
      }
    },
    editType(id, name) {
      this.sensorEditId = id;
      this.sensorEditName = name;
      this.sensorTypeDia = false;
      this.editSensorDia = true;
    },
    closeEditNewType() {
      this.editSensorDia = false;
      this.sensorTypeDia = true;
    },
    async editSensorTypeConfirm() {
      let temp = {
        id: this.sensorEditId,
        name: this.sensorEditName,
      };
      let url = this.apiPath + "editsensortype.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.loadSensor();
        this.greenNotify("Edit sensor type complete");
        this.closeEditNewType();
      }
    },
    delType(id) {
      this.delSensorTypeDia = true;
      this.sensorTypeDia = false;
      this.delSensorID = id;
    },
    closeDelSensorDiaBtn() {
      this.delSensorTypeDia = false;
      this.sensorTypeDia = true;
    },
    async delSensorConfirmBtn() {
      let temp = {
        id: this.delSensorID,
      };
      let url = this.apiPath + "delsensortype.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.loadSensor();
        this.greenNotify("Delete sensor type complete");
        this.closeDelSensorDiaBtn();
      }
    },
    closeSensorTypeMain() {
      this.showBackdrop = false;
      this.sensorTypeDia = false;
    },
  },
  mounted() {
    this.loadSensor();
  },
};
</script>

<style lang="scss" scoped>
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
.boxData {
  width: 468px;
  height: 230px;
  overflow-y: auto;
}
.tGreen {
  background-color: rgba(40, 115, 119, 0.2);
}
.lineData {
  height: 25px;
  line-height: 25px;
}
.addSensorDia {
  min-width: 740px;
  height: 230px;
  overflow: hidden;
}
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
</style>
