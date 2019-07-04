import Vue from 'vue';
import Router from 'vue-router';
import Registration from './views/Registration.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	
	routes: [
		{
			path: '/',
			name: 'registration',
			component: Registration
		}
	]
});
