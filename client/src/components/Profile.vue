<template>
    <div v-if="this.userData" class='flex h-full'>
        <div class="border-r-2 border-gray-500 px-6 menu">

            <div @click="handleClose" class="profile-x">
                <img src="../assets/x.png" alt="">
            </div>

            <p class="self-center font-bold text-xl mt-4">User: <span>{{this.userData.email}}</span></p>

            <div v-if="this.userData.workouts.length!==0" class="flex flex-col mt-4">
                <button @click="handleWorkoutDetails(workout.id)" class="btn btn-profile" v-for="workout in this.userData.workouts" :key="workout.id" v-bind:style="{'background-color':workout.color}">
                {{workout.title}}
                </button>
            </div>

            <div v-else>
                There are no workouts created
            </div>


            <div class="flex flex-col self-center mt-auto mb-2">
                <button @click="handleNewWorkout" class="btn">New workout</button>
                <button @click="handleCalendar" class="btn">Calendar</button>
                <button @click="handleLogout" class="btn">Logout</button>
            </div>

        </div>

        <div @click="handleProfile" class="nav-profile">
            <img src="../assets/profile.png" alt="">
        </div>

        <div class="mx-auto overflow-auto w-full h-full">

            <div v-if="this.$store.state.UserData.display==='calendar'">
                <Calendar />
            </div>

            <div class="h-full" v-if="this.$store.state.UserData.display==='details'">
                <WorkoutDetails :workoutId="selectedWorkout" @update="handleCalendar" />
            </div>

            <div class="text-center mt-6" v-if="this.$store.state.UserData.display==='form'">
                <WorkoutForm @submitted="handleCalendar" />
            </div>

        </div>

    </div>


</template>

<script>

import { mapActions } from 'vuex'

import Calendar from './Calendar.vue'
import WorkoutDetails from './WorkoutDetails.vue'
import WorkoutForm from './WorkoutForm.vue'

export default {
    name: 'Profile',
    components: {
    Calendar,
    WorkoutDetails,
    WorkoutForm
  },
  data() {
      return {
          selectedWorkout:null
      }
  },
    computed: {
        userId () {
            return this.$store.state.Auth.user
        },
        userData() {
            return this.$store.state.UserData.userData
        }
    },
    methods: {
      ...mapActions(['logout','getUserData']),
      async handleLogout() {
        await this.logout()
        this.$router.push({ name: 'Home'})
        this.$router.go()
        },
        handleNewWorkout(e){
            e.preventDefault()
            this.$store.state.UserData.display = 'form'
        },
        handleWorkoutDetails(id){
            this.$store.state.WorkoutDetails.editWorkoutState = false
            this.$store.state.UserData.display = 'details'
            this.selectedWorkout = id
        },
        handleCalendar(){
            this.$store.state.UserData.display = 'calendar'
        },
        handleProfile(){
            const menu = document.getElementsByClassName('menu')[0]
            menu.classList.add('menu-visible')
        },
        handleClose() {
            const menu = document.getElementsByClassName('menu')[0]
            menu.classList.remove('menu-visible')
        }
    },
    beforeMount(){
        this.getUserData(this.userId)
    }
}
</script>

<style>
.menu{
    width:350px;
    display:flex;
    flex-direction:column;
}

.nav-profile{
    display: none;
    width:50px;
    height:50px;
    padding: 6px;
    background-color:white;
    box-shadow: 0px 0px 16px -4px #000000;
    cursor:pointer;

    border-radius: 20px;

    position: absolute;
    top: 32px;
    left: 32px;
}

.profile-x{
    width:30px;
    margin: auto;
    cursor:pointer;
    display: none;
}

.profile-x:hover{
    border: 1px solid black;
}

@media only screen and (max-width: 1100px) {

@keyframes slideLeft {
  from {
    left: -300px;
    opacity: 0;
  }

  to {
    left: 30px;
    opacity: 1;
  }
}

.menu{
    display: none;
    z-index:10;
    background-color:white;

    animation-duration: 1s;
    animation-name: slideLeft;

    overflow-y: scroll;
}

.nav-profile{
    display: block;
}

.profile-x{
    display: flex;
}

}

.menu-visible{
    display: block;
    position:fixed;
    height: 90vh;
    top:5vh;
    left:5vw;
}
</style>
