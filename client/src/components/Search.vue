<template>
  <form class="flex">
      <input
        v-model="query"
        type="text"
        placeholder="Search by title..."
        class="h-8 w-full p-2 rounded-lg"
      />
      <button class="relative right-6" @click="handleSubmit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            query:""
          }
    },
    methods: {
        handleSubmit(e){
          e.preventDefault();
          this.$emit('search', this.query)
        }
    }
}
</script>

<style>

</style>
