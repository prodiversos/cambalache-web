<template>
  <v-container fluid class="py-8 px-6">
    <v-navigation-drawer v-model="drawer" app fixed clipped width="300px">
      <v-sheet
        color="grey lighten-4"
        class="overflow-y-auto mb-4"
        max-height="600"
      >
        <div class="text-center pa-5 transition-swing">
          <h1>Buscador Empresarial de Anuncios</h1>
        </div>
      </v-sheet>

      <span v-show="busquedaTipoArticulo.isRunning">Cargando...</span>

      <panel-busqueda-anuncio
        :tipo-articulo-list="busquedaTipoArticulo.output"
        v-bind.sync="busquedaAnuncio.params"
        @buscar="buscarAnuncio"
      ></panel-busqueda-anuncio>
    </v-navigation-drawer>

    <v-row>
      <v-col>
        <!-- TODO: Agregar panel de resultados búsqueda -->
        <v-sheet v-for="anuncio of busquedaAnuncio.output" :key="anuncio.idAnuncio"
                 class="pa-5 mb-3"
        >
          <h1>{{ anuncio.titulo }}</h1>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PanelBusquedaAnuncio from '~/components/anuncios/busqueda/PanelBusquedaAnuncio';

export default {
  head: {
    title: 'Búsqueda'
  },
  components: {
    PanelBusquedaAnuncio
  },
  data: () => ({
    drawer: true,
    busquedaTipoArticulo: {
      isRunning: false,
      output: [],
      error: null
    },
    busquedaAnuncio: {
      params: {
        titulo: null,
        idTipoArticulo: null,
        precioMinimo: 0,
        precioMaximo: 1000000
      },
      isRunning: false,
      output: [],
      error: null
    }
  }),
  watch: {
    ['busquedaAnuncio.params']: {
      deep: true,
      handler() {
        this.buscarAnuncio();
      }
    }
  },
  methods: {
    async buscarTipoArticulo() {
      if (this.busquedaTipoArticulo.isRunning) {
        return;
      }

      this.busquedaTipoArticulo.isRunning = true;
      this.busquedaTipoArticulo.error = null;

      try {
        const { result } = await this.$axios.$get('http://localhost:8080/tipo-articulo');
        this.busquedaTipoArticulo.output = result;
        await this.buscarAnuncio();
      } catch (error) {
        this.busquedaTipoArticulo.error = error;
      } finally {
        this.busquedaTipoArticulo.isRunning = false;
      }
    },
    async buscarAnuncio() {
      if (this.busquedaAnuncio.isRunning) {
        return;
      }

      this.busquedaAnuncio.isRunning = true;
      this.busquedaAnuncio.error = null;

      try {

        const params = {
          ...this.busquedaAnuncio.params
        };

        params.titulo = `%${(params.titulo || '').trim()}%`

        const { result } = await this.$axios.$get('http://localhost:8080/anuncio', { params });
        this.busquedaAnuncio.output = result;

      } catch (error) {
        this.busquedaAnuncio.error = error;
      } finally {
        this.busquedaAnuncio.isRunning = false;
      }
    }
  },
  mounted() {
    this.buscarTipoArticulo();
  }
}
</script>
