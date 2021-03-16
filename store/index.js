import Vue from "vue"
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyLists:uni.getStorageSync("_history") || []
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyLists = history
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('_history', list)
			commit('SET_HISTORY_LIST',list)
		},
		clear_history({commit}){
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY')
		}
	}
})





export default store