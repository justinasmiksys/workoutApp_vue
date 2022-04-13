<template>

<div v-if="this.$store.state.ExerciseDetails.selectedExercise">
    <ExerciseDetailsWindow :info="this.$store.state.ExerciseDetails.selectedExercise" />
</div>

<div v-if="this.$store.state.WorkoutDetails.editWorkoutState">
  <EditWorkout @update="handleUpdate" />
</div>

<div v-else class="flex flex-col h-full">

  <h1 class="font-bold text-3xl self-center mt-3 mb-6 w-full text-center py-1" v-bind:style="{'background-color':object.color}">{{this.object.title}}</h1>


  <div class="flex flex-col bg-white mb-2 p-2 rounded-xl mx-auto ex-container" v-for="(exercise,i) in object.exercises" :key="i">

      <h2 class="self-center font-bold mb-2">{{exercise.exerciseData.title}}</h2>

      <div class="flex flex-row">

        <div>
          <img :src="exercise.exerciseData.img_url" alt="exercise image">
        </div>

        <div class="flex flex-col">
          <div class="self-center mb-auto">
            <p v-for="(set,i) in exercise.setsList" :key="i">Set {{i+1}}: {{set}}</p>
          </div>

          <button @click="this.setSelectedExercise(exercise.exerciseData)" class="btn">Details</button>
        </div>

      </div>

  </div>

  <div class="flex flex-col mx-auto mt-auto">
    <button class="btn" @click="handleEdit">Edit</button>
    <button class="btn" @click="handleDelete">Delete</button>
  </div>

</div>

</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import EditWorkout from './EditWorkout.vue'
import ExerciseDetailsWindow from './ExerciseDetailsWindow.vue'

export default {
  name: 'WorkoutDetails',
  props: ['workoutId'],
  emits:['update'],
   components: {
     EditWorkout,
     ExerciseDetailsWindow
  },
  data(){
    return {
      editWorkoutState:false
    }
  },
  computed: {
    object() {
      const selectedWorkout = this.$store.state.UserData.userData.workouts.find(workout=>workout.id===this.workoutId)
      return selectedWorkout
    }
  },
  methods: {
    ...mapActions(['deleteWorkout', 'getUserData']),
    ...mapMutations(['setSelectedExercise']),
   async handleDelete(){

     const response = await this.deleteWorkout({workout:this.object, user:this.$store.state.Auth.user})

     if (response.message === "Workout Deleted") {
          this.$emit('update')
          await this.getUserData(this.$store.state.Auth.user)

      }
    },
    handleEdit(){
      this.$store.state.WorkoutDetails.editWorkoutObject = this.object
      this.$store.state.WorkoutDetails.editWorkoutState = true
    },
    handleUpdate(){
      this.$emit('update')
    }
  }
}
</script>

<style>
  img {
    width:250px;
  }
  @media only screen and (max-width: 610px) {

  .ex-container{
    width:300px;
  }

}
</style>
