<template>

    <div class="flex flex-col">

        <div class="flex justify-between border-b-2 border-gray-300 py-1" v-for="(muscle,i) in allMuscles" :key="i">
                <p class="text-lg">{{muscle.name}}</p>
                <input type="checkbox" :id="muscle.name">
        </div>

        <div class="flex gap-1 mt-8">
            <button @click="handleFilter" class="btn">Filter</button>
            <button @click="handleReset" class="btn">Reset</button>
        </div>

    </div>

</template>

<script>
export default {
computed: {
    allMuscles() {
        return this.$store.state.InitialData.allMuscles
    }
},
methods: {
    handleFilter(e){
        e.preventDefault();

        let checkboxes = Array.prototype.slice.call(document.querySelectorAll('input'))

        checkboxes = checkboxes.filter((btn) => btn.type === "checkbox" && btn.checked).map((btn) => btn.id);

        this.$emit('filter', checkboxes)
    },
    handleReset(e) {
        e.preventDefault();

        Array.prototype.slice.call(document.querySelectorAll("input")).forEach(btn=> btn.checked=false)

        this.$emit('reset')
    }
}
}
</script>

<style scoped>
</style>
