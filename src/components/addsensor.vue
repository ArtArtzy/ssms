<template>
  <div>
    <q-btn
      label="Add new sensor"
      outline
      no-caps
      class="longBtn"
      @click="addSensorBtn()"
    />
    <div class="fullscreen backdrop" v-show="showBackdrop"></div>
    <q-dialog v-model="addSensorDia" persistent transition-hide="flip-down">
      <q-card class="addSensorDia">
        <div class="row">
          <div class="leftDia">
            <img src="../../public/image/sensor01.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Add new sensor</div>
            <div class="q-px-md row">
              <div class="col-3 q-pt-md">
                <div>name</div>
              </div>
              <div class="col-8">
                <q-input v-model="sensor.name" dense />
              </div>
            </div>
            <div class="q-px-md row q-pt-md">
              <div class="col-3 q-pt-md">
                <div>type</div>
              </div>
              <div class="col-8">
                <q-select
                  v-model="sensor.type"
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
                  @click="closeAddNewSensor()"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="addNewSensorBtn()"
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
  props: ["projectID"],
  data() {
    return {
      showBackdrop: false,
      addSensorDia: false,
      sensor: {
        name: "",
        type: "",
      },
      sensorList: [],
    };
  },
  methods: {
    addSensorBtn() {
      this.showBackdrop = true;
      this.addSensorDia = true;
      this.sensor.name = "";
      this.sensor.type = this.sensorList[0].value;
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
      this.sensor.type = this.sensorList[0].value;
    },
    closeAddNewSensor() {
      this.showBackdrop = false;
      this.addSensorDia = false;
    },
    async addNewSensorBtn() {
      if (this.sensor.name.length == 0) {
        this.redNotify("Please fill in sensor name");
        return;
      }
      let temp = {
        projectID: this.projectID,
        name: this.sensor.name,
        type: this.sensor.type,
      };
      let url = this.apiPath + "savenewsensor.php";
      let res = await axios.post(url, JSON.stringify(temp));
      this.closeAddNewSensor();
      this.$emit("clickReload");
    },
  },
  mounted() {
    this.loadSensorType();
  },
};
</script>

<style lang="scss" scoped>
.addSensorDia {
  min-width: 800px;
  height: 288px;
}
</style>
