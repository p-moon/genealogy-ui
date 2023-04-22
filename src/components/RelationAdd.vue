<template>
  <el-form ref="relationAddForm" :model="relationAddForm" label-width="120px" class="demo-dynamic">
    <el-form-item prop="from" label="起始节点">
      <el-select v-model="relationAddForm.from" filterable placeholder="请选择">
        <el-option v-for="item in this.$store.state.graph_json_data.nodes"
                   :key="item.id" :label="item.text" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="to" label="指向节点">
      <el-select v-model="relationAddForm.to" filterable placeholder="请选择">
        <el-option v-for="item in this.$store.state.graph_json_data.nodes"
                   :key="item.id" :label="item.text" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="text" label="关系" :rules="[{required: true,message: '请输入用户名称',trigger: 'blur',}]">
      <el-input v-model="relationAddForm.text" placeholder="两个节点是什么关系"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {RelationGraph} from "@/storage/RelationGraphStorge";

export default {
  name: "RelationAdd",
  data() {
    return {
      relationAddForm: {
        from: "",
        to: "",
        text: "",
      }
    };
  },
  methods: {
    submitForm() {
      let that = this
      this.$refs["relationAddForm"].validate(function (isValid, invalidFields) {
        if (!isValid) {
          return;
        }
        that.doSubmit();
      });
    },
    doSubmit() {
      let from = this.relationAddForm.from;
      let to = this.relationAddForm.to;
      let text = this.relationAddForm.text;
      RelationGraph.addLine({from: from, to: to, text: text})
      this.resetForm();
    },
    resetForm() {
      this.$refs["relationAddForm"].resetFields();
    }
  }

}
</script>

<style scoped>

</style>
