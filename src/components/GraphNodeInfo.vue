<template>
  <div>
    <div class="c-my-node"
         :style="{'background-image': 'url(/img/icon.png)', border:'#decd16 solid 1px'}">
      <div class="c-node-name" :style="{color: node.fontColor}">{{ node.text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: "GraphNodeInfo",
  components: {},
  props: {
    node: {
      type: Object as () => Node,
      required: true
    }
  },
  setup() {
    return {};
  }
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

.c-my-node {
    background-position: center center;
    background-size: 100%;
    border: #ff8c00 solid 1px;
    height: 80px;
    width: 80px;
    border-radius: 42px;
}

.c-node-name {
    width: 160px;
    margin-left: -40px;
    text-align: center;
    margin-top: 85px;
}
</style>
