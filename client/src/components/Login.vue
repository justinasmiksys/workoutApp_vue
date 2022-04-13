<template>
    <form class="container-form flex flex-col bg-white px-6 py-6 rounded-xl">
      <h1 class="font-bold text-2xl mb-6">Login</h1>
      <label class="input-label" for="email">Email:</label>
        <input
          id="email"
          v-model="inputs.email"
          class="input-field"
          type="text"
          placeholder="Email"
          required
        />
        <label class="input-label" for="password">Password:</label>
        <input
          id="password"
          v-model="inputs.password"
          class="input-field"
          type="password"
          placeholder="Password"
          required
        />

        <div class="text-red-600">{{this.$store.state.Auth.error}}</div>

        <button @click="handleSubmit" class="btn self-center">Log In</button>

        <p class="self-center">Do not have an account? <span class="border-b cursor-pointer hover:bg-gray-300" @click="this.setSignupState(true)">Signup</span></p>

      </form>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'Login',
    data(){
      return {
        inputs: {
          email:'',
          password:'',
        }
      }
    },
    methods: {
    ...mapMutations(['setSignupState', 'setError']),
    ...mapActions(['login']),
    handleSubmit(e){
      e.preventDefault()
      try {
        this.setError("")
        const payload = {
          email:this.inputs.email,
          password:this.inputs.password
        }
        this.login(payload)
      } catch (err) {
        this.setError("Failed to log in");
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
 .container-form{
     width:400px;
     box-shadow: 7px 7px 16px 2px rgba(69,69,69,0.36);
 }

 form {
     color: #242423;
 }

 input:focus {
  outline: none;
  border-bottom: 1px solid;
}

@media only screen and (max-width: 500px) {

  .container-form{
    width:100%;
  }

}
</style>
