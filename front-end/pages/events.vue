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
              {{ event.description }}
            </v-card-text>
          </v-card>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6">
              <v-card>
                <v-card-text>
                  <v-form
                    ref="form"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="name"
                      label="Titre"
                      required
                    />
                    <v-text-field
                      v-model="description"
                      label="Description"
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
                    <v-btn tile class="text-right" @click="submitEvent()">
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
      menu2: false
    }
  },
  async fetch () {
    this.events = await fetch(
      'http://localhost:3333/evenement'
    ).then(
      res => res.json()
    )
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
    async submitEvent () {
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
      }
    }
  }

}
</script>
