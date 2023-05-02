<template>
  <div>
    <div style="background-color: #fa7b7e;padding:10px;width:100%;">这里是图谱插槽 slot="graph-plug"</div>
    <div style="background-color: #7a9ef8;padding:10px;width:100%;">可以自定义这里的内容，比如你可以放一个搜索框：<el-input v-model="searchText" placeholder="你可以通过这个搜素框实现节点搜索功能" /></div>
    <div style="background-color: #7a9ef8;padding:10px;width:100%;">你需要设置这个插槽div的z-index>1000才能让这里展示在节点之上，否则它默认会被节点覆盖</div>
    <div style="background-color: #c67ffa;padding:10px;width:100%;">你可以把悬浮菜单放到这里，这样全屏后，右键菜单依然有效，点击图谱全屏按钮后再点击节点试试</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Node } from "@/storage/model/Node";

export default defineComponent({
  name: "RelationGraphMenu",
  components: {},
  props: {
  },
  setup() {
    const searchText = ref("");
    return {searchText};
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
