<template>
  <v-card>
    <v-card-title>
        <v-btn color="primary" @click="addBrand" fab small dark> <v-icon>add</v-icon></v-btn>
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


    <v-dialog v-model="dialog"  color="primary" max-width="500px">
      <v-card>
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>新增品牌</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="dialog=false"><v-icon>close</v-icon></v-btn>
        </v-toolbar>
        <v-form v-model="valid" ref="addBrandForm">
          <v-text-field v-model="brand.name"  label="请输入品牌名称" required />
          <v-text-field v-model="brand.letter" label="请输入品牌首字母" required />
          <v-cascader
            url="/goods/category/list"
            multiple
            required
            v-model="brand.categories"
            label="请选择商品分类"/>
          <v-layout row>
            <v-flex xs3>
              <span style="font-size: 16px; color: #444">品牌LOGO：</span>
            </v-flex>
            <v-flex>
              <v-upload
                v-model="brand.image"
                url="/upload/image"
                :multiple="false"
                :pic-width="250"
                :pic-height="90"
              />
            </v-flex>
          </v-layout>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="reset">reset</v-btn>
          <v-btn color="blue darken-1" flat @click="saveBrand">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          ],
          dialog: false,
          valid:false, // 表单校验结果标记
          brand:{
            name:'', // 品牌名称
            letter:'', // 品牌首字母
            image:'',// 品牌logo
            categories:[], // 品牌所属的商品分类数组
            isEdit:false
          },
          isEdit:false//通过点击按钮判断是添加还是修改
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
        reset() {
          this.$refs.addBrandForm.reset();
        },
        getSearch(){
          this.loadBrands()
        },
        editBrand(brand){
          this.$ajax.get('/goods/brand/getByBid?bid='+brand.id).then(res=>{
            this.dialog = true;
            this.brand = brand;
            this.brand.categories = res.data;
          });
          this.isEdit = true;

        },
        addBrand() {
          this.dialog = true;
          this.brand = null;
          this.isEdit = false
        },
        saveBrand(){
          // let addBrandForm = this.$refs.addBrandForm;
          // console.log(addBrandForm)
          // console.log(this.brand)
          this.brand.isEdit = this.isEdit;
          this.$ajax({
            url:"/goods/brand/add",
            method:"post",
            data:this.brand
          }).then(res=>{
            let response = res;
            if(response.status === 200){
              this.dialog = false;
              this.loadBrands();
            }
          }).catch(_=>{
            this.$message.error("网络异常")
          })

        },
        deleteBrand(brand){
          let data= {
            "id": brand.id
          }
          this.$message.confirm("确定要删除"+brand.name+"这个品牌吗").then(_=>{
            this.$ajax({
              url:  "goods/brand/delete",
              data: this.$qs.stringify(data),
              contentType: 'application/x-www-form-urlencoded',
              method: 'post'
            }).then(res=>{
              this.$message.info("删除"+brand.name+"品牌成功")
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
