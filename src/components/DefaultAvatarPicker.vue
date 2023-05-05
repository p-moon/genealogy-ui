<template>
  <div class="avatar-picker">
    <div class="avatar-row" v-for="(avatars, index) in avatarGroups" :key="index">
      <img alt="" v-for="avatar in avatars"
           :key="avatar"
           @click="selectAvatar(avatar)"
           :src="avatar"
           style="width: 35px;height: 35px;border-radius: 5px;margin-right: 10px">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";

export default defineComponent({
  name: 'DefaultAvatarPicker',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    avatars: {
      type: Array as PropType<String[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const importAll = (r: __WebpackModuleApi.RequireContext) =>
      r.keys().forEach((key: string) => props.avatars?.push(r(key)))
    importAll(require.context('@/assets/avatars', true, /\.(png|jpe?g|gif|svg|webp)$/))

    const avatarGroups = computed(() => {
      const groups = [];
      const groupSize = 6;
      for (let i = 0; i < props.avatars!.length; i += groupSize) {
        groups.push(props.avatars!.slice(i, i + groupSize));
      }
      return groups;
    });

    function selectAvatar(avatar: string) {
      emit('update:modelValue', avatar)
    }

    return {
      selectAvatar,
      avatarGroups
    }
  }
})
</script>

<style scoped>
.avatar-picker {
    display: flex;
    flex-wrap: wrap;
}

.avatar-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 100%;
    margin-bottom: 10px;
}

.el-avatar {
    margin: 5px;
}
</style>
