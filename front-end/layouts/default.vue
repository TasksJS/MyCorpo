<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in itemsFiltered"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div v-if="$auth.loggedIn" class="pa-2">
          <v-btn color="red" block @click="$auth.logout('local')">
            Se déconnecter
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil',
          to: '/'
        },
        {
          icon: 'mdi-login',
          title: 'Se connecter',
          to: '/connect',
          hideWhenLoggedIn: true
        },
        {
          icon: 'mdi-calendar-multiple',
          title: 'Évènements',
          to: '/events',
          needLogin: true
        },
        {
          icon: 'mdi-account-circle',
          title: 'Mon profil',
          to: '/profile',
          needLogin: true
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'MyCorpo'
    }
  },
  computed: {
    itemsFiltered () {
      return this.items.filter(item =>
        item.needLogin ? (this.$auth.loggedIn) : item.hideWhenLoggedIn ? !this.$auth.loggedIn : true)
    }
  }
}
</script>
