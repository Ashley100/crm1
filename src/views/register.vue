<template>
  <div class="register-wrapper">
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>

        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          />
          <label for="email">Email</label>
          <!-- Error message -->
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
          >Поле Email обязательно!</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
          >Email введен не верно!</small>
          <!-- ------------- -->
        </div>

        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password .required) || ($v.password.$dirty && !$v.password.minLength)}"
          />
          <label for="password">Пароль</label>
          <!-- Error message -->
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >Поле Пароль обязательно!</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен состоять более чем из {{$v.password.$params.minLength.min}} символов! Вы введи {{password.length}}</small>
          <!-- ------------- -->
        </div>

        <div class="input-field">
          <input 
						id="name" 
						type="text"
						v-model.trim="name"
						:class="{invalid : $v.name.$dirty && !$v.name.required}"
					/>
          <label for="name">Имя</label>
          <small 
						class="helper-text invalid"
						v-if="$v.name.$dirty && !$v.name.required"
					>
						Введите ваше имя
					</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button class="btn waves-effect waves-light auth-submit" type="submit">
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link tag="a" to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>


<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "registration",
  //
  data: () => ({
    name: "",
    email: "",
    password: "",
    agree: false
  }),
  //
  validations: {
    name: { required },
    email: { email, required },
    password: { required, minLength: minLength(8) },
    agree: { checked: v => v }
  },
  //
  methods: {
		async submitHandler(){
			if(this.$v.$invalid) {
				this.$v.$touch();
				return
			}

			const formData = {
				name: this.name,
				email: this.email,
				password: this.password,
				agree: this.agree,
			}

      console.log(formData);
      
      try{
        await this.$store.dispatch('register', formData)
        this.$router.push('/');
      }
      catch (e) {
        console.log(e)
      }

		}
	}
};
</script>