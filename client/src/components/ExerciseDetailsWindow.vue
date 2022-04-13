<template>
<div>
<SelectWorkoutWindow v-if="selectWorkoutState" @close="handleAddClose" />

<div class="fixed top-0 left-0 w-full h-full background ">

    <div class='bg-white rounded-lg flex flex-col items-center relative overflow-hidden container'>

            <button class="absolute right-0" @click="this.closeExerciseDetails">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <img class="w-2/5 mb-3" v-bind:src="info.img_url" alt="">

            <p class="uppercase font-bold text-2xl mb-3 title">{{info.title}}</p>

            <div class="bottom text-white flex flex-row p-4 gap-4 w-full h-full justify-between">

                <div class="flex flex-col img-btn">
                    <div class="ml-6 mt-2 img-container">
                        <div class="relative muscles-img">
                            <img
                            class="absolute"
                            src="https://cdn-xi3mbccdkztvoept8hl.netdna-ssl.com/train/wp-content/themes/workoutlabs2.0/img/muscle-groups/master.png"
                            alt=""
                        />

                            <img class="absolute" v-for='(url, i) in this.main_urls' :key='i' :src="url" alt="">

                            <img class="absolute" v-for='(url, i) in this.sec_urls' :key='i' :src="url" alt="">

                        </div>
                    </div>

                    <button @click="handleAdd" class="btn btn-add">
                        Add to workout
                    </button>

                </div>



                <div class="text-center self-center block h-full overflow-y-scroll w-8/12 mr-6 mt-2 text">
                    <p class="mb-6 pb-2 border-b border-gray-600" v-for="line in info.description" :key=line>{{ line }}</p>
                </div>

            </div>

    </div>
</div>
</div>

</template>

<script>

import { mapState, mapMutations } from 'vuex'
import SelectWorkoutWindow from './SelectWorkoutWindow.vue'
import EditWorkout from './EditWorkout.vue'

export default {
      components: {
    SelectWorkoutWindow,
    EditWorkout
  },
    data() {
        return {
            main_urls:null,
            sec_urls:null,
            selectWorkoutState:false
        }
    },
    props: ['info'],
    computed: {
        ...mapState(['allMuscles']),
    },
    methods:{
        ...mapMutations(['closeExerciseDetails']),
        handleAdd(){
            this.selectWorkoutState = true
        },
        handleAddClose(){
            this.selectWorkoutState = false
        }
    },
    mounted() {
        this.main_urls = this.info.primary.map(prime_muscle => {
            const prime_object = this.$store.state.InitialData.allMuscles.find( muscle => muscle.name === prime_muscle)
            return prime_object.main_url
        })
        this.sec_urls = this.info.secondary.map(sec_muscle => {
            const sec_object = this.$store.state.InitialData.allMuscles.find( muscle => muscle.name === sec_muscle)
            return sec_object.sec_url
        })
    }
}
</script>

<style scoped>
.background {
      padding: 5vh 0;
      background-color: #CFDBD5;
    }

.container {
    max-width: 1200px;
    height: 90vh;
    margin: auto;
    -webkit-box-shadow: 0px 0px 16px -4px #000000;
    box-shadow: 0px 0px 16px -4px #000000;
  }

.bottom{
    background-color:#333533;
}

.img-container {
    width: 300px;
    height:100%;
}

  .text{
      height: 400px;
  }

  .btn-add{
      margin-top: auto;
      margin-bottom: 5vh;
  }

@media only screen and (min-height: 1500px) {
      .bottom{
          flex-direction: column;
      }

      .img-container {
          margin-left:auto;
          margin-right:auto;
      }

      .btn-add{
          margin-top: 22rem;
      }

      .text{
          height: 100%;
          margin-top:-4rem;
          overflow-y: none;
      }

      .img-btn{

      }
    }

    @media only screen and (max-width: 1300px) {

      .container {
              max-width: 1000px;
        }
    }

      @media only screen and (max-width: 1000px) {

      .container {
          overflow: scroll;
          width: 90vw;
          max-width: none;
        }

      .bottom{
          flex-direction: column;
      }

      .img-container {
          margin-left:auto;
          margin-right:auto;
      }

      .btn-add{
          margin-top: 22rem;
      }

      .text{
          height: min-content;
          margin-top:-2rem;
          overflow-y: none;
      }

      .title{
          text-align: center;
      }

      .img-btn{

      }
    }
</style>
