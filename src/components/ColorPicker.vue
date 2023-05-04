<template>
  <div class="color-picker">
    <el-color-picker v-model="selectedColor" size="large" />
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
    const selectedColor = ref(props.modelValue)

    function selectColor(color: string) {
      selectedColor.value = color
      emit('update:modelValue', color)
    }

    return {
      selectedColor,
      selectColor
    }
  },
  watch: {
    modelValue(newValue: string) {
      this.selectedColor = newValue
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
