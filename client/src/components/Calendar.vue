<template>
   <SelectWorkoutWindow :date="this.selectedDate" v-if="selectWorkoutState" @close="handleClose" @update="handleUpdate" />
   <FullCalendar :options="calendarOptions" />
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import SelectWorkoutWindow from './SelectWorkoutWindow.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    FullCalendar,
    SelectWorkoutWindow
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        dateClick:this.handleDateClick,
        eventClick:this.handleEventClick,
        initialView: 'dayGridMonth',
        events:this.$store.state.UserData.userData.events
      },
      selectWorkoutState:false,
      selectedDate:null
    }
  },
  methods:{
    ...mapActions(['removeEvent', 'getUserData']),
    handleDateClick(arg) {
      this.selectedDate = arg.dateStr
      this.selectWorkoutState = true
    },
    async handleEventClick(e){
      const response = await this.removeEvent({eventId:e.event._def.extendedProps.eventId, userId:this.$store.state.Auth.user})

      if (response.message === "Event Removed") {
        const res = await this.getUserData(this.$store.state.Auth.user)

        if (res==='success'){
          this.calendarOptions.events = this.$store.state.UserData.userData.events
        }
      }
    },
    handleClose(){
      this.selectWorkoutState = false
    },
    handleUpdate(){
      this.calendarOptions.events = this.$store.state.UserData.userData.events
      this.selectWorkoutState = false
    }
  }
}
</script>

<style>
  .fc-daygrid-day:hover{
    background-color:rgba(163, 163, 163, 0.8);
    cursor:pointer;
  }

  .fc-daygrid-event-harness {
  position: relative;
  z-index: 1;
  }


  .fc-daygrid-event-harness:hover {
    cursor: pointer;
  }

  .fc-daygrid-event-harness::after,
  .fc-daygrid-event-harness::before {
    visibility: hidden;
    height: 2px;
    width: 20px;
    background-color: black;
    position: absolute;
    right: 10px;
    z-index: 10;
    transition: all 0.5s;
  }

  .fc-daygrid-event-harness::before {
    top: 7px;
  }

  .fc-daygrid-event-harness::after {
    top: 17px;
  }

  .fc-daygrid-event-harness:hover:after,
  .fc-daygrid-event-harness:hover:before {
    visibility: visible;
    background-color: white;
  }

  .fc-daygrid-event-harness:hover:after {
    transform: rotate(45deg) translateY(-7px);
  }

  .fc-daygrid-event-harness:hover:before {
    transform: rotate(-45deg) translateY(7px);
  }

</style>
