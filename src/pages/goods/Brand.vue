<template>
  <v-card>
    <v-card-title>
        <v-btn color="primary" fab small dark> <v-icon>add</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="brands"
      :search="search"
      :pagination.sync="pagination"
    >
      <template slot="items" slot-scope="brand">
        <td class="text-xs-center">{{ brand.item.id }}</td>
        <td class="text-xs-center">{{ brand.item.name }}</td>
        <td class="text-xs-center"><img :src="brand.item.image"/></td>
        <td class="text-xs-center">{{ brand.item.letter }}</td>
        <td class="text-xs-center">
          <v-btn color="blue" fab small dark>
            <v-icon>edit</v-icon>
          </v-btn>
          |
          <v-btn color="red" fab small dark>
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
    export default {
      name: "brand",
      data () {
        return {
          search: '',
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
      computed: function () {
        this.$nextTick(
          this.loadBrands()
        )
      },
      methods:  {
        loadBrands(){
          this.$ajax.get("/goods/brand/list").then(res=>{
            this.brands = res.data
          })
        }
      }

    }

</script>

<style scoped>

</style>
