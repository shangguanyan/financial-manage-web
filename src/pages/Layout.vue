<!--页面布局-->
<template>
  <!--theme-->
  <v-app dark>
    <!--左侧导航-->
    <v-navigation-drawer></v-navigation-drawer>
    <!--顶部工具栏-->
    <v-toolbar></v-toolbar>
    <!--中间内容-->
    v-content 并不是组件，是标记页面布局的元素
    <v-content>

    </v-content>
    <div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>

<style scoped>

</style>
