export default {
    state: {
        selectedExercise:null
        },
    mutations: {
        setSelectedExercise(state, payload) {
            state.selectedExercise = payload
        },
        closeExerciseDetails(state){
            state.selectedExercise = null
        }
    },
    actions: {},
    getters: {}
}
