<template>
  <div class="leftMenuDiv">
    <div class="projectNameDiv">{{ data.name }}</div>
    <div style="height: 7px"></div>
    <div
      class="row q-pa-md"
      :class="{ bgselected: menu == 1, 'cursor-pointer': menu != 1 }"
    >
      <div>
        <q-icon name="fa-solid fa-circle-info" color="white" size="24px" />
      </div>
      <div class="menuText">Information</div>
    </div>
    <hr />
    <div
      class="row q-pa-md"
      :class="{ bgselected: menu == 2, 'cursor-pointer': menu != 2 }"
    >
      <div>
        <q-icon
          name="fa-solid fa-temperature-three-quarters"
          color="white"
          size="24px"
        />
      </div>
      <div class="menuText">Sensor</div>
    </div>
    <hr />
    <div
      class="row q-pa-md"
      :class="{ bgselected: menu == 3, 'cursor-pointer': menu != 3 }"
    >
      <div>
        <q-icon name="fa-regular fa-file-lines" color="white" size="24px" />
      </div>
      <div class="menuText">Report</div>
    </div>
    <hr />

    <div class="exitMenu">
      <hr />
      <div class="row q-pa-md cursor-pointer" @click="backToMenu()">
        <div>
          <q-icon
            name="fa-solid fa-right-from-bracket"
            color="white"
            size="24px"
          />
        </div>
        <div class="menuText">Back to main menu</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "menu"],
  methods: {
    backToMenu() {
      this.$router.push("/mainmenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.leftMenuDiv {
  width: 300px;
  height: 100vh;
  background-color: #1d1939;
}
.projectNameDiv {
  width: 100%;
  height: 60px;
  background-color: #287377;
  color: white;
  font-size: 24px;
  text-align: center;
  padding-top: 12px;
}
.menuText {
  color: white;
  padding-left: 10px;
  font-size: 18px;
}
hr {
  height: 1px;
  background-color: grey;
  border: none;
}
.exitMenu {
  position: absolute;
  bottom: 0px;
  width: 300px;
}
.bgselected {
  background-color: rgba(40, 115, 119, 0.5);
}
</style>
