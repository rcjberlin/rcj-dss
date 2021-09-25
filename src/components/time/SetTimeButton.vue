<template>
  <div>
    <button id="btn-set-time" v-on:click="openSetTimeModal">{{ tg("buttonSetTime") }}</button>
    <modal :title="tg('buttonSetTime')" :showModal="showSetTimeModal" @hide="closeSetTimeModal" :options="{ hideOnClickOutside: false }">
      Hello, World!
      <div style="display: flex; justify-content: flex-end">
        <button class="fg-btn" v-on:click="closeSetTimeModal">{{ tg("cancel") }}</button>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "../layout/Modal.vue";

export default defineComponent({
  name: "SetTimeButton",
  components: { Modal },
  data() {
    return {
      showSetTimeModal: false,
    };
  },
  methods: {
    tg(key: string): string {
      return this.$t("general." + key);
    },
    openSetTimeModal(): void {
      this.showSetTimeModal = true;
    },
    closeSetTimeModal(): void {
      this.showSetTimeModal = false;
    },
  },
});
</script>

<style scoped>
/* set font size of "set time" button depending on width */
#btn-set-time {
  font-size: 0.75em;
}
@media only screen and (min-width: 360px) {
  #btn-set-time {
    font-size: 1em;
  }
}
@media only screen and (min-width: 500px) {
  #btn-set-time {
    font-size: 1.25em;
  }
}
</style>
