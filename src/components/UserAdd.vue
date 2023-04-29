<template>
  <el-form ref="userAddForm" :model="userAddForm" label-width="120px" class="demo-dynamic">
    <el-form-item prop="name" label="节点名称" :rules="[{required: true,message: '请输入用户名称',trigger: 'blur',}]">
      <el-input v-model="userAddForm.name"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import {relationGraphStorage} from "@/storage/RelationGraphStorge"
import Node from "@/storage/model/Node";

export default {
  name: "UserAdd",
  data() {
    return {
      userAddForm: {
        name: ""
      }
    };
  },
  methods: {
    submitForm() {
      let that = this
      this.$refs["userAddForm"].validate(function (isValid, invalidFields) {
        if (!isValid) {
          return;
        }
        that.doSubmit();
      });
    },
    doSubmit() {
      let name = this.userAddForm.name;
      let node = {id: name, text: name, borderColor: "yellow"}
      relationGraphStorage.addGraphNode(node)
      this.resetForm();
    },
    resetForm() {
      this.$refs["userAddForm"].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
