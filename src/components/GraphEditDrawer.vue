<template>
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        哈哈哈
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { ref } from '@vue/reactivity';
import { defineComponent } from "vue";

export default defineComponent({
  name: 'GraphEditDrawer',
  setup() {
    const drawer = ref<boolean>(false)

    const cancelClick = () => {

    }
    const confirmClick = () => {}

    const showDrawer = () => {
      drawer.value = true
    }

    return {
      drawer,
      cancelClick,
      confirmClick,
      showDrawer,
    }
  },
})
</script>
