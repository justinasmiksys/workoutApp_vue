import vars from '../vars.js'

export default {
    state: {
        signupState:false,
        user:null,
        error:''
    },
    mutations: {
        setSignupState(state, payload) {
            state.signupState = payload
        },
        setUser(state, payload) {
            state.user = payload
        },
        setError(state, payload) {
            state.error = payload
        }
    },
    actions: {
        async signup(context, payload) {
            try {
                const res = await fetch(`${vars.host}signup/`, {
                    method: "POST",
                    body: JSON.stringify({ ...payload }),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                })

                const data = await res.json()

                if (data.user) {
                    console.log("sign up success.  user id: ", data.user);
                    context.commit('setUser', data.user)
                }

                if (data.errors) {
                    context.commit('setError', data.errors.email || data.errors.password);
                  }

            } catch (err) {
                console.log(err)
            }
        },
        async login(context, payload) {
            try {
              const res = await fetch(`${vars.host}login/`, {
                method: "POST",
                body: JSON.stringify({ ...payload }),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
              const data = await res.json();

              if (data.user) {
                console.log("login success. user id: ", data.user);
                context.commit('setUser', data.user)
              }

              if (data.errors) {
                context.commit('setError', data.errors.email || data.errors.password);
              }
            } catch (err) {
              console.log(err);
            }
          },
        async logout() {
            try {
              //sends a get request to the server on the /logout route
              const res = await fetch(`${vars.host}logout/`, {
                method: "GET",
                credentials: "include",
              });
            } catch (err) {
              console.log(err);
            }
          }
    },
    getters: {}
}
