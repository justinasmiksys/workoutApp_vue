<template>

    <div class="flex justify-center">
        <select class="w-full" id='exercise-title'>
            <option>{{data ? data.title : "Choose exercise"}}</option>
            <option v-for="exercise in this.allExercises" :key="exercise.id">{{exercise.title}}</option>
        </select>

        <button @click="$emit('removeExercise', this.exerciseString)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>


    <div class="flex flex-col items-center">
        <p>Sets:</p>

        <div class="flex mx-auto border-2 mb-1"
             v-for="(set,i) in this.oldSets" :key="i">
            <SetField
            @removeSet="handleRemove"
            :setString="'old_'+i"
            :value="set"
            />
        </div>

        <div class="flex mx-auto border-2 mb-1"
             v-for="set in this.newSets" :key="set">
            <SetField
            @removeSet="handleRemove"
            :setString="set"
            />
        </div>
        <button class="btn" @click="handleAdd">Add Set</button>
    </div>

</template>

<script>

import SetField from './SetField.vue'

export default {
    name: 'ExerciseField',
    props:["exerciseString", "data", "setsList"],
    emits:['removeExercise'],
    components: { SetField},
    data(){
        return {
            newSets:[],
            newSetCount:1,
            oldSets:this.setsList ? JSON.parse(JSON.stringify(this.setsList)) : []
        }
    },
    computed: {
        allExercises() {
            return this.$store.state.InitialData.allExercises
        }
    },
    methods:{
        handleRemove(string){

            const str = string.substring(0,string.indexOf("_"))
            const index = string.substring(string.indexOf("_")+1)

            if (str==="old"){
                this.oldSets.splice(index,1)
            }

            if (str==="new"){
                this.newSets = this.newSets.filter(item => item!=string)
            }
        },
        handleAdd(e){
            e.preventDefault();
            this.newSets.push(`new_${this.newSetCount}`)
            this.newSetCount++
        }
    }
}
</script>

<style>

</style>
