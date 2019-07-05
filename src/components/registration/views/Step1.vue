<template>
<div class="form-step">
	<div>
		<span :class="{error:emailError}">{{ emailText }}</span>
		<input v-model.trim="email" type="email" required>
	</div>
	<div>
		<span :class="{error:passwordError}">{{ passwordText }}</span>
		<input v-model.trim="password" type="password" required>
	</div>
	<div>
		<span :class="{error:passwordRepeatError}">{{ passwordRepeatText }}</span>
		<input v-model.trim="passwordRepeat" type="password" required>
	</div>
</div>
</template>

<script>
const validateText = {
	emailTextDefault: 'EMAIL',
	emailEmpty: 'EMAIL IS REQUIRED',
	emailValid: 'EMAIL IS NOT VALID',
	passwordTextDefault: 'PASSWORD',
	passwordEmpty: 'PASSWORD IS REQUIRED',
	passwordLength: 'YOU HAVE TO ENTER AT LEAST 6 DIGIT',
	passwordConfirmTextDefault: 'CONFIRM PASSWORD',
	passwordConfirmMatch: 'PASSWORD CONFIRMATION DOES NOT MATCH'
};

export default {
	name: 'Step1',

	data() {
		return {
			email: '',
			emailText: '',
			emailError: false,
			password: '',
			passwordText: '',
			passwordError: false,
			passwordRepeat: '',
			passwordRepeatText: '',
			passwordRepeatError: false
		};
	},

	watch: {
		email() {
			this.validate('email');
		},

		password() {
			this.validate('password');
		},

		passwordRepeat() {
			this.validate('passwordRepeat');
		}
	},

	created() {
		this.reset();
	},

	methods: {
		validate(type) {
			if (!type || type === 'email') {
				if (!this.email) {
					this.emailError = true;
					this.emailText = validateText.emailEmpty;

				} else if (!this.validEmail(this.email)) {
					this.emailError = true;
					this.emailText = validateText.emailValid;

				} else {
					this.emailText = validateText.emailTextDefault;
					this.emailError = false;
				}
			}

			if (!type || type === 'password') {
				if (!this.password) {
					this.passwordError = true;
					this.passwordText = validateText.passwordEmpty;

				} else if (this.password.length < 6) {
					this.passwordError = true;
					this.passwordText = validateText.passwordLength;

				} else {
					this.passwordError = false;
					this.passwordText = validateText.passwordTextDefault;
				}
			}

			if (!type || type === 'passwordRepeat') {
				if (this.password !== this.passwordRepeat) {
					this.passwordRepeatError = true;
					this.passwordRepeatText = validateText.passwordConfirmMatch;

				} else {
					this.passwordRepeatText =
						validateText.passwordConfirmTextDefault;
					this.passwordRepeatError = false;
				}
			}

			if (this.emailError || this.passwordError || this.passwordRepeatError) {
				return false;

			} else {
				return {
					email: this.email,
					password: this.password
				};
			}

			return !(this.emailError || this.passwordError || this.passwordRepeatError);
		},

		reset() { // init component
			this.emailText = validateText.emailTextDefault;
			this.passwordText = validateText.passwordTextDefault;
			this.passwordRepeatText = validateText.passwordConfirmTextDefault;
			this.emailError = false;
			this.passwordError = false;
			this.passwordRepeatError = false;
		},

		validEmail(email) {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			
			return re.test(email);
		}
	}
}
</script>

<style lang="scss" scoped>
.form-step {
	padding: 40px 15px 45px;
	div {
		padding: 0 0 5px;
		span {
			display: block;
			text-align: left;
			font-size: 10px;
			line-height: 3.5;
			color: #777;
			font-family: tahoma;
			&.error {
				color: red;
			}
		}
		input {
			display: block;
			border: none;
			width: 100%;
			font-size: 14px;
			border-bottom: 1px solid #d0d0d0;
			user-select: none;
			outline: none;
			color: #333;
		}
	}
}
</style>
