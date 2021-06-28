<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="crearMensajeContacto">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            <v-icon left>fas fa-comment</v-icon>
            Contacto
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre"
                  outlined
                  v-model="creacionMensajeContacto.command.nombre"
                  :disabled="creacionMensajeContacto.isExecuting"
                  :rules="rules.nombre"
                ></v-text-field>

                <v-text-field
                  label="Correo"
                  type="email"
                  outlined
                  v-model="creacionMensajeContacto.command.correo"
                  :disabled="creacionMensajeContacto.isExecuting"
                  :rules="rules.correo"
                ></v-text-field>

                <v-textarea
                  label="Comentario"
                  outlined
                  v-model="creacionMensajeContacto.command.comentario"
                  :disabled="creacionMensajeContacto.isExecuting"
                  :rules="rules.comentario"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" :disabled="creacionMensajeContacto.isExecuting">
            <v-icon v-if="creacionMensajeContacto.isExecuting" left>fas fa-circle-notch fa-spin</v-icon>
            <v-icon v-else left>fas fa-paper-plane</v-icon>
            Enviar
          </v-btn>
          <v-btn text @click="close" :disabled="creacionMensajeContacto.isExecuting">
            <v-icon left>fas fa-undo</v-icon>
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <v-snackbar v-if="creacionMensajeContacto.output" :value="true" color="success">
      Tu comentario se ha registrado con éxito.
    </v-snackbar>

    <v-snackbar v-if="creacionMensajeContacto.error" :value="true" color="error">
      {{ creacionMensajeContacto.error.message || creacionMensajeContacto.error }}
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  name: 'RegistroMensajeContactoDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const nombreMaxLength = 50;
    const comentarioMaxLength = 100;

    return {
      valid: true,
      rules: {
        nombre: [
          v => !!v || 'El nombre es requerido',
          v => (v && v.length <= nombreMaxLength) || `El nombre excede los ${nombreMaxLength} caracteres permitidos`,
        ],
        correo: [
          v => !!v || 'El correo es requerido',
          v => /.+@.+\..+/.test(v) || 'La dirección de correo no es válida',
        ],
        comentario: [
          v => !!v || 'El comentario es requerido',
          v => (v && v.length <= comentarioMaxLength) || `El comentario excede los ${comentarioMaxLength} caracteres permitidos`,
        ]
      },
      nombreMaxLength,
      comentarioMaxLength,
      creacionMensajeContacto: {
        command: {
          nombre: null,
          correo: null,
          comentario: null
        },
        isExecuting: false
      }
    };
  },
  methods: {
    async crearMensajeContacto() {
      if (this.creacionMensajeContacto.isExecuting) {
        return;
      }

      if (!this.$refs.form.validate()) {
        return;
      }

      const command = {
        ...this.creacionMensajeContacto.command
      };

      this.creacionMensajeContacto.isExecuting = true;
      try {
        const { result } = await this.$axios.$post(`${this.$config.backendUrl}/mensaje-contacto`, command);
        this.$emit('success', result);
        this.close();
      } catch (error) {
        this.$emit('error', error);
      } finally {
        this.creacionMensajeContacto.isExecuting = false;
      }
    },
    close() {
      this.$refs.form.reset();
      this.$emit('input', false);
    }
  }
}
</script>

<style scoped>

</style>
