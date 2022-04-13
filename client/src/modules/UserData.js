import vars from '../vars.js'

export default {
    state: {
        userData: null,
        display:'calendar'
    },
    mutations: {
        setUserData(state, payload) {
            state.userData = payload
        }
    },
    actions: {
        async getUserData(context, id) {
            try {
                const res = await fetch(`${vars.host}profile/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                })

                const data = await res.json()

                if (data) {
                    context.commit('setUserData', data)
                    return 'success'
                }

            } catch (err) {
                console.log(err)
            }
        },

        async addWorkout(context, payload) {
            try {
              const res = await fetch(`${vars.host}addworkout/`, {
                method: "POST",
                body: JSON.stringify({ ...payload }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
              const data = await res.json();

              if (data) return data;
            } catch (err) {
              console.log(err);
            }
          },

        async editWorkout(context, payload) {
            try {
              const res = await fetch(`${vars.host}editworkout/`, {
                method: "POST",
                body: JSON.stringify({ ...payload }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
              const data = await res.json();

              if (data) return data;
            } catch (err) {
              console.log(err);
            }
        },

        async deleteWorkout(context, payload) {
            try {
                const res = await fetch(`${vars.host}deleteworkout/`, {
                method: "POST",
                body: JSON.stringify({ ...payload }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                });

                const data = await res.json();

                if (data) return data;

            } catch (err) {
                console.log(err);
            }
        },

        async addEvent(context, payload){

            try{
              const res = await fetch(`${vars.host}addevent/`, {
                method: "POST",
                body: JSON.stringify({ ...payload }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });

              const data = await res.json();

              if (data) return data;

            } catch(err){
              console.log(err)
            }
          },

        async removeEvent(context, payload){

            try{
                const res = await fetch(`${vars.host}removeevent/`, {
                method: "POST",
                body: JSON.stringify({...payload}),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                });

                const data = await res.json();

                if (data) return data;

            } catch(err){
                console.log(err)
            }
        }
    },
    getters: {}
}
