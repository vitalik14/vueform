<template>
<div class="form-wrapper">
	<transition appear name="slide-opacity" mode="out-in">
		<keep-alive>
			<component :is="currentStepComponent" ref="currentStep" />
		</keep-alive>
	</transition>
	<div v-if="footerForm" class="form-buttons">
		<button v-if="buttonBack" class="btn-left" @click="back()">
			Back
		</button>
		<button v-if="buttonNext" class="btn-right" @click="next()">
			Next
		</button>
	</div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import Step1 from './views/Step1';
import Step2 from './views/Step2';
import Step3 from './views/Step3';

const typeTitles = { // form step titles
	progress: 'Signup',
	success: 'Thank you!'
};

export default {
	name: 'Form',

	components: {
		Step1,
		Step2,
		Step3
	},

	created() {
		this.SET_TITLE(typeTitles.progress);
	},

	data() {
		return {
			footerForm: true,
			buttonNext: true,
			buttonBack: false,
			currentStepComponent: 'Step1',
			currentStep: 1,
			stepLength: 3
		};
	},

	methods: {
		next() {
			const nextStep = this.currentStep + 1;
			const currentComponent = this.$refs.currentStep.validate();

			if (currentComponent && nextStep <= this.stepLength) {
				this.ADD_USER_DATA(currentComponent);
				this.currentStepComponent = 'Step' + nextStep;
				this.buttonBack = true;
				this.currentStep = nextStep;
				this.SET_STEP(nextStep);

				if (this.currentStep === this.stepLength) {
					this.footerForm = false;
					this.SET_TITLE(typeTitles.success);
				}
			}
		},

		back() {
			const backStep = this.currentStep - 1;

			if (backStep >= 1) {
				this.currentStepComponent = 'Step' + backStep;

				if (backStep === 1) {
					this.buttonBack = false;
				}

				this.currentStep = backStep;
				this.SET_STEP(backStep);
			}
		},

		...mapMutations(['SET_STEP', 'SET_TITLE', 'ADD_USER_DATA'])
	}
};
</script>

<style lang="scss">
.form-wrapper {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.form-buttons {
	border-top: 1px solid #d0d0d0;
	height: 15px;
	padding: 15px;
	button {
		background: none;
		border: none;
		color: #5d9ce4;
		font-size: 12px;
		cursor: pointer;
		outline: none;
	}
	.btn-left {
		float: left;
		color: #D7D4D0;
	}
	.btn-right {
		float: right;
		padding-right: 15px;
		background: url(../../assets/arrow_right.png) no-repeat 100% 1px;
	}
}

.slide-opacity-enter-active {
	opacity: 1;
	transition: all .4s ease;
}

.slide-opacity-enter,
.slide-opacity-leave-to {
	opacity: 0;
	transition: all .2s ease;
}
</style>
