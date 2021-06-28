<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark fixed clipped-left>
      <v-toolbar-title>
        <v-icon left>fas fa-bullhorn</v-icon>
        <span>{{ this.title }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    title: 'Cambalache'
  })
}
</script>
