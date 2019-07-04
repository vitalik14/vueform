<template>
<div>
	<div>
		<Registration :key="componentKey" />
	</div>
	<button @click="resetApp()">Reset</button>
</div>
</template>

<script>
import Registration from '@/components/registration/Registration.vue';

export default {
	name: 'RegistartionView',

	components: {
		Registration
	},

	data() {
		return {
			componentKey: 0,
		}
	},

	methods: {
		resetApp() {
			this.$store.commit('RESET_USER_DATA');
			this.componentKey += 1;
		}
	}
};
</script>
