<!--页面布局-->
<template>
  <!--theme-->
  <v-app dark>
    <!--左侧导航-->
    <v-navigation-drawer
      :dark="dark"
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="../assets/touxiang.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>admin</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-list-group
          v-model="item.active"
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <!--一级菜单 -->
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <!-- 二级菜单 -->
          <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="item.path + subItem.path">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>
    <!--顶部工具栏-->
    <v-toolbar
      app
      dark
      :color="dark ? 'secondary' : 'primary'"
    >
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <!-- 收起左侧菜单的按钮-->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <!-- 切换黑暗主题 -->
      <v-flex xs1>
        <v-switch
          :label="dark ? '暗黑' : '明亮'"
          v-model="dark"
          color="dark"
          hide-details
        />
      </v-flex>
      <!-- 顶部导航标题 -->
      <v-flex xs3></v-flex>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <!-- 调色板 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <!-- 顶部导航用户菜单 -->
      <v-btn icon @click.stop="dark = !dark">
        <v-icon>account_box</v-icon>
      </v-btn>

    </v-toolbar>
    <!--中间内容-->
    <!--v-content 并不是组件，是标记页面布局的元素-->
    <v-content>

    </v-content>
    <div>
      <router-view/>
    </div>
  </v-app>
</template>

<script>

    export default {
      name: "App",
      data: ()=>{
        items: []
      },
      mounted: ()=>{
        this.$nextTick(function () {
          this.loadItems()
        })
      },
      methods: {
        loadItems() {
          this.$ajax.get('/api/menus/menu/list').then(res=>{
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>
  .box {
    width: 90%;
  }
</style>
