import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		step: 1,
		title: '',
		userData: {
			user_data: {

			}
		}
	},

	mutations: {
		SET_STEP(state, step) {
			state.step = step;
		},
		SET_TITLE(state, title) {
			state.title = title;
		},
		ADD_USER_DATA(state, data) {
			Object.assign(state.userData.user_data, data);
		},
		RESET_USER_DATA(state) {
			state.userData.user_data = {};
		}
	},

	actions: {

	},

	getters: {
		STEP: state => state.step,
		TITLE: state => state.title,
		USER_DATA: state => JSON.stringify(state.userData.user_data),
	},
});
