<template>

  <div v-if="this.$store.state.ExerciseDetails.selectedExercise">
    <ExerciseDetailsWindow :info="this.$store.state.ExerciseDetails.selectedExercise" />
  </div>

  <div v-else class="flex h-full">

    <div @click="handleSearchBar" class="nav-search">
      <img src="../assets/search.png" alt="">
    </div>

    <div class="search-filter border-r-2 border-gray-500 px-6 py-4 mt-2">

      <div @click="handleClose" class="profile-x">
        <img src="../assets/x.png" alt="">
      </div>

      <div class="border-b-2 border-gray-300 pb-4 w-full">
        <Search @search="handleSearch" />
      </div>

      <div class="mt-2">
        <Filter @filter="handleFilter" @reset="handleReset" />
      </div>

    </div>

    <div class="flex flex-col h-full">

      <p class="self-center">{{this.queryMessage}}</p>

      <div class='grid grid-cols-2 3xl:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 m-4 p-8 h-full overflow-y-auto'>
        <div class="grid-item flex flex-col gap-4 shadow-md rounded-md cursor-pointer"
          v-for="exercise in this.displayList"
          :key="exercise._id">
          <ExerciseListItem @exClicked="handleEmit" :info="exercise"/>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

import ExerciseListItem from '../components/ExerciseListItem.vue'
import ExerciseDetailsWindow from '../components/ExerciseDetailsWindow.vue'
import Search from '../components/Search.vue'
import Filter from '../components/Filter.vue'
import { mapMutations } from 'vuex'
import { intersection } from "lodash";

export default {
  components: {
    ExerciseListItem,
    ExerciseDetailsWindow,
    Search,
    Filter,
  },
  data () {
    return {
      displayList:null,
      queryMessage:''
    }
  },
  computed: {
    initialList() {
      return this.$store.state.InitialData.allExercises
    }
  },
  mounted(){
    console.log('list mounted')
    console.log('display list before:', this.displayList)
    // this.displayList = this.initialList
    this.displayList = this.$store.state.InitialData.allExercises
    console.log('display list after:', this.displayList)
    console.log('initial list:', this.initialList)
    console.log('store list:', this.$store.state.InitialData.allExercises)
  },
  methods:{
    ...mapMutations(['setSelectedExercise']),
    handleEmit(e){
      this.setSelectedExercise(e)
    },
    handleSearch(query){
      const search = new RegExp(query, "i")
      this.displayList = this.initialList.filter((exercise) =>
      exercise.title.match(search)
      );
      if(this.displayList.length < 105) {
        this.queryMessage = `Showing ${this.displayList.length} results of the query "${query}"`
      }

      if(this.displayList.length === 0) {
        this.queryMessage = `No results have been found of the query "${query}"`
      }

      if(this.displayList.length === 105) {
        this.queryMessage = ""
      }
    },
    handleFilter(options){
      if (options.length === 0) return;

      this.displayList = this.initialList.filter((exercise) =>
      intersection([...exercise.secondary, ...exercise.primary], options).length > 0);
    },
    handleReset(){
      this.displayList = this.initialList
    },
    handleSearchBar(){
      const bar = document.getElementsByClassName('search-filter')[0]
      bar.classList.add('search-visible')
    },
    handleClose() {
      const bar = document.getElementsByClassName('search-filter')[0]
      bar.classList.remove('search-visible')
    }
  }
}
</script>

<style scoped>
    .grid-item{
      transition: all 0.2s;

      background-color:#cfdbd58c;
    }
    .grid-item:hover {
        -webkit-box-shadow: 3px 2px 18px 9px #333533;
        box-shadow: 3px 2px 18px 9px #333533;

        transform: scale(1.05)
    }

    .search-filter{
      min-width: 350px;
    }

    .nav-search{
    display: none;
    width:50px;
    height:50px;
    padding: 10px;
    background-color:white;
    box-shadow: 0px 0px 16px -4px #000000;
    cursor:pointer;

    border-radius: 20px;

    position: absolute;
    top: 32px;
    left: 32px;
    }

@media only screen and (max-width: 1100px) {

  .search-filter{
    display: none;
    z-index:10;
    background-color:white;

    animation-duration: 1s;
    animation-name: slideLeft;
  }

  .nav-search{
      display: block;
  }

  .search-visible{
    display: block;
    position:fixed;
    height: 90vh;
    top:5vh;
    left:5vw;
    margin-top: 0;
  }

}

@media only screen and (min-height: 610px) {
    .search-filter{
        overflow: scroll;
        left: 0;
    }
    }
</style>
