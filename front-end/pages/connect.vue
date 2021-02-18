<template>
  <v-row>
    <v-col class="text-center" cols="6" offset="3">
      <MyCorpoLogo />
      <v-card>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              label="Login"
              required
            />
            <v-text-field
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
