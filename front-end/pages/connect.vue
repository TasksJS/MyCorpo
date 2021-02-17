<template>
  <v-row>
    <v-col class="text-center" cols="6" offset="3">
      <MyCorpoLogo />
      <v-card>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              label="Login"
              required
            />
            <v-text-field
              v-model="password"
              type="password"
              label="Mot de passe"
              required
            />
            <v-btn tile>
              Se connecter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
