<template>
  <v-card v-if="anuncio">
    <v-img height="250" contain :src="anuncio.imagen"></v-img>

    <v-card-title>
      <v-icon color="primary" left>{{ icon(anuncio.idTipoArticulo) }}</v-icon>
      <span class="text-h6">{{ anuncio.idTipoArticulo === 'OTRO' ? 'Artículo' : anuncio.descripcionTipoArticulo }}</span>
    </v-card-title>

    <v-card-text class="subtitle-1 font-weight-bold">
      <div style="min-height: 60px">
        {{ anuncio.titulo }}
      </div>

      <v-divider class="my-3"></v-divider>

      <div class="text--accent">
        <v-icon size="16" class="mr-2">far fa-calendar</v-icon>
        {{ formatter.formatDate(anuncio.fechaPublicacion) }}
      </div>
    </v-card-text>

    <v-list-item class="grow grey lighten-4">
      <v-list-item-avatar color="grey darken-3">
        <v-img
          class="elevation-6"
          alt=""
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ anuncio.nombreAnunciante }}</v-list-item-title>
        <v-list-item-subtitle>{{ anuncio.correoAnunciante }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{ anuncio.telefonoAnunciante || 'Sin número de teléfono' }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-container fluid class="pa-5">
        <v-row
          align="center"
          justify="end"
        >
          <v-btn text color="primary">
            <v-icon left>fas fa-comments-dollar</v-icon>
            Contactar
          </v-btn>

          <span class="mx-2">·</span>

          <v-btn icon @click="like">
            <v-icon color="accent">
              mdi-heart
            </v-icon>
          </v-btn>
          <span class="subheading mr-2">{{ likes }}</span>

          <span class="mx-1">·</span>

          <v-btn icon @click="share">
            <v-icon color="secondary">
              mdi-share-variant
            </v-icon>
          </v-btn>
          <span class="subheading">{{ shares }}</span>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import formatter from '~/lib/formatter';

export default {
  name: 'AnuncioCard',
  props: {
    anuncio: Object
  },
  data() {
    return {
      formatter,
      icons: {
        'CARRO': 'fas fa-car',
        'MUEBLE': 'fas fa-couch',
        'CASA': 'fas fa-home',
        'ELECTRONICO': 'fas fa-laptop',
        'LINEA_BLANCA': 'fas fa-blender',
        'OTRO': 'fas fa-box'
      },
      likes: this.randomInt(1, 100),
      liked: false,
      shares: this.randomInt(1, 50),
      shared: false
    };
  },
  methods: {
    randomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    icon(idTipoArticulo) {
      let i = this.icons[idTipoArticulo];
      return i || this.icons['OTRO'];
    },
    like() {
      if (this.liked) {
        return;
      }

      this.likes++;
      this.liked = true;
    },
    share() {
      if (this.shared) {
        return;
      }

      this.shares++;
      this.shared = true;
    }
  }
}
</script>

<style scoped>

</style>
