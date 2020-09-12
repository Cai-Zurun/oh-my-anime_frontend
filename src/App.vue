<template>
  <v-app>
    <el-header>
      <v-app-bar
            app clipped-left dense flat color="rgb(60, 61, 60)" dark
            v-if="this.$route.name !== 'Login'">
        <v-toolbar-title style="font-family:'Bauhaus-Bold'; color:lightpink; font-size: 25px">
          <link href='http://cdn.repository.webfont.com/webfonts/nomal/136362/29782/5f5c7063f629d83ae03cc6f4.css' rel='stylesheet' type='text/css' />
          Oh-My-Anime
        </v-toolbar-title>
        <v-toolbar-items class="ml-5">
          <v-btn text to="/">动漫管理</v-btn>
          <v-btn text to="/sds">未定</v-btn>
          <v-btn text @click="Logout">登出</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </el-header>

<!--    <el-main>-->
      <router-view v-if="isRouterAlive"></router-view>
<!--    </el-main>-->

      <Footer></Footer>
  </v-app>
</template>

<script>
  import Footer from "./components/Footer";
  import config from "./utils";

  export default {
    name: 'App',

    components: {
      Footer
    },

    provide () {
      return {
        reload: this.reload
      }
    },

    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      Logout () {
        this.axios.get(config.LogoutApi).then(() => {
          sessionStorage.removeItem('sessionId')
          this.$router.push('/login')
        })
      },
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      },
    },
  };
</script>

<style>
  #app{
  }
</style>