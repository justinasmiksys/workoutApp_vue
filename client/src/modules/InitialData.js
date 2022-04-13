import vars from '../vars.js'


export default {
    state: {
            allExercises:null,
            allMuscles:null
        },
    mutations: {
        setAllExercises(state, payload) {
            state.allExercises = payload
        },
        setAllMuscles(state, payload) {
            state.allMuscles = payload
        }
    },
    actions: {
        getAllExercises(context) {
            fetch(`${vars.host}exercises/`)
            .then(res => res.json())
            .then(data => context.commit('setAllExercises', data))
            .catch(err => console.log(err.message))
        },
        getAllMuscles(context) {
            fetch(`${vars.host}muscles/`)
            .then(res => res.json())
            .then(data => context.commit('setAllMuscles', data))
            .catch(err => console.log(err.message))
        }
    },
    getters: {}
}
