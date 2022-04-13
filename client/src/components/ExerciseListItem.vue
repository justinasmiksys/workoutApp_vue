<template>
    <div @click="handleClick" class="h-full rounded-xl">
        <h2 class="text-center uppercase text-l font-bold">{{info.title}}</h2>
        <img class="w-30" v-bind:src="info.img_url" alt="">
    </div>
</template>

<script>
export default {
    props: ['info'],
    emits: ['exClicked'],
    methods:{
        handleClick() {
            this.$emit('exClicked', this.info)
        }
    }
}
</script>
