<template>
  <div class="details-box">
    <button class="header no-button-styling pointer-cursor" @click="() => (showDetails = !showDetails)">
      <div class="title-with-optional-icon">
        <div class="icon"><slot name="icon"></slot></div>
        <h2>{{ title }}</h2>
      </div>
      <svg viewBox="0 0 10 10">
        <polyline
          :points="showDetails ? '2,5 5,2 8,5' : '2,3 5,6 8,3'"
          stroke="var(--text-color)"
          fill="none"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="details">
      <slot v-if="showDetails === true" name="details"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetailsBox",
  props: {
    title: String,
  },
  data() {
    return {
      showDetails: false,
    };
  },
});
</script>

<style scoped>
.details-box {
  text-align: left;
}
.details-box .header {
  width: 100%;
  border: none;
  background-color: inherit;
  margin: 0;
  margin-bottom: 8px;
  padding: 8px;
  padding-bottom: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.details-box .header .title-with-optional-icon {
  display: flex;
  align-items: center;
  color: var(--text-color);
}
.details-box .header .title-with-optional-icon .icon {
  margin-right: 8px;
}
.details-box .header h2 {
  text-align: left;
  margin: 0;
}
.details-box .header svg {
  width: 2em;
  flex-shrink: 0;
}
.details-box .details {
  margin: 8px;
  margin-left: 10px;
}
</style>
