<template>
  <v-app id="app">
    <el-header>
      <v-app-bar app clipped-left color="#323232" dark flat v-if="this.$route.name !== 'Login'">
        <v-toolbar-title>Oh-My-Anime</v-toolbar-title>
        <v-toolbar-items class="ml-5">
          <v-btn text to="/">动漫管理</v-btn>
          <v-btn text to="/sds">未定</v-btn>
          <v-btn text @click="Logout">登出</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>

    <el-footer>
      <Footer></Footer>
    </el-footer>
  </v-app>
</template>

<script>
  import Footer from "./components/Footer";
  import config from "./config";

  export default {
    name: 'App',

    components: {
      Footer
    },

    data: () => ({
      //
    }),
    methods: {
      Logout() {
        this.axios.get(config.LogoutApi).then(() => {
          localStorage.removeItem('token')
          this.$router.push('/login')
        })
      }
    },
  };
</script>

<style>

</style>