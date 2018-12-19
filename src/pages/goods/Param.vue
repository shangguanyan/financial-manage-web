<template>
  <v-card>
    <v-layout row>
      <!-- 商品分类 -->
      <v-flex xs3>
        <v-card>
          <v-card-title>选择分类，查看规格参数模板：</v-card-title>
          <v-divider/>
          <v-tree url="/goods/category/list"
                  :isEdit="false"
                  @handleClick="handleClick"
          />
        </v-card>
      </v-flex>
      <!-- 规格参数 -->
      <v-flex xs9 class="px-1" v-if="showCategoryParam">
      <v-card-title>
        <v-btn color="primary" @click="addCategoryParam" fab small dark> <v-icon>add</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-form>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="输入搜索的名称"
            @click:append="getSearch"
            single-line
            hide-details
          ></v-text-field>
        </v-form>
      </v-card-title>


        <v-data-table
          :headers="headers"
          :items="categoryParams"
          :pagination.sync="pagination"
          :total-items="totalNum"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.paramName }}</td>
            <td class="text-xs-center">
              <span >{{props.item.search | searchShow}}</span>
            </td>
            <td class="justify-center layout px-0">
              <v-btn color="blue light4" fab small dark @click="editBrand(props.item)"> <v-icon>edit</v-icon></v-btn>
              <v-btn color="red" fab small dark @click="deleteBrand(props.item)"> <v-icon>delete</v-icon></v-btn>
            </td>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog"  color="primary" max-width="500px">
          <v-card>
            <v-toolbar dense dark color="#b3d4fc">
              <v-toolbar-title>
                <v-breadcrumbs>
                  <v-icon slot="divider">chevron_right</v-icon>
                  <v-breadcrumbs-item v-for="(item,index) in itemName" :key="index">{{item}}</v-breadcrumbs-item>
                </v-breadcrumbs>
              </v-toolbar-title>
              <v-spacer/>
              <!--关闭窗口的按钮-->
              <v-btn icon @click="closeClick"><v-icon>close</v-icon></v-btn>
            </v-toolbar>
            <v-form v-model="valid" ref="addCategoryParamForm">
              <v-flex xs9 >
                <v-text-field v-model="addCategoryParamForm.paramName" middle  label="属性名称" padding-left="20px" required />
              </v-flex>

              <v-flex xs6 display="inline">
                <v-subheader>是否可搜索</v-subheader>
                <v-select
                  :items="selectitems"
                  v-model="searched"
                  item-text="state"
                  item-value="abbr"
                  label=""
                  solo
                ></v-select>
              </v-flex>



            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="reset">reset</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-card>

</template>

<script>
    export default {
      name: "cateporyparam",
      data()  {
        return {
          showCategoryParam: false,
          clickNode:  {},
          search: '',
          searched:null,
          selectitems: [
            {state:'是',abbr:1},
            {state:'否',abbr:0},
          ],
          pagination: {
            page: 1,
            rowsPerPage: 5
          },
          totalNum: 0,
          headers: [
            {text: 'id', align: 'center', value: 'id'},
            {text: '参数名称', align: 'center', sortable: false, value: 'name'},
            {text: '是否可搜索', align: 'center', sortable: false, value: 'image'},
            {text: '操作', align: 'center', value: 'id', sortable: false}
          ],
          categoryParams: [],
          valid:  false,
          dialog: false,
          isEdit:false,
          addCategoryParamForm: {
            paramName: '',
            search:null,
            isEdit:false,
            categoryId:''
          },
          itemName: []

        };
      },
      methods:  {
        queryCategoryParam(){
          this.$ajax({
            url: "/goods/categoryParam/getByCid",
            method: 'post',
            data: {
              currentPage: this.pagination.page,
              pageRows: this.pagination.rowsPerPage,
              searchKeys: {
                name: this.search,
                category_id: this.clickNode.id
              }
            }
          }).then(res => {
            let pageResult = res.data;
            this.categoryParams = pageResult.results;
            this.totalNum = pageResult.totalNum;
          });
        },

        handleClick(node) {
          if (!node.isParent) {
            // 显示规格组
            this.showCategoryParam = true;
            this.clickNode = node;
            this.queryCategoryParam();
          }else {
            this.showCategoryParam = false;
          }
        },
        addCategoryParam(){
          this.dialog = true;
          this.itemName = this.clickNode.path;
          this.isEdit = false;
        },
        reset(){
          this.$refs.addCategoryParam.reset();
        },
        save(){
          this.addCategoryParamForm.isEdit = this.isEdit;
          this.addCategoryParamForm.categoryId = this.clickNode.id;
          this.addCategoryParamForm.search = this.searched;
          this.$ajax({
            url:'/goods/categoryParam/add',
            method:'post',
            data:this.addCategoryParamForm
          }).then(res=>{
            if(res.status === 200){
              this.dialog = false;
              this.$refs.addCategoryParamForm.reset();
              this.queryCategoryParam();
            }
          })
        },
        closeClick(){
          this.dialog = false;
          this.queryCategoryParam();
        },
        getSearch(){
          this.queryCategoryParam();
        }
      },
      filters:{
        searchShow(value){
          return value === 1?'是':'否';
        }
      },
      watch:  {
        pagination:{
          deep: true,
          handler(){
            this.queryCategoryParam()
          }
        }
      }
    }
</script>

<style scoped>

</style>
