<template>
  <v-card>
    <v-toolbar class="elevation-0">
      <v-btn color="primary" to="/goods/spuadd">新增商品</v-btn>
      <v-spacer/>
      <v-flex xs3>
        状态：
        <v-btn-toggle mandatory v-model.lazy="saleAble">
          <v-btn flat :value="2">
            全部
          </v-btn>
          <v-btn flat :value="1">
            上架
          </v-btn>
          <v-btn flat :value="0">
            下架
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs3>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="输入搜索的名称"
          @click:append="getSearch"
          single-line
          hide-details
        />
      </v-flex>
    </v-toolbar>
    <v-divider/>

    <v-data-table
      :headers="headers"
      :items="spus"
      :pagination.sync="pagination"
      :total-items="totalNum"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.title }}</td>
        <td class="text-xs-center">{{ props.item.categoryName }}</td>
        <td class="text-xs-center">{{ props.item.brandName }}</td>
        <td class="text-xs-center">{{ props.item.valid | validValue }}</td>
        <td class="text-xs-center">{{ props.item.saleAble |  validSaleAble }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="blue light4" fab small dark @click="editBrand(props.item)"> <v-icon>edit</v-icon></v-btn>
          <v-btn color="red" fab small dark @click="deleteBrand(props.item)"> <v-icon>delete</v-icon></v-btn>
          <v-btn color="blue light4" v-if="props.item.saleAble === 1" fab small dark @click="editBrand(props.item)"> 下架</v-btn>
          <v-btn color="blue light4" v-else fab small dark @click="editBrand(props.item)"> 上架架</v-btn>

        </td>
      </template>
    </v-data-table>

  </v-card>


</template>

<script>
    export default {
        name: "List",
      data() {
        return {
          search: '',
          dialog: false,
          pagination: {
            page: 1,
            rowsPerPage:  5
          },
          totalNum: 0,
          headers: [
            {text: 'id', align: 'center', value: 'id'},
            {text: '标题', align: 'center', sortable: false, value: 'title'},
            {text: '商品分类', align: 'center', sortable: false, value: 'categoryName'},
            {text: '品牌', align: 'center', value: 'brandName', sortable: true,},
            {text: '是否有效', align: 'center', value: 'valid', sortable: true,},
            {text: '上架/下架', align: 'center', value: 'saleAble', sortable: true,},
            {text: '操作', align: 'center',  sortable: false}
          ],
          valid:false,
          spus:  [],
          spuForm:  {
            categories:[],
          },
          saleAble: 2
        };
      },
      // mounted:  function () {
      //   this.$nextTick(function () {
      //     this.loadSpu();
      //   })
      // },
      methods:{
        loadSpu(){
          let sale_able = this.saleAble;
          if(this.saleAble === 2){
            sale_able = null;
          }
          this.$ajax({
            url:'goods/spu/list',
            method:'post',
            data: {
              currentPage: this.pagination.page,
              pageRows: this.pagination.rowsPerPage,
              searchKeys: {
                sale_able: sale_able,
                title:this.search
              }
            }
          }).then(res=>{
            let pageResult = res.data;
            this.spus = pageResult.results
          })
        },
        getSearch(){
          this.loadSpu()
        }

      },
      filters: {
        validValue(value){
          return value === 1 ? '有效' : '无效';
        },
        validSaleAble(value){
          return value === 1 ? '上架' : '下架';
        }
      },
      watch:  {
        pagination:{
          deep: true,
          handler(){
            this.loadSpu();
          }
        },
        saleAble: {
          deep: true,
          handler(){
            this.loadSpu();
          }
        }
      }
    }
</script>

<style scoped>

</style>
