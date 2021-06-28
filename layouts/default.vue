<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark fixed clipped-left>
      <v-toolbar-title>
        <v-icon left>fas fa-bullhorn</v-icon>
        <span>{{ this.title }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="mensajeContactoDialog = true">
        <v-icon>far fa-envelope</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>

    <registro-mensaje-contacto-dialog
      v-model="mensajeContactoDialog"
      @success="mensajeContactoExitoso"
      @error="mensajeContactoFallido"
    />

    <v-snackbar v-if="resultadoMensajeContacto.exito" :value="true" color="success">
      Tu comentario se ha registrado con éxito.
    </v-snackbar>
    <v-snackbar v-if="resultadoMensajeContacto.error" :value="true" color="error">
      {{ resultadoMensajeContacto.error.message || resultadoMensajeContacto.error }}
    </v-snackbar>
  </v-app>
</template>

<script>
import RegistroMensajeContactoDialog from '~/components/contacto/RegistroMensajeContactoDialog';

export default {
  components: {
    RegistroMensajeContactoDialog
  },
  data: () => ({
    title: 'Cambalache',
    mensajeContactoDialog: false,
    resultadoMensajeContacto: {
      exito: false,
      error: null
    }
  }),
  methods: {
    mensajeContactoExitoso() {
      this.resultadoMensajeContacto.exito = true;
    },
    mensajeContactoFallido(error) {
      this.resultadoMensajeContacto.error = error;
    }
  }
}
</script>
