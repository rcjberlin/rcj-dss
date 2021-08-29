import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { IState } from "@/types";

declare module "@vue/runtime-core" {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<IState>;
  }
}
