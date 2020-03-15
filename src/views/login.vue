<template>
	<form class="card auth-card" @submit.prevent="authSubmitHandler">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>
			
			<div class="input-field">
				<input 
					id="email" 
					type="text" 
					v-model.trim="email"
					:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
					>
				<label for="email">Email</label>
				<!-- Error message -->
				<small 
					class="helper-text invalid"
					v-if="$v.email.$dirty && !$v.email.required">Поле Email обязательно!</small>
				<small 
					class="helper-text invalid"
					v-else-if="$v.email.$dirty && !$v.email.email">Email введен не верно!</small>
				<!-- ------------- -->
			</div>

			<div class="input-field">
				<input 
					id="password" 
					type="password" 
					v-model.trim="password"
					:class="{invalid: ($v.password.$dirty && !$v.password .required) || ($v.password.$dirty && !$v.password.minLength)}"
					>
				<label for="password">Пароль</label>
				<!-- Error message -->
				<small 
					class="helper-text invalid"
					v-if="$v.password.$dirty && !$v.password.required">Поле Пароль обязательно!</small>
				<small 
					class="helper-text invalid"
					v-else-if="$v.password.$dirty && !$v.password.minLength">Пароль должен состоять более чем из {{$v.password.$params.minLength.min}} символов! Вы введи {{password.length}}</small>
				<!-- ------------- -->
			</div>
		</div>


		<div class="card-action">
			<div>
				<button class="btn waves-effect waves-light auth-submit" type="submit">
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link tag="a" to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>


<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
	name: "login",
	// 
	data: () =>	({
		email: '',
		password: ''
	}),
	//
	validations: {
		email: { email, required },
		password: { required, minLength: minLength(8) }
	},
	// 
	mounted(){

		// If route query defuned in utils/messages.js
		if(messages[this.$route.query.message]) {
			// Show this message with toast of Materialize ui components
			this.$message(messages[this.$route.query.message]);
		}
	},
	// 
	methods: {
		async authSubmitHandler() {
			// console.log(this.$v.password.$params.minLength.min);
			if(this.$v.$invalid) {
				this.$v.$touch();
				return;
			}

			const formData = {
				email: this.email,
				password: this.password
			};

			try {
				await this.$store.dispatch('login', formData);
				this.$router.push('/');

			} catch (e) {
				// console.log(e.u.message);
				// this.$message(messages[e.code])
			}
		}
	}
}
</script>