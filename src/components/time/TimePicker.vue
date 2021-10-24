<template>
  <div style="text-align: center; margin-bottom: 2vw">
    <div class="time-input-box">
      <div class="pointer-cursor" @click="minutesPlus">+</div>
      <div>
        <input
          type="text"
          inputmode="numeric"
          class="number-input-no-spinner"
          v-model="minutesStr"
          @input="validateInputMinutes"
          @change="updateMinutesAndSeconds"
          @keydown.up="minutesPlus"
          @keydown.down="minutesMinus"
        />
      </div>
      <div class="pointer-cursor" @click="minutesMinus">-</div>
    </div>
    <div class="time-input-box">
      <div class="pointer-cursor" @click="secondsPlus">+</div>
      <div>
        <input
          type="text"
          inputmode="numeric"
          class="number-input-no-spinner"
          v-model="secondsStr"
          @input="validateInputSeconds"
          @change="updateMinutesAndSeconds"
          @keydown.up="secondsPlus"
          @keydown.down="secondsMinus"
        />
      </div>
      <div class="pointer-cursor" @click="secondsMinus">-</div>
    </div>
  </div>
</template>

<script lang="ts">
import { pad } from "@/helpers/formatting";
import { defineComponent } from "vue";

const numbers = "0123456789";

export default defineComponent({
  name: "TimePicker",
  emits: ["setTimeInSeconds"],
  props: {
    isShown: Boolean,
  },
  data() {
    return {
      minutesStr: "00",
      secondsStr: "00",
      minutes: 0,
      seconds: 0,
    };
  },
  watch: {
    isShown(): void {
      if (this.isShown) this.initFromRunTime();
    },
  },
  methods: {
    initFromRunTime(): void {
      const time = this.$store.getters.runTime;
      this.minutes = Math.floor(time / 60);
      this.seconds = Math.floor(time % 60);
      this.updateMinutesAndSecondsStr();
    },
    validateInputMinutes(event: InputEvent): void {
      this.preventNonNumberInput("minutesStr", event);
    },
    validateInputSeconds(event: InputEvent): void {
      this.preventNonNumberInput("secondsStr", event);
    },
    preventNonNumberInput(el: "minutesStr" | "secondsStr", event: InputEvent): void {
      if (event.inputType === "insertText" && !numbers.includes(event.data || "")) {
        // user entered a non-number
        let newValue = "";
        for (const character of this[el]) {
          if (numbers.includes(character)) {
            newValue += character;
          }
        }
        this[el] = newValue;
      }
    },
    updateMinutesAndSeconds(): void {
      this.minutes = Number(this.minutesStr);
      this.seconds = Number(this.secondsStr);
      this.updateMinutesAndSecondsStr(); // we validate min/sec + might update text again
    },
    updateMinutesAndSecondsStr(): void {
      this.validateMinutesAndSeconds();
      this.minutesStr = pad(this.minutes, 2, "0");
      this.secondsStr = pad(this.seconds, 2, "0");
    },
    validateMinutesAndSeconds(): void {
      if (this.seconds > 59) {
        this.minutes += Math.floor(this.seconds / 60);
        this.seconds = this.seconds % 60;
      } else if (this.seconds < 0) {
        // this can only be the case if the minus button was pressed
        this.minutes -= 1;
        this.seconds += 60;
      }
      if (this.minutes >= 8) {
        this.minutes = 8;
        this.seconds = 0;
      } else if (this.minutes < 0) {
        this.minutes = 0;
        this.seconds = 0;
      }
      this.$emit("setTimeInSeconds", this.minutes * 60 + this.seconds);
    },
    minutesPlus(): void {
      this.minutes++;
      this.updateMinutesAndSecondsStr();
    },
    minutesMinus(): void {
      this.minutes--;
      this.updateMinutesAndSecondsStr();
    },
    secondsPlus(): void {
      this.seconds++;
      this.updateMinutesAndSecondsStr();
    },
    secondsMinus(): void {
      this.seconds--;
      this.updateMinutesAndSecondsStr();
    },
  },
});
</script>

<style scoped>
.time-input-box {
  display: inline-block;
  color: var(--text-color);
  background: var(--theme-color);
  font-size: 1.5em;
  margin: 4px;
  border-radius: 8px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
input.number-input-no-spinner {
  width: 2em;
  text-align: center;
  border: 0;
  background: inherit;
  color: inherit;
  font-size: inherit;
}
.number-input-no-spinner,
.number-input-no-spinner::-webkit-outer-spin-button,
.number-input-no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;
}
</style>
