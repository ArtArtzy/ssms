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
            <q-checkbox v-model="sReport.cover" label="Report front cover" />
          </div>
          <div>
            <q-checkbox v-model="sReport.info" label="Project info" />
          </div>
          <div>
            <q-checkbox
              v-model="sReport.overview"
              label="Overview chart & limit"
            />
          </div>
          <div>
            <q-checkbox v-model="sReport.chart" label="Indiviual chart" />
          </div>
          <div>
            <q-checkbox v-model="sReport.limit" label="Over limit event" />
          </div>
          <div>
            <q-checkbox v-model="sReport.conclusion" label="Conclusion" />
          </div>
        </div>
        <div style="height: 20px"></div>
        <div class="boxTop">
          <div class="row justify-between q-px-md q-pt-md">
            <div class="font24">Auto generate report</div>
            <div>
              <q-btn label="Email" no-caps="" class="shortBtn activeBtn" />
            </div>
          </div>
          <div class="row q-px-md">
            <div style="width: 100px">
              <q-checkbox label="Daily" v-model="aReport.daily" />
            </div>
            <div style="width: 100px">
              <q-checkbox label="Weekly" v-model="aReport.weekly" />
            </div>
            <div style="width: 100px">
              <q-checkbox label="Monthly" v-model="aReport.monthly" />
            </div>
          </div>
          <hr />
          <div class="q-px-md">
            <div>
              <q-checkbox v-model="aReport.cover" label="Report front cover" />
            </div>
            <div>
              <q-checkbox v-model="aReport.info" label="Project info" />
            </div>
            <div>
              <q-checkbox
                v-model="aReport.overview"
                label="Overview chart & limit"
              />
            </div>
            <div>
              <q-checkbox v-model="aReport.chart" label="Indiviual chart" />
            </div>
            <div>
              <q-checkbox v-model="aReport.limit" label="Over limit event" />
            </div>
            <div class="q-pb-md">
              <q-checkbox v-model="aReport.conclusion" label="Conclusion" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import leftMenu from "../components/leftmenu";
export default {
  components: { leftMenu },
  data() {
    return {
      projectId: 0,
      menuIndex: 3,
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
      this.projectData.isPassword =
        res.data[0].isPassword == 0 ? "-" : res.data[0].password;
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
.boxTop {
  width: 90%;
  border: 1px solid #837f7f;
  margin: auto;
}
</style>
