<template>
<div class="registration">
	<div class="title">
		{{TITLE}}
	</div>
	<div class="step-loader" :class="stepLoader + STEP" />
	<Form />
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Form from '@/components/registration/Form';

export default {
	name: 'Registration',

	components: {
		Form
	},

	computed: {
		...mapGetters(['STEP', 'TITLE'])
	},

	methods: {
		reset() {

		}
	},

	data() {
		return {
			stepLoader: 'step'
		};
	}
};
</script>

<style lang="scss" scoped>
.registration {
	margin: 0 auto 20px;
	width: 300px;
	border: 1px solid #d0d0d0;
	border-radius: 5px;
}

.title {
	padding: 15px 0;
}

.step-loader {
	height: 6px;
	border: 1px solid #d0d0d0;
	border-left: none;
	margin-left: -1px;
	position: relative;
	&::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0px;
		z-index: 6;
		height: 6px;
		background: #4a90e2;
		width: calc(33% + 2px);
		transition: all 0.4s;
	}
	&.step1 {
		&::before {
			width: calc(33.33% + 2px);
		}
	}
	&.step2 {
		&::before {
			width: calc(66.66% + 2px);
		}
	}
	&.step3 {
		&::before {
			width: calc(100% + 2px);
		}
	}
}
</style>
