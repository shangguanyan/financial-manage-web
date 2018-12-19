<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">基本信息</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="step > 2" step="2">商品描述</v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="step > 3" step="3">规格参数</v-stepper-step>
      <v-divider/>
      <v-stepper-step step="4">SKU属性</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <!--1、基本信息-->
      <v-stepper-content step="1">
        <v-flex class="xs10 mx-auto">
          <v-form v-model="valid" ref="basic">
            <v-layout row>

              <v-flex xs5>
                <!--品牌-->

                </v-select>
              </v-flex>
            </v-layout>
            <v-flex xs5>
              <!--商品分类-->

            </v-flex>
            <v-spacer/>
            <v-text-field label="商品标题" v-model="goods.title" :counter="200" required :rules="[v => !!v || '商品标题不能为空']" hide-details/>
            <v-text-field label="商品卖点" v-model="goods.subTitle" :counter="200" hide-details/>
            <v-text-field label="包装清单" v-model="goods.spuDetail.packingList" :counter="1000" multi-line :rows="3" hide-details/>
            <v-text-field label="售后服务" v-model="goods.spuDetail.afterService" :counter="1000" multi-line :rows="3" hide-details/>
          </v-form>
        </v-flex>
      </v-stepper-content>
      <!--2、商品描述-->
      <v-stepper-content step="2">
        <v-editor v-model="goods.spuDetail.description" upload-url="/upload/image"/>
      </v-stepper-content>
      <!--3、规格参数-->
      <v-stepper-content step="3">
        <v-flex class="xs10 mx-auto px-3">
          <!--遍历整个规格参数-->
          <v-card class="my-2">
            <v-container grid-list-md fluid>
              <v-layout wrap row justify-space-between class="px-5">
                <v-flex xs12 sm5 v-for="param in specs" :key="param.name">
                  <v-text-field :label="param.name" v-model="param.v" :suffix="param.unit || ''"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-stepper-content>
      <!--4、SKU属性-->
      <v-stepper-content step="4">
        <v-flex class="mx-auto">
          <!--遍历特有规格参数-->
          <v-card flat v-for="spec in specialSpecs" :key="spec.name">
            <!--特有参数的标题-->
            <div class="subheading">{{spec.name}}:</div>
            <!--特有参数的待选项，需要判断是否有options，如果没有，展示文本框，让用户自己输入-->
            <v-card-text class="px-5">
              <div v-for="i in spec.options.length+1" :key="i" class="layout row px-5">
                <v-text-field :placeholder="'新的' + spec.name + ':'" class="flex xs10" auto-grow
                              v-model="spec.options[i-1]" v-bind:value="i" single-line hide-details/>

                <v-btn @click="spec.options.splice(i-1,1)" v-if="i <= spec.options.length" icon>
                  <i class="el-icon-delete"/>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="elevation-0">
            <!--标题-->
            <div class="subheading py-3">SKU列表:</div>
            <v-divider/>
            <!--SKU表格，hide-actions因此分页等工具条-->
            <v-data-table :items="skus" :headers="headers" hide-actions item-key="indexes" class="elevation-0">
              <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                  <!--价格和库存展示为文本框-->
                  <td v-for="(v,k) in props.item" :key="k" v-if="['price', 'stock'].includes(k)"
                      class="text-xs-center">
                    <v-text-field single-line v-model="props.item[k]" @click.stop=""/>
                  </td>
                  <!--enable展示为checkbox-->
                  <td class="text-xs-center" v-else-if="k === 'enable'">
                    <v-checkbox v-model="props.item[k]"/>
                  </td>
                  <!--indexes和images不展示，其它展示为普通文本-->
                  <td class="text-xs-center" v-else-if="k !== 'images' && k !== 'indexes'">{{v.v}}</td>
                </tr>
              </template>
              <!--点击表格后展开-->
              <template slot="expand" slot-scope="props">
                <v-card class="elevation-2 flex xs11 mx-auto my-2">
                  <!--图片上传组件-->
                  <v-upload v-model="props.item.images" url="/upload/image"/>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
        <!--提交按钮-->
        <v-flex xs3 offset-xs9>
          <v-btn color="info" @click="submit">保存商品信息</v-btn>
        </v-flex>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import {Cascader} from 'iview'
  import 'iview/dist/styles/iview.css';
    export default {
        name: "spuadd",
      data(){
        return {
          step:1
        };
      }
    }
</script>

<style scoped>

</style>
