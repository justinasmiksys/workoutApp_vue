<template>
  <div class="select-workout">
    <button @click="handleClose" class="btn-close">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <p class="text-center font-bold mb-2">Select the workout</p>
    <p v-if="this.date" class="text-center">Date: {{this.date}}</p>

    <div class="flex flex-col mt-4">
      <button v-for="workout in this.workouts" :key=workout.id v-bind:style="{'background-color':workout.color}" class="btn btn-workout" @click="handleAddEvent(workout)">
        {{workout.title}}
      </button>
    </div>

  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  props:['date'],
  computed: {
    workouts(){
      return this.$store.state.UserData.userData.workouts
    }
  },
  methods: {
    ...mapActions(['addEvent', 'getUserData']),
    handleClose(){
      this.$emit('close')
    },
    async handleAddEvent(workout){

      if(this.date){
        const event = {
          title: workout.title,
          date: this.date,
          backgroundColor: workout.color,
          id: workout.id,
          eventId: this.$store.state.UserData.userData.eventId
        }

        const response = await this.addEvent({event:event, user:this.$store.state.Auth.user})

        if (response.message === "Event Added") {
          const res = await this.getUserData(this.$store.state.Auth.user)

          if (res==='success'){
            this.$emit('update')
          }
        }
      }

      if(!this.date){
        this.$store.state.WorkoutDetails.editWorkoutObject = workout
        this.$store.state.WorkoutDetails.exerciseToAdd = this.$store.state.ExerciseDetails.selectedExercise
        this.$store.state.ExerciseDetails.selectedExercise = false
        this.$router.push('/')
        this.$store.state.UserData.display = 'details'
        this.$store.state.WorkoutDetails.editWorkoutState = true
      }


    }
  }
}
</script>

<style scoped>
  .select-workout{
    background-color:rgba(0, 16, 56, 0.8);
    color:white;
    position: absolute;
    width:300px;
    padding:12px;
    border-radius: 12px;
    top:50%;
    left:50%;
    transform:translate(-150px,-50%);
    z-index:10;
  }

  .btn-close{
    position:absolute;
    right:5px;
    top:5px;
  }

  .btn-workout{
    margin-bottom:10px;
    margin-top:0;
  }
</style>
