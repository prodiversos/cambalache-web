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
              :hint="`${currencyFormat.format(precioMinimo)} - ${currencyFormat.format(precioMaximo)}`"
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
      <v-col class="text-center">
        <v-btn tile x-large color="primary" @click="$emit('buscar')">
          <v-icon left>fas fa-search</v-icon>
          Buscar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PanelBusquedaAnuncio',
  props: {
    titulo: String,
    tipoArticuloList: Array,
    idTipoArticulo: String,
    precioMinimo: Number,
    precioMaximo: Number
  },
  data: () => ({
    currencyFormat: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }),
    tipoArticulo: null
  }),
  methods: {
    syncProp(prop, value) {
      this.$emit(`update:${prop}`, value)
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
