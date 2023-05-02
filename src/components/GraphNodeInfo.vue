<template>
  <div>
<!--    <el-avatar shape="square" :size="50" src="/img/icons/WechatIMG12780.jpeg" />-->
    <img src="/img/icons/WechatIMG12780.jpeg" alt="sss" style="width: 60px;height: 60px">
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphNodeInfo",
  components: { },
  props: {
    node: {
      type: Object as () => Node,
      required: true,
    },
  },
  setup() {
    return {
    };
  },
});
</script>
<style scoped>
.node-menu-panel {
    padding: 10px;
    background-color: #ffffff;
    border: #eeeeee solid 1px;
    box-shadow: 0 0 8px #cccccc;
    position: absolute;
    z-index: 999;
}
</style>
