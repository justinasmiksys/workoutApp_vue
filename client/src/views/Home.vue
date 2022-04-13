<template>

  <div class="h-full" v-if='this.$store.state.Auth.user'>
    <Profile />
  </div>

  <div v-else class="home flex h-full">
    <div class='mt-32 ml-16 left'>
      <p class="h-1">Plan Your Workouts</p>
    </div>

    <div class='flex justify-center mt-64 right'>
      <div>
        <div v-if="!this.$store.state.Auth.signupState">
          <Login />
        </div>
        <div v-else>
          <Signup />
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Profile from '../components/Profile.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Signup,
    Profile
  }
}
</script>

<style scoped>
  .left{
    width:50%;
    margin-bottom: 5rem;
  }

  .right{
    width:50%;
  }

  .home{
    background-image: linear-gradient(to left, #F5CB5C, rgba(255, 255, 255, 0.452)),
    url("../assets/Background.jpg");
    background-size: cover;
  }

  p{
    font-size:5rem;
    color: #242423;
    font-weight:bold;
    text-transform: uppercase;
  }

  .h-1{
    transform: translate(2rem, -5rem)
  }


@media only screen and (max-width: 1200px) {
   .home{
     flex-direction:column;
     align-items:center;
  }

    .left{
      justify-self: center;
    }

    .right{
      margin-top: 0;
    }

  .h-1{
    font-size: 3rem;
  }

}

@media only screen and (max-width: 610px) {

  .h-1{
    font-size: 2rem;
    transform: translate(-2rem, -5rem)
  }

}
</style>
