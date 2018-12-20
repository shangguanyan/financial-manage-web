<template>
  <Card>
    <p>当前正在进行第 {{ step+1 }} 步</p>
    <Steps :current="step">
      <Step title="步骤1"></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>

    <Card v-show="step===0">
      <Row span="24">
        <Col span="10">
          <Col span="8" align="center">
            请选择品牌
          </Col>
        <Col span="14">
        <Select clearable  filterable v-model="spu.brandId">
          <Option v-for="item in brands" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
        </Col>
        <Col span="10">
          <Col span="8" align="center">
            请选择分类
          </Col>
          <Col span="14">
            <Cascader :data="categorys" trigger="hover" @on-change="getNext(value,selectedData)" placeholder="品牌" filterable ></Cascader>
          </Col>
        </Col>
      </Row>

    </Card>

    <Card v-show="step===1">


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
    export default {
      name: "spuadd",
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
            }
          },
          brands: [
          ],
          categorys:[]
        };
      },
      mounted()  {
        this.$nextTick(function () {
          this.getBrands();
          this.getCategory(this.parentid);
        })
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
              // this.categorys = res.data.map(function (item) {
              //   let category = new Object();
              //   category["value"] = item.id;
              //   category["label"] = item.name;
              //   return category;
              // });
              this.categorys = res.data;
            }
          })
        },
        getNext(value,selectedData){
          console.log(selectedData)
        },
        submit(){
          console.log(this.spu.brandId)
        }
      }
    }
</script>

<style scoped>

</style>
