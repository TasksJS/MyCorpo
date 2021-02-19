<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="mt-10">
        <v-card-title class="headline">
          My Beautiful Profile Page
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.username"
            disabled
            label="Fonctionnalité désactivé"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="updateUserName">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mt-5">
        <v-card-title class="headline text-h6">
          Change my password
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="form.password"
            disabled
            label="Feature bientôt disponible ;)"
          />
          <v-text-field
            v-model="form.new_password"
            disabled
            label="Feature bientôt disponible ;)"
          />
          <v-text-field
            v-model="form.new_password_repeat"
            disabled
            label="Feature bientôt disponible ;)"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Profile',
  data: () => {
    return {
      form: {
        username: '',
        password: '',
        new_password: '',
        new_password_repeat: ''
      }
    }
  },
  mounted () {
    this.form.username = this.$auth.user
  },
  methods: {
    updateUserName () {
      this.$axios.$put('/users', {
        username: this.form.username
      })
      this.$auth.fetchUser()
    }
  }
}
</script>

<style scoped>

</style>
