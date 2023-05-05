<template>
  <div class="color-picker">
    <el-color-picker v-model="modelValue" size="large" />
    <div v-for="color in colors"
         :key="color"
         @click="selectColor(color)"
         :style="{ backgroundColor: color }"
         class="color-box">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: 'ColorPicker',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    function selectColor(color: string) {
      emit('update:modelValue', color)
    }

    return {
      selectColor
    }
  }
})
</script>

<style scoped>
.color-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.color-box {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 1px;
    cursor: pointer;
}
</style>
