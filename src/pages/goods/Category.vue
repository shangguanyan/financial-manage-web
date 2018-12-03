<template>
  <v-card>
    <v-flex xs9 sm11>
      <v-tree url="/goods/category/list"
              :isEdit="isEdit"
              @handleAdd="handleAdd"
              @handleEdit="handleEdit"
              @handleDelete="handleDelete"
              @handleClick="handleClick"
      />
    </v-flex>
  </v-card>
</template>

<script>
    export default {
      name: "category",
      data()  {
        return {
          isEdit: true
        }
      },
      mounted:  function () {
        this.$nextTick(

        )
      },
      methods:  {
        handleAdd(node) {
          console.log("add .... ");
          console.log(node);
        },
        handleEdit(id, name) {
          console.log("edit... id: " + id + ", name: " + name)
        },
        handleDelete(id) {
          console.log("delete ... " + id)
        },
        handleClick(node) {
          console.log(node)
        }
      }
    }
</script>

<style scoped>

</style>
