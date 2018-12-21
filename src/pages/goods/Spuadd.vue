<template>
  <Card>
    <p>当前正在进行第 {{ step+1 }} 步</p>
    <Steps :current="step">
      <Step title="基本信息"></Step>
      <Step title="商品描述"></Step>
      <Step title="分类参数"></Step>
      <Step title="sku属性"></Step>
    </Steps>

    <Card v-show="step===0">
      <Row span="24">
        <Col span="12">
          <Col span="8" align="center">
            请选择品牌
          </Col>
        <Col span="14">
        <Select clearable  filterable v-model="spu.brandId" placeholder="品牌">
          <Option v-for="item in brands" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        </Col>
        <Col span="12">
          <Col span="8" align="center">
            请选择分类
          </Col>
          <Col span="14">
            <Cascader :data="categorys" trigger="hover"  v-model="cascaderCategoryId"   placeholder="类别" filterable >

            </Cascader>
          </Col>
        </Col>
      </Row>
    </br>
      <Row >
        <Col span="4" align="center">
        商品标题
        </Col>
        <Col  span="19" >
           <Input v-model="spu.title" placeholder="商品标题"  />
        </Col>
      </Row>
      </br>
      <Row >
        <Col span="4" align="center">
        包装清单
        </Col>
        <Col  span="19" >
        <Input v-model="spu.spuDetail.packList" placeholder="包装清单"  />
        </Col>
      </Row>
      </br>
      <Row >
        <Col span="4" align="center">
        售后服务
        </Col>
        <Col  span="19" >
        <Input v-model="spu.spuDetail.afterService" placeholder="售后服务"  />
        </Col>
      </Row>
    </Card>

    <Card v-show="step===1">
      <Row>
        <div class="edit_container">
          <el-upload ref="singleUpload"
                     class="logo-uploader"
                     :action="serverUrl"
                     :show-file-list="false"
                     :on-success="handleSuccess">
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg">
            <quill-editor
              v-model="spu.spuDetail.desc"
              ref="myQuillEditor"
              :options="editorOption"
              >
            </quill-editor>
          </el-row>
        </div>

      </Row>

    </Card>

    <Card v-show="step===2">


    </Card>

    <Card v-show="step===3">


    </Card>

    </Br>
    <Row>
      <Col span="12" align="center">
        <Button type="primary" @click="previous"  :disabled="step === 0">上一步</Button>
      </Col>
      <Col span="12" align="center" v-if="step === 3">
      <Button type="primary" @click="submit"  >提交</Button>
      </Col>
      <Col span="12" align="center" v-else>
      <Button type="primary" @click="next" >下一步</Button>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import config from '../../config'
    export default {
      name: "spuadd",
      components: {
        quillEditor,
      },
      data(){
        return {
          step:0,
          valid:  false,
          spu:  {
            title:  '',
            brandId:  '',
            spuDetail:  {
              packList: '',
              afterService: '',
              desc: ''
            },
            categoryId:''
          },
          brands: [
          ],
          serverUrl: 'http://api.jinrongjie.com/api/upload/image',
          content:'',
          editorOption: {
            placeholder: '',
            theme: 'snow',  // or 'bubble'
            modules: {
              toolbar: {
                container: config.toolbarOptions,  // 工具栏
                handlers: {
                  'image': function (value) {
                    if (value) {
                      document.querySelector('.logo-uploader input').click()
                    } else {
                      this.quill.format('image', false);
                    }
                  }
                }
              }
            }
          },
          quillUpdateImg: false,
          cascaderCategoryId:[],
          categorys:[]
        };
      },
      mounted()  {
        this.$nextTick(function () {
          this.getBrands();
          this.getCategory(this.parentid);
        });
      },
      methods:  {
        previous(){
          if(this.step > 0){
            this.step--
          }
        },
        next(){
          if(this.step < 3){
            this.step++
          }
        },
        getBrands(){
          this.$ajax.get('/goods/brand/list').then(res=>{
            if(res.status === 200){
              this.brands = res.data.map(function (item) {
                let brand = new Object();
                brand["value"] = item.id;
                brand["label"] = item.name;
                brand["isParnt"] = item.isParent;
                brand["parentId"] = item.parentId;
                return brand;
              })
            }
          });
        },
        getCategory(){
          this.$ajax.get('/goods/category/listPid').then(res=>{
            if(res.status === 200){
              this.categorys = res.data;
            }
          })
        },

        // beforeUpload() {
        //   this.quillUpdateImg = true;
        //   console.log("11")
        // },
        // 上传图片成功
        handleSuccess(res, file) {
          // 获取富文本组件实例
          let quill = this.$refs.myQuillEditor.quill
          // 如果上传成功
          if (file.status === 'success' && res !== null) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', res);
            // 调整光标到最后
            quill.setSelection(length + 1);
          } else {
            this.$message.error('图片插入失败')
          }
          // loading动画消失
          this.quillUpdateImg = false
        },
        // 上传图片失败
        uploadError() {
          this.quillUpdateImg = false
        },
        // onEditorReady(){},
        // onEditorChange(){},

        submit(){
          this.spu.categoryId = this.cascaderCategoryId.pop();
          console.log(this.spu)
        }
      }
    }
</script>

<style scoped>

</style>
