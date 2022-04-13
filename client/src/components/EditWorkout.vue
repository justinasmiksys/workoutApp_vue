<template>

    <div class="flex justify-center mt-4">
        <input class="self-center mb-4 h-10 text-xl font-bold rounded-lg text-center" v-model="this.title" type="text" placeholder="Title">
        <color-input v-model="this.color" />
    </div>

    <div class="bg-white mb-4 w-1/2 mx-auto rounded-lg p-2 flex flex-col ex-container"
    v-for="(exercise, i) in this.oldData.exercises" :key="i" >
        <ExerciseField
        :data="exercise.exerciseData"
        :exerciseString="'old_'+i"
        :setsList=exercise.setsList
        @removeExercise="handleRemove"
        />
    </div>

    <div v-if="this.$store.state.WorkoutDetails.exerciseToAdd" class="bg-white mb-4 w-1/2 mx-auto rounded-lg p-2 flex flex-col ex-container">
        <ExerciseField
            :data="this.$store.state.WorkoutDetails.exerciseToAdd"
            exerciseString="extra"
            @removeExercise="handleRemove"
        />
    </div>

    <div class="bg-white mb-4 w-1/2 mx-auto rounded-lg p-2 flex flex-col ex-container"
    v-for="exercise in newExercises" :key="exercise">
        <ExerciseField
        @removeExercise="handleRemove"
        :exerciseString="exercise"
        />
    </div>


    <div class="flex flex-col self-center">
        <button class="btn" @click="handleAdd">Add Exercise</button>
        <p class="text-red-600 mx-auto">{{this.error}}</p>
        <button class="btn" @click="handleSubmit">Submit</button>
    </div>

</template>

<script>

import ExerciseField from './ExerciseField'
import { mapActions } from 'vuex'

export default {
    name: 'EditWorkout',
    emits:['update'],
    components:{
        ExerciseField
    },
    unmounted(){
        this.$store.state.WorkoutDetails.exerciseToAdd = null
    },
    data(){
        return {
            title:this.$store.state.WorkoutDetails.editWorkoutObject.title,
            color:this.$store.state.WorkoutDetails.editWorkoutObject.color,
            error:"",
            newExercises:[],
            newExerciseCount:0,
            oldData:JSON.parse(JSON.stringify(this.$store.state.WorkoutDetails.editWorkoutObject))
        }
    },
    computed: {
        allExercises() {
            return this.$store.state.InitialData.allExercises
        }
    },
    methods:{
        ...mapActions(['editWorkout','getUserData']),
        handleAdd(){
            this.newExercises.push(`new_${this.newExerciseCount}`)
            this.newExerciseCount++
        },
        handleRemove(string) {
            const str = string.substring(0,string.indexOf("_"))
            const index = string.substring(string.indexOf("_")+1)

            if(string==="extra"){
                console.log('extra')
                this.$store.state.WorkoutDetails.exerciseToAdd=false
            }

            if (str==="old"){
                this.oldData.exercises.splice(index,1)
            }

            if (str==="new"){
                this.newExercises = this.newExercises.filter(item => item!=string)
            }

        },
        async handleSubmit(){

            this.error = ""

            const workout = {
                title: this.title,
                exercises: [],
                color: this.color,
                id:this.$store.state.WorkoutDetails.editWorkoutObject.id
            };

            if(!workout.title) {
                this.error = "Workout must have a title"
                return
            }

            const selectedExercises = Array.prototype.slice.call(
                document.querySelectorAll("#exercise-title")
            );

            selectedExercises.map(exercise => {
                const exerciseData = this.allExercises.find((exobj) => exobj.title === exercise.value);

                if(!exerciseData){
                    this.error = "There is at least one unselected exercise field"
                    return
                }

                const sets = Array.prototype.slice.call(
                    exercise.parentNode.nextElementSibling.querySelectorAll('input')
                );

                const setsList = sets.map(set=>set.value)

                const exerciseObject = {
                    exerciseData,
                    setsList
                };

                workout.exercises = [...workout.exercises, exerciseObject];

            })

            if (this.error){
                return
            }


            const response = await this.editWorkout({newWorkout:workout, oldWorkout:this.$store.state.WorkoutDetails.editWorkoutObject, user:this.$store.state.Auth.user});

            if (response.message === "Workout Edited") {
                const res = await this.getUserData(this.$store.state.Auth.user)

                if (res==='success'){
                    this.$store.state.WorkoutDetails.editWorkoutObject = null
                    this.$emit('update')
                }
           }
        },
    }
}
</script>

<style scoped>

  @media only screen and (max-width: 610px) {
  .ex-container{
    width:300px;
  }
}

</style>
