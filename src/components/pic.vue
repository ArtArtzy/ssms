<template>
  <div class="row justify-center">
    <div class="bigPic shadow-4">
      <div class="row justify-between">
        <div class="q-px-md q-py-sm">{{ data.orderID }} - {{ data.label }}</div>
        <div class="row q-py-sm q-px-md">
          <div>
            <q-icon
              name="fa-solid fa-trash-can"
              size="20px"
              @click="delPicDia = true"
              class="cursor-pointer"
            />
          </div>
          <div class="q-pl-md">
            <q-icon
              name="fa-solid fa-file-pen"
              size="20px"
              @click="
                editPicDia = true;
                editDelPic = false;
              "
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <hr />
      <div>
        <img :src="data.realName" alt="" width="100%" />
      </div>
    </div>
    <div class="fullscreen backdrop" v-show="delPicDia || editPicDia"></div>
    <!-- Picture delete -->
    <q-dialog v-model="delPicDia" persistent transition-hide="flip-down">
      <q-card class="delUserDia">
        <div class="row">
          <div style="width: 280px">
            <img src="../../public/image/del.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-pa-md">Confirm delete</div>
            <div class="q-px-md">Do you want to delete this picture?</div>
            <div class="row justify-center q-pt-xl">
              <div>
                <q-btn
                  label="Cancel"
                  outline
                  no-caps
                  class="shortBtn"
                  @click="delPicDia = false"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Delete"
                  class="activeBtn shortBtn"
                  no-caps
                  @click="delConfirmPicBtn()"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- edit -->
    <q-dialog v-model="editPicDia" persistent transition-hide="flip-down">
      <q-card class="addNewPicDia">
        <div class="row">
          <div class="addPicLeft">
            <img src="../../public/image/pic02.jpg" alt="" />
          </div>
          <div class="col">
            <div class="font24 q-px-md q-pt-md">Edit picture</div>
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
            <div class="row" v-if="!editDelPic">
              <div class="col-3 q-pl-md q-pt-md">
                <div>Filename</div>
                <div class="font10">850x450px JPG</div>
              </div>
              <div class="col-7 q-pt-md">
                <q-input v-model="addNewPic.fileName" dense="" readonly="" />
              </div>
              <div class="col-1 q-pt-md">
                <q-icon
                  name="fa-solid fa-trash-can"
                  size="20px"
                  @click="editDelPicBtn()"
                  class="cursor-pointer q-pt-sm"
                />
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-3 q-pl-md q-pt-md">
                <div>Filename</div>
                <div class="font10">850x450px JPG</div>
              </div>
              <div class="col-8 q-pt-md">
                <q-input
                  v-model="addNewPic.fileNameNew"
                  dense=""
                  readonly=""
                  type="file"
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
                  @click="editPicDia = false"
                />
              </div>
              <div style="width: 30px"></div>
              <div>
                <q-btn
                  label="Save"
                  color="teal-9"
                  no-caps
                  style="width: 120px"
                  @click="saveEditPicDia()"
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
  props: ["data"],
  data() {
    return {
      delPicDia: false,
      editPicDia: false,
      addNewPic: {
        orderID: "",
        label: "",
        fileName: "",
        fileNameNew: null,
      },
      editDelPic: false,
    };
  },
  methods: {
    async delConfirmPicBtn() {
      let url = this.apiPath + "delpic.php";
      let temp = {
        delId: this.data.id,
      };
      let res = await axios.post(url, JSON.stringify(temp));
      if (res.data == "finish") {
        this.greenNotify("Delete picture complete");
        this.delPicDia = false;
        this.$emit("clickReload");
        // this.loadUser();
        // this.closeDelUserDiaBtn();
      }
    },
    loadData() {
      this.addNewPic.orderID = this.data.orderID;
      this.addNewPic.label = this.data.label;
      this.addNewPic.fileName = this.data.fileName;
    },
    editDelPicBtn() {
      this.editDelPic = true;
    },
    async saveEditPicDia() {
      if (
        this.addNewPic.orderID.length == 0 ||
        this.addNewPic.label.length == 0
      ) {
        this.redNotify("Please input all fields");
        return;
      }
      if (this.editDelPic) {
        if (this.addNewPic.fileNameNew == null) {
          this.redNotify("Please input all fields");
          return;
        }
      }
      if (!this.editDelPic) {
        let temp = {
          id: this.data.id,
          orderID: this.addNewPic.orderID,
          label: this.addNewPic.label,
        };
        let url = this.apiPath + "editPicLabel.php";
        let res = await axios.post(url, JSON.stringify(temp));
        this.editPicDia = false;
        this.$emit("clickReload");
      } else {
        let url = this.apiPath + "editAddpic.php";
        const formData = new FormData();
        formData.append("id", this.data.id);
        formData.append("orderID", this.addNewPic.orderID);
        formData.append("label", this.addNewPic.label);
        formData.append("fileName", this.addNewPic.fileNameNew[0].name);
        formData.append("fileNameData", this.addNewPic.fileNameNew[0]);
        const headers = { "Content-Type": "multipart/form-data" };
        let res2 = await axios.post(url, formData, { headers });
        this.editPicDia = false;
        this.$emit("clickReload");
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.bigPic {
  width: 80%;
  margin: 20px;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
.delUserDia {
  width: 100%;
  max-width: 625px;
  height: 210px;
  overflow: hidden;
}
.addNewPicDia {
  width: 100%;
  max-width: 900px;
  height: 320px;
  overflow: hidden;
}
</style>
