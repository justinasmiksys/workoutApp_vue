<template>
<div class='background bg-gray-400'>
    <div class="container bg-gray-200 rounded-xl overflow-hidden">
    <nav class="">
    <ul class="flex justify-around">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link class="nav-link" :to="{
          name:'ExerciseList'
        }">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0  002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Exercises</span>
        </router-link>
      </li>
    </ul>
    </nav>
    <div class="content h-full">
      <router-view/>
    </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import { verify } from "jsonwebtoken";
import { getCookie } from './helpers'


export default {
  methods: {
    ...mapActions(['getAllExercises', 'getAllMuscles']),
    ...mapMutations(['setUser'])
  },
  computed: {},
  mounted() {
    console.log('app mounted')
    this.getAllExercises()
    this.getAllMuscles()
  },
  beforeMount() {
    const token = getCookie("workoutApp");
    let user

    if(token) {
      user = verify(
        token,
        "nebepasikiskiakopusteliaudamasis",
        (err, decodedToken) => {
          if (!err) {
            return {user:decodedToken.id};
          }
        }
      )
      this.setUser(user.user)
    } else {
      user = null
    }

  }
}
</script>

<style scoped>

  .background {
      padding: 5vh 0;
      background-color: #CFDBD5;
    }

  .container {
    width: 90vw;
    height: 90vh;
    margin: auto;
    padding-bottom: 5vh;
    background-color: #E8EDDF;
    -webkit-box-shadow: 0px 0px 16px -4px #000000;
    box-shadow: 0px 0px 16px -4px #000000;
}

  .content {
  }

  nav,
  ul{
    width:inherit;
  }

  /* @media only screen and (max-width: 1200px) {
  .container {
    width: 900px;
  }
} */

</style>
