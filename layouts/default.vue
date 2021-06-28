<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark flat fixed clipped-left>
      <v-toolbar-title v-text="title" />
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
