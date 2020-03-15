import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    actions: {
        async login ({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }
            catch(e) {
                commit('setError', e)
                throw console.log(e.code)
            }
        },

        async logout() {
            await firebase.auth().signOut()
        },



        async register ({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 100000,
                    name: name
                })
            }
            catch (e) {
                commit('setError', e)
                throw console.log(e.code)
            }
        },
        getUserId() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}