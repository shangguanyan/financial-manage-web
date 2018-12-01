<!--页面布局-->
<template>
  <v-app :dark="dark">
    <!-- 左侧导航条 -->
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

      <!-- 左侧菜单 -->
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
          <v-list-tile v-for="subItem in item.childrens" :key="subItem.title" :to="item.path+subItem.path"  @click="chageName(subItem,item)">
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
    <!-- 顶部工具条 -->

    <v-toolbar
      app
      color="light-blue accent-3"
    >
      <!-- 隐藏左侧菜单的按钮-->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <!-- 收起左侧菜单的按钮-->
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <!-- 切换黑暗主题 -->
      <!--<v-flex xs1>-->
        <!--<v-switch-->
          <!--:label="dark ? '暗黑' : '明亮'"-->
          <!--v-model="dark"-->
          <!--color="dark"-->
          <!--hide-details-->
        <!--/>-->
      <!--</v-flex>-->
      <!-- 顶部导航标题 -->
      <v-flex xs4></v-flex>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <v-btn icon @click="logout">
        <v-icon>logout</v-icon>
      </v-btn>

      <!-- 顶部导航用户菜单 -->

    </v-toolbar>
    <!--中间内容主体-->
    <v-content>
      <v-breadcrumbs>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item>{{item1}}</v-breadcrumbs-item>
        <v-breadcrumbs-item>{{item2}}</v-breadcrumbs-item>
      </v-breadcrumbs>
      <div>
        <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
    export default {
      name: "App",
      data()  {
        return  {
          dark: false,// 是否暗黑主题
          drawer: true,// 左侧导航是否隐藏
          miniVariant: false,// 左侧导航是否收起
          title: 'financial后台管理',// 顶部导航条名称,
          item1: '',
          item2: '',
          items:  []
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          this.loadItems()
        })
      },
      computed: {

      },
      methods: {
        loadItems() {
          this.$ajax.get('/menus/menu/list').then(res=>{
            this.items = res.data;

          });
        },
        //退出登录
        logout(){
          this.$ajax.post('/menus/user/logout').then(res=>{

          });
        },
        chageName(subItem,item){
          this.item1 = item.title
          this.item2 = subItem.title

        }
      }
    }
</script>

<style scoped>
  .box {
    width: 90%;
  }
</style>
