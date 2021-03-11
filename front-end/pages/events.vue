<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <MyCorpoLogo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Évènements
        </v-card-title>
        <v-card-text>
          <v-card v-for="(event) in filteredAndSortedEvents" :key="event.id">
            <v-card-title>
              {{ event.dateFormated }} : {{ event.name }}
            </v-card-title>
            <v-card-text>
              <v-col cols="12">
                {{ event.description }}
              </v-col>
              <v-col cols="12" class="text-right">
                <v-btn>
                  <v-icon>
                    mdi-pencil-outline
                  </v-icon>
                  Modifier
                </v-btn>
                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="red darken-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>
                        mdi-delete-outline
                      </v-icon>
                      Supprimer
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline">
                      Suppression d'évènement
                    </v-card-title>

                    <v-card-text>
                      <span>Êtes-vous sûr de vouloir supprimer cet évènement ?</span>
                    </v-card-text>

                    <v-divider />

                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        color="red"
                        text
                        @click="deleteEvent(event)"
                      >
                        Supprimer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-card-text>
          </v-card>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
              <v-card>
                <v-card-text>
                  <div v-if="errors.length" class="text-center" style="color: red">
                    <b>Des champs ne sont pas remplis:</b>
                    <ul style="list-style-type: none">
                      <li v-for="error in errors" :key="error">
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                  <v-form
                    ref="form"
                  >
                    <v-text-field
                      v-model="name"
                      label="Titre"
                      name="title"
                      required
                    />
                    <v-text-field
                      v-model="description"
                      label="Description"
                      name="description"
                      required
                    />
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          required
                          label="Date de l'évènement"
                          prepend-icon="mdi-calendar"
                          name="date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu = false"
                      />
                    </v-menu>
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="hour"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="hour"
                          required
                          label="Heure de l'évènement"
                          prepend-icon="mdi-clock-time-four-outline"
                          name="time"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="hour"
                        full-width
                        @click:minute="$refs.menu.save(hour)"
                      />
                    </v-menu>
                    <v-btn tile class="text-right" @click="submitEvent">
                      Ajouter un évènement
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import MyCorpoLogo from '~/components/MyCorpoLogo.vue'

export default {
  components: {
    MyCorpoLogo
  },
  data () {
    return {
      events: [],
      name: null,
      description: null,
      date: null,
      hour: null,
      menu: false,
      menu2: false,
      errors: false
    }
  },
  async fetch () {
    this.events = await this.$axios.$get('evenement')
  },
  computed: {
    filteredAndSortedEvents () {
      const vm = this
      vm.events.forEach(function (event) {
        event.dateFormated = moment(event.date).format('DD/MM/YYYY à hh:mm:ss')
      })
      const filtered = vm.events.filter((event) => {
        return event.isActive
      })
      return filtered.sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? 1 : -1)
    }
  },
  methods: {
    checkForm () {
      this.errors = []

      if (!this.name) {
        this.errors.push('Aucun nom d\'évènement.')
      }
      if (!this.description) {
        this.errors.push('Aucune description d\'évènement.')
      }
      if (!this.date) {
        this.errors.push('Aucune date d\'évènement.')
      }
      if (!this.hour) {
        this.errors.push('Aucune heure d\'évènement.')
      }
    },
    async submitEvent () {
      this.checkForm()
      if (this.errors.length < 1) {
        const formatedDate = this.date + 'T' + this.hour
        const eventToPost = {
          name: this.name,
          description: this.description,
          date: formatedDate,
          isActive: true
        }

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventToPost)
        }
        const response = await fetch('http://localhost:3333/evenement', requestOptions)
        const data = await response
        if (data.status === 201) {
          this.events.push(eventToPost)
          this.name = null
          this.description = null
          this.date = null
          this.hour = null
        }
      }
    },
    deleteEvent (event) {
      this.dialog = false
      this.$axios.$delete('evenement/' + event.id)
        .then(() => {
          const index = this.events.map((event) => {
            return event.id
          }).indexOf(event.id)

          this.events.splice(index, 1)
        })
    }
  }

}
</script>
