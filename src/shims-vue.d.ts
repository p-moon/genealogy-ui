/* eslint-disable */
import { State } from "@/store";

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  // make sure to add this if using Vuex 4.x
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
