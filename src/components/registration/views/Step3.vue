<template>
<div class="form-step">
	<div class="status-img" />
	<button @click="showUserData()">Go to Dashboard</button>
</div>
</template>

<script>

export default {
	name: 'Step3',

	methods: { // output form
		showUserData() {
			console.log(JSON.stringify(this.$store.state.userData));
		}
	},
};
</script>

<style lang="scss" scoped>
.status-img {
	width: 136px;
	height: 135px;
	margin: 80px auto 10px;
	background: url(../../../assets/message_ok.png) no-repeat;
}

.form-step button {
	background: none;
	border: 1px solid #4A90E2;
	border-radius: 3px;
	padding: 10px 25px 10px 10px;
	margin: 20px auto 70px;
	color: #4A90E2;
	position: relative;
	outline: none;
	cursor: pointer;
	&:after {
		content: "";
		width: 12px;
		position: absolute;
		height: 13px;
		top: 10px;
		right: 7px;
		background: url(../../../assets/arrow_right.png) no-repeat 0 0;
	}
}
</style>
