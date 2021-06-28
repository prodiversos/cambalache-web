<template>
  <v-container fluid class="py-8 px-6">
    <v-navigation-drawer v-model="drawer" app fixed clipped>
      <v-sheet
        color="grey lighten-4"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-item>
          <div class="pa-3 transition-swing">
            <h1>Buscador Empresarial de Anuncios</h1>
          </div>
        </v-item>
      </v-sheet>

      <v-container fluid>
        <v-row>
          <v-col>
            <!-- TODO: Agregar panel de búsqueda -->
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-row>
      <v-col
        v-for="card in cards"
        :key="card"
        cols="12"
      >
        <v-card>
          <v-subheader>{{ card }}</v-subheader>

          <v-list two-line>
            <template v-for="n in 6">
              <v-list-item

                :key="n"
              >
                <v-list-item-avatar color="grey darken-1">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Message {{ n }}</v-list-item-title>

                  <v-list-item-subtitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider
                v-if="n !== 6"
                :key="`divider-${n}`"
                inset
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head: {
    title: 'Búsqueda'
  },
  data: () => ({
    drawer: true,
    cards: ['Today', 'Yesterday'],
  })
}
</script>
