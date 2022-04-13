import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from './router'

import './assets/tailwind.css'
import App from './App.vue'

import InitialData from './modules/InitialData.js'
import Auth from './modules/Auth.js'
import UserData from './modules/UserData.js'
import ExerciseDetails from './modules/ExerciseDetails.js'
import WorkoutDetails from './modules/WorkoutDetails.js'

import ColorInput from 'vue-color-input'

const store = createStore({
    modules: {
        InitialData,
        Auth,
        UserData,
        ExerciseDetails,
        WorkoutDetails
    }
})


const app = createApp(App);
app.use(router)
app.use(ColorInput)
app.use(store)
app.mount('#app')
