<template>
<div class="form-step">
	<div class="birthday">
		<span :class="{error:dateTextError}">{{ dateText }}</span>
		<div>
			<input v-model="dateDay" maxlength="2" type="text" placeholder="DD">
			<input v-model="dateMounth" maxlength="2" type="text" placeholder="MM">
			<input v-model="dateYear" maxlength="4" type="text" placeholder="YYYY">
		</div>
	</div>
	<div class="gender">
		<span :class="{error:genderError}">{{ genderText }}</span>
		<div @click="setGender($event)">
			<button>MALE</button>
			<button>FEMALE</button>
			<button>UNSPECIFIED</button>
		</div>
	</div>
	<div class="query-about">
		<span>WHERE DID YOU HEAR ABOUT IS?</span>
		<select v-model="query">
			<option value="internet">
				INTERNET
			</option>
			<option value="tv">
				TV
			</option>
			<option value="newspaper">
				NEWSPAPER
			</option>
			<option  value="people">
				PEOPLE
			</option>
		</select>
	</div>
</div>
</template>

<script>
const userMinimumAge = 18;
const userMaximumAge = 150;
const validateText = {
	dateBirthdayTextDefault: 'DATE OF BIRTH',
	dateTextError: 'BRTHDAY IS WRONG',
	dateTextErrorUserMinimumAge: 'USER IS AT LEAST 18 YEARS OLD',
	dateTextErrorUserMaximumAge: 'USER IS TOO OLD',
	genderTextDefault: 'GENDER',
	genderTextEmpty: 'GENDER IS REQUIRED'
};

export default {
	name: 'Step2',

	data() {
		return {
			dateYear: null,
			dateMounth: null,
			dateDay: null,
			dateTextError: false,
			dateText: '',
			gender: null,
			genderText: '',
			genderError: false,
			query: null
		};
	},

	watch: {
		dateYear() {
			this.validate('date');
		},

		dateMounth() {
			this.validate('date');
		},

		dateDay() {
			this.validate('date');
		}
	},

	created() {
		this.reset();
	},

	methods: {
		validate(type) {
			if (!type || type === 'date') {
				const dateDay = Number(this.dateDay);
				const dateMounth = Number(this.dateMounth);
				const dateYear = Number(this.dateYear);

				if (!dateDay || dateDay < 1 || dateDay > 31) {
					this.dateTextError = true;
					this.dateText = validateText.dateTextError;

				} else if (!dateMounth || dateMounth < 1 || dateMounth > 12) {
					this.dateTextError = true;
					this.dateText = validateText.dateTextError;

				} else if (!dateYear || dateYear + userMinimumAge >= new Date().getFullYear()) {
					this.dateTextError = true;
					this.dateText = validateText.dateTextErrorUserMinimumAge;

				} else if (!dateYear || dateYear + userMaximumAge < new Date().getFullYear()) {
					this.dateTextError = true;
					this.dateText = validateText.dateTextErrorUserMaximumAge;

				} else {
					this.dateTextError = false;
					this.dateText = validateText.dateBirthdayTextDefault;
				}
			}

			if (!type || type === 'gender') {
				this.genderError = !this.gender;
				this.genderText = this.genderError ? validateText.genderTextEmpty : validateText.genderTextDefault;
			}

			if (this.dateTextError || this.genderError) {
				return false;

			} else {
				return {
					date_of_birth: new Date(this.dateYear + '.' + this.dateMounth + '.' + this.dateDay).getTime(),
					gender: this.gender,
					how_hear_about_us: this.query
				};
			}
		},

		reset() { // init component
			this.dateText = validateText.dateBirthdayTextDefault;
			this.genderText = validateText.genderTextDefault;
			this.dateTextError = false;
			this.genderError = false;
		},

		setGender(e) {
			Array.prototype.map.call(e.currentTarget.children, el => el.classList.remove('active'));
			e.target.classList.add('active');
			this.gender = e.target.innerText.toLowerCase();
			this.validate('gender');
		}
	}
};
</script>

<style lang="scss" scoped>
.form-step {
	padding: 40px 15px 45px;
	div {
		padding: 0 0 5px;
		span {
			display: block;
			text-align: center;
			font-size: 12px;
			line-height: 3.5;
			color: #777;
			font-family: tahoma;
			&.error {
				color: red;
			}
		}
	}
	.birthday {
		span {
			display: block;
			width: 100%;
			text-align: center;
			font-size: 12-px;
		}
		div {
			display: flex;
			justify-content: center;
		}
		input {
			display: block;
			width: 33.33%;
			height: 32px;
			text-align: center;
			font-size: 10px;
			border: 1px solid #d0d0d0;
			border-left: none;
			user-select: none;
			outline: none;
			color: #333;
			font-family: tahoma;
			&:first-child {
				border: 1px solid #d0d0d0;
			}
		}
	}
}

.gender {
	span {
		display: block;
		width: 100%;
		text-align: center;
		font-size: 10px;
	}
	div {
		display: flex;
		justify-content: center;
		button {
			width: 100%;
			font-size: 10px;
			color: #333;
			background: none;
			border: 1px solid #d0d0d0;
			border-left: none;
			height: 35px;
			outline: none;
			font-family: tahoma;
			cursor: pointer;
			&.active {
				background: #4a90e2;
				color: #fff;
			}
			&:first-child {
				border: 1px solid #d0d0d0;
			}
		}
	}
}

.query-about {
	select {
		width: 100%;
		padding: 5px 10px;
		font-size: 12px;
		border: 1px solid #ccc;
		color: #666;
		height: 32px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background: url(../../../assets/arrow_down.png) 96% / 4% no-repeat #fff;
		&::-ms-expand {
			display: none;
		}
	}
}

@media screen and (min-width: 0\0) {
	.query-about select {
		background: none\9;
		padding: 5px\9;
	}
}
</style>
