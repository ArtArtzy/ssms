div
<template>
  <div>
    <div class="mainbox shadow-3">
      <div class="row justify-between">
        <div class="font-topic q-px-md q-pt-sm">{{ data.name }}</div>
        <div class="row q-pt-md">
          <div>
            <q-icon
              name="fa-solid fa-trash-can"
              class="greenIcon"
              @click="delSensorBtn()"
            />
          </div>
          <div class="q-px-sm">
            <q-icon
              name="fa-solid fa-pen-to-square"
              class="greenIcon"
              @click="editSensorBtn()"
            />
          </div>
          <div>
            <q-icon
              name="fa-regular fa-image"
              class="greenIcon"
              @click="addEditPic()"
            />
          </div>
          <div class="q-px-md">
            <div v-show="data.active == 1" class="gbtn" @click="activeBtn(0)">
              Active
            </div>
            <div v-show="data.active == 0" class="rbtn" @click="activeBtn(1)">
              Inactive
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-between q-px-md">
        <div>{{ data.sensortype }}</div>
        <div @click="addAxisBtn()" class="cursor-pointer">
          <u>Add new axis</u>
        </div>
      </div>
      <div>
        <img :src="loadImage()" alt="" width="100%" height="200px" />
      </div>
      <div class="row bargreen">
        <div class="col textC">Axis</div>
        <div class="col textC">Unit</div>
        <div class="col textC">Min limit</div>
        <div class="col textC">Max limit</div>
        <div class="col textC">Column</div>
        <div class="col textC">Edit</div>
        <div class="col textC">Delete</div>
      </div>
      <div class="row" v-for="(item, index) in axisList" :index="index">
        <div class="col textC">{{ item.axis }}</div>
        <div class="col textC" v-html="item.unit"></div>
        <div class="col textC">{{ item.minLimitValue }}</div>
        <div class="col textC">{{ item.maxLimitValue }}</div>
        <div class="col textC">{{ item.column }}</div>
        <div class="col textC">Edit</div>
        <div class="col textC">Delete</div>
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>

    <!-- sensor delete -->
    <q-dialog v-model="delSensorDia" persistent transition-hide="flip-down">
      <q-card class="delUserDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/del.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Confirm delete</div>
            <div class="q-px-md">Do you want to delete this sensor?</div>
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
    <!-- Edit sensor -->
    <q-dialog v-model="editSensorDia" persistent transition-hide="flip-down">
      <q-card class="addSensorDia">
        <div class="row">
          <div class="leftDia">
            <img src="../../public/image/sensor02.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Edit sensor</div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>name</div>
              </div>
              <div class="col-8">
                <q-input v-model="editSensor.name" dense />
              </div>
            </div>
            <div class="q-px-md row q-pt-md">
              <div class="col-3 q-pt-md">
                <div>type</div>
              </div>
              <div class="col-8">
                <q-select
                  v-model="editSensor.sid"
                  :options="sensorList"
                  emit-value
                  map-options
                  dense
                />
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEditSensor()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="saveEditSensorBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Add new picture -->
    <q-dialog v-model="addPicDia" persistent transition-hide="flip-down">
      <q-card class="addPicDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/addpic1.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Add new picture</div>
            <div class="q-px-md row">
              <div class="q-pl-md">
                <div>Filename</div>
                <div class="font10">850x450px JPG</div>
              </div>
              <div class="q-px-md">
                <q-input
                  v-model="fileName"
                  filled
                  type="file"
                  style="width: 250px"
                />
              </div>
            </div>
            <div class="row justify-center q-pt-md">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeEditPicBtn2()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="saveEditPicBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- add new axis -->
    <q-dialog v-model="addNewAxisDia" persistent transition-hide="flip-down">
      <q-card class="axisDia">
        <div class="row">
          <div class="leftDia">
            <img src="../../public/image/axis1.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-px-md q-pt-md">Add new axis</div>
            <div class="q-px-md">{{ data.name }} - {{ data.sensortype }}</div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>name</div>
              </div>
              <div class="col-8">
                <q-select
                  v-model="input.axis"
                  :options="optionAxis"
                  style="width: 80px"
                  dense
                />
              </div>
            </div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>column</div>
              </div>
              <div class="col-8">
                <q-input
                  v-model="input.column"
                  type="number"
                  dense
                  style="width: 80px"
                />
              </div>
            </div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>unit</div>
              </div>
              <div class="col-4">
                <q-input v-model="input.unit" dense style="width: 130px" />
              </div>
              <div class="col row q-pt-md">
                <div style="width: 10px"></div>
                <div class="boxbtn" @click="addMicroMBtn()">µm</div>
                <div style="width: 10px"></div>
                <div class="boxbtn" @click="addMicroCBtn()">µε</div>
                <div style="width: 10px"></div>
                <div class="boxbtn" @click="addSpeedBtn()">m/s<sup>2</sup></div>
              </div>
            </div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-sm">
                <div>
                  <q-checkbox
                    v-model="input.minLimitCheck"
                    label="Min limit"
                    color="green"
                    keep-color
                  />
                </div>
              </div>
              <div class="col-8">
                <q-input
                  v-model="input.minLimitValue"
                  dense
                  style="width: 160px"
                />
              </div>
            </div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-sm">
                <div>
                  <q-checkbox
                    v-model="input.maxLimitCheck"
                    label="Max limit"
                    color="green"
                    keep-color
                  />
                </div>
              </div>
              <div class="col-8">
                <q-input
                  v-model="input.maxLimitValue"
                  dense
                  style="width: 160px"
                />
              </div>
            </div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="closeAddNewAxis()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="saveAddAxisBtn()"
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
  props: ["data", "projectID"],
  data() {
    return {
      delSensorDia: false,
      showBackdrop: false,
      editSensorDia: false,
      addNewAxisDia: false,
      addPicDia: false,
      sensorList: [],
      editSensor: {
        id: "",
        name: "",
        sid: "",
      },
      fileName: null,
      optionAxis: ["x", "y", "z"],
      input: {
        axis: "x",
        column: "1",
        unit: "",
        minLimitCheck: false,
        minLimitValue: "",
        maxLimitCheck: false,
        maxLimitValue: "",
      },
      axisList: [],
    };
  },
  methods: {
    // load axis data
    async loadAxis() {
      let temp = {
        sensorID: this.data.id,
      };
      let url = this.apiPath + "loadaxis.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.axisList = res.data;
      this.axisList.sort((a, b) => (a.axis > b.axis ? 1 : -1));
    },
    //Add new axis
    addSpeedBtn() {
      this.input.unit = "m/s<sup>2</sup>";
    },
    addMicroCBtn() {
      this.input.unit = "µε";
    },
    addMicroMBtn() {
      this.input.unit = "µm";
    },
    closeAddNewAxis() {
      this.addNewAxisDia = false;
      this.showBackdrop = false;
    },
    async saveAddAxisBtn() {
      if (this.input.column.length == 0 && this.input.unit.length == 0) {
        this.redNotify("Please input column / unit");
        return;
      }

      if (this.input.minLimitCheck) {
        if (this.input.minLimitValue.length == 0) {
          this.redNotify("Please input min limit value");
          return;
        }
      }

      if (this.input.maxLimitCheck) {
        if (this.input.maxLimitValue.length == 0) {
          this.redNotify("Please input max limit value");
          return;
        }
      }
      let temp = {
        axis: this.input.axis,
        column: this.input.column,
        unit: this.input.unit,
        minLimit: this.input.minLimitCheck ? 1 : 0,
        minLimitValue: this.input.minLimitCheck
          ? this.input.minLimitValue
          : "-",
        maxLimit: this.input.maxLimitCheck ? 1 : 0,
        maxLimitValue: this.input.maxLimitCheck
          ? this.input.maxLimitValue
          : "-",
        projectID: this.projectID,
        sensorID: this.data.id,
      };
      let url = this.apiPath + "saveaxis.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.closeAddNewAxis();
        this.greenNotify("Add axis complete");
        this.loadAxis();
        this.$emit("clickReload");
      }
    },
    addAxisBtn() {
      this.showBackdrop = true;
      this.addNewAxisDia = true;
      this.input.axis = "x";
      this.input.column = "1";
      this.input.unit = "";
      this.input.minLimitCheck = false;
      this.input.minLimitValue = "";
      this.input.maxLimitCheck = false;
      this.input.maxLimitValue = "";
    },
    //loadImage

    closeEditPicBtn2() {
      this.showBackdrop = false;
      this.addPicDia = false;
    },
    loadImage() {
      if (this.data.picture == 0) {
        return this.apiPath + "sensor/nophoto.jpg";
      } else {
        return (
          this.apiPath +
          "sensor/" +
          this.data.id +
          ".jpg?" +
          Math.floor(Math.random() * 900) +
          100
        );
      }
    },
    addEditPic() {
      this.showBackdrop = true;
      this.addPicDia = true;
    },
    async saveEditPicBtn() {
      if (this.fileName == null) {
        this.redNotify("Please select filename");
        return;
      }
      let url = this.apiPath + "addsensorpic.php";
      const formData = new FormData();
      formData.append("projectID", this.projectID);
      formData.append("sensorID", this.data.id);
      formData.append("fileName", this.fileName[0].name);
      formData.append("fileNameData", this.fileName[0]);
      const headers = { "Content-Type": "multipart/form-data" };
      let res2 = await axios.post(url, formData, { headers });
      if (res2.data == "finish") {
        this.closeEditPicBtn();
        this.greenNotify("edit picutre complete");
        this.$emit("clickReload");
      }
    },
    closeEditPicBtn() {
      this.showBackdrop = false;
      this.addPicDia = false;
    },
    // edit sensor
    async saveEditSensorBtn() {
      let temp = {
        id: this.editSensor.id,
        name: this.editSensor.name,
        sid: this.editSensor.sid,
      };
      let url = this.apiPath + "editsensor.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.$emit("clickReload");
      if (res.data == "finish") {
        this.closeEditSensor();
        this.greenNotify("Edit sensor complete");
        this.$emit("clickReload");
      }
    },
    closeEditSensor() {
      this.editSensorDia = false;
      this.showBackdrop = false;
    },
    async loadSensorType() {
      let url = this.apiPath + "loadSensor.php";
      let res = await axios.get(url);
      this.sensorList = [];
      res.data.forEach((x) => {
        let temp = {
          value: x.id,
          label: x.sensortype,
        };
        this.sensorList.push(temp);
      });
      this.sensorList.sort((a, b) => (a.label > b.label ? 1 : -1));
    },
    editSensorBtn() {
      this.editSensorDia = true;
      this.showBackdrop = true;
      this.editSensor.id = this.data.id;
      this.editSensor.name = this.data.name;
      this.editSensor.sid = this.data.sid;
    },

    // delete sensor
    delSensorBtn() {
      this.delSensorDia = true;
      this.showBackdrop = true;
    },
    closeDelSensorDiaBtn() {
      this.delSensorDia = false;
      this.showBackdrop = false;
    },
    async delSensorConfirmBtn() {
      let temp = {
        id: this.data.id,
      };
      let url = this.apiPath + "delsensor.php";
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.closeDelSensorDiaBtn();
        this.$emit("clickReload");
      }
    },
    //Active inactive
    async activeBtn(value) {
      let temp = {
        id: this.data.id,
        value: value,
      };

      let url = this.apiPath + "activesensor.php";
      let res = await axios.post(url, JSON.stringify(temp));

      if (res.data == "finish") {
        this.$emit("clickReload");
      }
    },
  },
  mounted() {
    this.loadSensorType();
    this.loadAxis();
  },
};
</script>

<style lang="scss" scoped>
.textC {
  text-align: center;
}
.boxbtn {
  width: 40px;
  border: 1px solid black;
  text-align: center;
  cursor: pointer;
}
.axisDia {
  min-width: 900px;
  height: 400px;
  overflow: hidden;
}
.bargreen {
  background-color: #387377;
  color: white;
}
.mainbox {
  background-color: #f5f5f5;
  height: 380px;
  margin-bottom: 20px;
}
.font-topic {
  font-size: 24px;
}
.greenIcon {
  color: #287377;
  font-size: 20px;
  cursor: pointer;
}
.gbtn {
  background-color: #287377;
  color: white;
  width: 70px;
  text-align: center;
  border-radius: 100px;
  cursor: pointer;
}

.rbtn {
  background-color: #ee4873;
  color: white;
  width: 70px;
  text-align: center;
  border-radius: 100px;
  cursor: pointer;
}
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
.addSensorDia {
  min-width: 800px;
  height: 288px;
}
.addPicDia {
  width: 100%;
  max-width: 725px;
  height: 210px;
  overflow: hidden;
}
</style>
