<template>
  <div class="mainDiv shadow-4">
    <div class="row">
      <div class="leftMenu">
        <leftMenu :data="projectData" :menu="menuIndex" />
      </div>
      <div class="col rightArea">
        <div class="row justify-between">
          <div class="font24 q-pa-md">Sensor</div>

          <div class="q-pa-md row">
            <sensor-type />
            <q-btn
              label="Add new sensor"
              outline
              no-caps
              class="longBtn q-mx-md"
            />
            <q-btn
              label="Generate table"
              no-caps
              class="longBtn q-mr-md activeBtn"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import leftMenu from "../components/leftmenu";
import sensorType from "../components/sensortype";
export default {
  components: { leftMenu, sensorType },
  data() {
    return {
      projectId: 0,
      menuIndex: 2,
      projectData: {
        id: 1,
        name: "Param 5 bridge",
        shortURL: "Param 5",
        address: "Nontraburi 11000",
        isPassword: true,
        startLogDate: "21/5/2021",
        startLogTime: "10:30",
        dataDuration: "3600",
        status: true,
      },
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
  },
  mounted() {
    this.projectId = this.$route.params.id;
    this.loadProjectInfo();
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
</style>
