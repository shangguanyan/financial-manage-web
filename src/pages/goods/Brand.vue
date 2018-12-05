<template>
  <v-card>
    <v-card-title>
        <v-btn color="primary" fab small dark> <v-icon>add</v-icon></v-btn>
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
      :items="brands"
      :pagination.sync="pagination"
      :total-items="totalNum"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">
          <img v-if="props.item.image" :src="props.item.image" width="130" height="40">
          <span v-else>无</span>
        </td>
        <td class="text-xs-center">{{ props.item.letter }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="blue light4" fab small dark @click="editBrand(props.item)"> <v-icon>edit</v-icon></v-btn>

          <v-btn color="red" fab small dark @click="deleteBrand(props.item)"> <v-icon>delete</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
    export default {
      name: "brand",
      data () {
        return {
          search: '',
          pagination: {
            page: 1,
            rowsPerPage:  5
          },
          totalNum: 0,
          headers: [
            {text: 'id', align: 'center', value: 'id'},
            {text: '名称', align: 'center', sortable: false, value: 'name'},
            {text: 'LOGO', align: 'center', sortable: false, value: 'image'},
            {text: '首字母', align: 'center', value: 'letter', sortable: true,},
            {text: '操作', align: 'center', value: 'id', sortable: false}
          ],
          brands: [
          ]
        }
      },
      mounted: function () {
        this.$nextTick(
          this.loadBrands()
        )
      },
      methods:  {
        loadBrands(){
          this.$ajax({
            url:  "/goods/brand/list",
            method: 'post',
            data: {
              currentPage: this.pagination.page,
              pageRows: this.pagination.rowsPerPage,
              searchKeys: {
                name: this.search
              }
            }
          }).then(res=>{
              let pageResult = res.data;
              this.brands = pageResult.results;
              this.totalNum = pageResult.totalNum;
            })
        },
        getSearch(){
          this.loadBrands()
        },
        editBrand(brand){
          console.log(brand)
        },
        deleteBrand(brand){
          this.$message.confirm("确定要删除"+brand.name+"这个品牌吗").then(_=>{
            this.$ajax({
              url:  "goods/brand/delete",
              data: {
                "id": brand.id
              },
              contentType: 'application/text',
              method: 'post'
            }).then(res=>{
              debugger
              this.loadBrands()
            })
          }).catch(_=>{
            this.$message.error("网络异常")
          });

        },
        deleteTest(){
          console.log(1)
        }
      },
      watch:  {
        pagination:{
          deep: true,
          handler(){
            this.loadBrands()
          }
        }
      }

    }

</script>

<style scoped>

</style>
