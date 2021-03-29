<template>
  <v-row>
    <v-col class="text-center" cols="6" offset="3">
      <MyCorpoLogo />
      <v-card>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="login.username"
              label="Login"
              name="login"
              required
            />
            <v-text-field
              v-model="login.password"
              type="password"
              name="password"
              label="Mot de passe"
              required
            />
            <v-btn tile name="btn-login" @click="userLogin">
              Se connecter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  auth: 'guest',

  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },

  mounted () {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },

  methods: {
    async userLogin () {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login
        })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
