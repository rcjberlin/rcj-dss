<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Login extends Vue {}
</script>
