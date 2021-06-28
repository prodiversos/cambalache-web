<template>
  <v-container fluid fill-height class="grey lighten-5 pa-5">
    <v-navigation-drawer v-model="drawer" app fixed clipped width="300px">
      <v-sheet
        dark
        color="accent"
        class="overflow-y-auto mb-4"
        max-height="600"
      >
        <div class="text-center pa-5 transition-swing">
          <h1>Buscador Empresarial de Anuncios</h1>
        </div>
      </v-sheet>

      <!-- Panel de búsqueda y paginación -->
      <panel-busqueda-anuncio
        :tipo-articulo-list="busquedaTipoArticulo.output"
        v-bind.sync="busquedaAnuncio.params"
        :next-button="busquedaAnuncio.output && busquedaAnuncio.output.length === busquedaAnuncio.params.pageSize"
        @buscar="buscarAnuncio"
      ></panel-busqueda-anuncio>
    </v-navigation-drawer>

    <v-row v-if="busquedaAnuncio.output.length > 0" justify="center">
      <v-col v-for="anuncio of busquedaAnuncio.output"
             :key="anuncio.idAnuncio"
             cols="3"
      >
        <anuncio-card v-bind="{ anuncio }" />
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col class="text-center">
        <div>
          <v-icon color="grey--text" size="128">fas fa-box</v-icon>
        </div>
        <h1 class="grey--text">No hay datos para mostrar</h1>
      </v-col>
    </v-row>

    <v-snackbar v-if="busquedaTipoArticulo.error" :value="true" color="error">
      {{ busquedaTipoArticulo.error.message || busquedaTipoArticulo.error }}
    </v-snackbar>

    <v-snackbar v-if="busquedaAnuncio.error" :value="true" color="error">
      {{ busquedaAnuncio.error.message || busquedaAnuncio.error }}
    </v-snackbar>
  </v-container>
</template>

<script>
import PanelBusquedaAnuncio from '~/components/anuncios/busqueda/PanelBusquedaAnuncio';
import AnuncioCard from '~/components/anuncios/AnuncioCard';

export default {
  head: {
    title: 'Búsqueda'
  },
  components: {
    PanelBusquedaAnuncio,
    AnuncioCard
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
        precioMaximo: 1000000,
        pageNumber: 1,
        pageSize: 10
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
        this.busquedaTipoArticulo.output = result || [];
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

      const params = {
        ...this.busquedaAnuncio.params
      };

      if (!params.pageNumber || !params.pageSize) {
        return;
      }

      params.titulo = `%${(params.titulo || '').trim()}%`
      params.pageOffset = (params.pageNumber || 1) - 1;
      delete params.pageNumber;

      this.busquedaAnuncio.isRunning = true;
      this.busquedaAnuncio.error = null;

      try {
        const { result } = await this.$axios.$get('http://localhost:8080/anuncio', { params });
        this.busquedaAnuncio.output = result || [];

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
