<template>
    <form class="flex flex-col">
        <div class="flex mx-auto">
            <input class="self-center mb-4 h-10 text-xl font-bold rounded-lg text-center" v-model="title" type="text" placeholder="Title">
            <color-input v-model="color" />
        </div>

        <div class="bg-white mb-4 w-1/2 mx-auto rounded-lg p-2 flex flex-col ex-container" v-for="exercise in exercises" :key="exercise">
            <ExerciseField
            @removeExercise="handleRemove"
            :exerciseString="exercise"
            />
        </div>

        <div class="flex flex-col self-center">
            <button class="btn" @click="handleAdd">Add Exercise</button>
            <p class="text-red-600">{{this.error}}</p>
            <button class="btn" @click="handleSubmit">Submit</button>
        </div>
    </form>
</template>

<script>

import ExerciseField from './ExerciseField'
import { mapActions } from 'vuex'


export default {
    name:'WorkoutForm',
    components:{
        ExerciseField
    },
    data() {
        return {
            color: "rgb(150, 150, 150)",
            title:'',
            exercises:["exercise_1"],
            exerciseCount:1,
            error:""
        }
    },
    computed: {
        allExercises() {
            return this.$store.state.InitialData.allExercises
        }
    },
    methods: {
        ...mapActions(['addWorkout', 'getUserData']),
        handleAdd(e) {
            e.preventDefault();
            this.exerciseCount++
            this.exercises.push(`exercise_${this.exerciseCount}`)
        },
        handleRemove(string) {
           this.exercises = this.exercises.filter(item => item!=string)
        },
        async handleSubmit() {

            this.error = ""

            const workout = {
                title: this.title,
                exercises: [],
                color: this.color,
                id:this.$store.state.UserData.userData.workoutId
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

           const response = await this.addWorkout({workout:workout, user:this.$store.state.Auth.user});

           if (response.message === "Workout Added") {

            const res = await this.getUserData(this.$store.state.Auth.user)

            if (res==='success'){
                this.$emit('submitted')
            }

           }
        },
    },

}
</script>

<style scoped>
  @media only screen and (max-width: 610px) {

  .ex-container{
    width:300px;
  }

}
</style>
