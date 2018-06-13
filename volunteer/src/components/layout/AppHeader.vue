<template>
  <v-toolbar color="white" light fixed app>
    <v-avatar
          :tile=false
          :size="48"
          color="grey lighten-4"
          class="mr-2"
        >
      <img src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=104754930364432&height=50&width=50&ext=1529148216&hash=AeRYRkJ2-Oc-FNK6">
    </v-avatar>
    <h4>5823*</h4>
    <v-spacer></v-spacer>
    <v-toolbar-title class="top-title"  @click="$router.push('/')">עזרה בדרך</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon v-if="$store.state.user" @click.stop="toggleMenu"></v-toolbar-side-icon>
  </v-toolbar>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppHeader',
    data () {
      return {}
    },
    methods: {...mapActions([
      'toggleMenu'
    ])}
  }
</script>

<style scoped>
.top-title{
  font-family: 'Amatic SC', cursive;
  font-size: 35px;
}
.toolbar--fixed{
  z-index: 3;
}
</style>
