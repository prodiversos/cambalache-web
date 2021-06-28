<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          label="Anuncio"
          outlined
          dense
          :value="titulo"
          @input="value => syncProp('titulo', value)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          label="Tipo"
          outlined
          dense
          clearable
          no-data-text="No hay datos para mostrar"
          :items="tipoArticuloList"
          item-value="idTipoArticulo"
          item-text="descripcion"
          :value="idTipoArticulo"
          @input="value => syncProp('idTipoArticulo', value)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-range-slider
              label="Precio"
              :hint="`${formatter.formatCurrency(precioMinimo)} - ${formatter.formatCurrency(precioMaximo)}`"
              persistent-hint
              min="0"
              max="1000000"
              :value="[ precioMinimo, precioMaximo ]"
              @input="value => syncProps(['precioMinimo', 'precioMaximo'], value)"
            ></v-range-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              outlined
              dense
              type="number"
              prefix="$"
              :value="precioMinimo"
              @input="value => syncProp('precioMinimo', value)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              type="number"
              prefix="$"
              :value="precioMaximo"
              @input="value => syncProp('precioMaximo', value)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="Resultados por Página"
          outlined
          dense
          type="number"
          :value="pageSize"
          @input="value => syncProp('pageSize', value)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn tile x-large color="primary" @click="$emit('buscar')">
          <v-icon left>fas fa-search</v-icon>
          Buscar
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <div class="h4 grey--text text-center">
      Página {{ pageNumber }}
    </div>

    <v-row justify="space-around" class="py-5">
      <v-col>
        <v-btn :disabled="pageNumber === 1"
               text
               color="accent"
               @click="syncProp('pageNumber', pageNumber - 1)"
        >
          Anterior
        </v-btn>
      </v-col>
      <v-col>
        <v-btn :disabled="!nextButton"
               text
               color="accent"
               @click="syncProp('pageNumber', pageNumber + 1)"
        >
          Siguiente
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formatter from '~/lib/formatter';

export default {
  name: 'PanelBusquedaAnuncio',
  props: {
    titulo: String,
    tipoArticuloList: Array,
    idTipoArticulo: String,
    precioMinimo: Number,
    precioMaximo: Number,
    pageNumber: Number,
    pageSize: Number,
    nextButton: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    formatter,
    tipoArticulo: null
  }),
  methods: {
    syncProp(prop, value) {
      this.$emit(`update:${prop}`, value);
      if (prop !== 'pageNumber') {
        this.$emit('update:pageNumber', 1);
      }
    },
    syncProps(props, values) {
      props.forEach((prop, index) => {
        let value;
        if (index < values.length) {
          value = values[index];
        }
        this.syncProp(prop, value);
      });
    }
  }
}
</script>

<style scoped>

</style>
