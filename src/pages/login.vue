<template>
  <div class="bg fullscreen shadow-4">
    <div class="topBar row shadow-4">
      <div class="q-pl-md q-pt-xs">
        <img src="../../public/image/favicon.svg" alt="" />
      </div>
      <div class="titlePro">Smart Sensor Monitoring System</div>
    </div>
    <div class="logindiv shadow-4 absolute-center">
      <div class="q-pt-lg centerDiv">
        <img src="../../public/image/favicon.svg" width="115px" alt="" />
      </div>
      <div class="titlename q-pt-md">SMART SENSOR</div>
      <div class="subTitle">MONITORING SYSTEM</div>
      <div class="row justify-center q-pt-md">
        <q-input
          label="username"
          class="inputline"
          v-model="input.username"
          dense=""
        />
      </div>
      <div class="row justify-center q-pt-sm">
        <q-input
          label="password"
          class="inputline"
          v-model="input.password"
          type="password"
          dense=""
        />
      </div>
      <div class="row justify-center q-pt-lg">
        <q-btn
          color="teal-9"
          label="login"
          class="loginbtn"
          @click="loginBtn()"
        />
      </div>
    </div>
    <div class="footer">Developed by Artis Software House.</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginBtn() {
      this.$router.push("mainmenu");
    },
    async loginBtn() {
      if (this.input.username.length == 0 || this.input.password.length == 0) {
        this.redNotify("Please input username/password");
        return;
      }
      let url = this.apiPath + "login.php";
      let res = await axios.post(url, JSON.stringify(this.input));
      if (res.data == "Not pass") {
        this.redNotify("Username/password incorrect");
        return;
      }
      this.$q.localStorage.set("keypass", res.data);
      this.$router.push("/mainmenu");
    },
    async redirect() {
      let keyHash = this.$q.localStorage.getItem("keypass");
      let url = this.apiPath + "checkhashkey.php";
      let temp = {
        hashkey: keyHash,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "pass") {
        this.$router.push("/mainmenu");
      }
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>

<style lang="scss" scoped>
.logindiv {
  width: 430px;
  height: 440px;
  border-radius: 10px;
  background-color: white;
}
.bg {
  width: 100%;
  max-width: 1400px;
  margin: auto;
  background-image: url("./../../public/image/bg.jpg");
  background-size: cover;
}
.brx {
  border: 1px red solid;
}
.titlename {
  font-size: 36px;
  text-align: center;
}
.subTitle {
  font-size: 20px;
  text-align: center;
}
.inputline {
  width: 200px;
}
.loginbtn {
  width: 160px;
}
.centerDiv {
  text-align: center;
}
.topBar {
  height: 40px;
  background-color: #585858;
}
.titlePro {
  color: white;
  font-size: 18px;
  padding-top: 7px;
  padding-left: 10px;
}
.footer {
  height: 40px;
  background-color: #585858;
  position: absolute;
  bottom: 0px;
  width: 100%;
  color: white;
  text-align: right;
  font-size: 18px;
  padding-right: 10px;
  padding-top: 5px;
}
</style>
