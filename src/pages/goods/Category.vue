<template>
  <v-treeview
    v-model="tree"
    :load-children="fetch"
    :items="items"
    activatable
    active-class="grey lighten-4 indigo--text"
    selected-color="indigo"
    open-on-click
    selectable
    expand-icon="mdi-chevron-down"
    on-icon="mdi-bookmark"
    off-icon="mdi-bookmark-outline"
    indeterminate-icon="mdi-bookmark-minus"
  >
  </v-treeview>
</template>

<script>
    export default {
      name: "",
      data: () => ({
        breweries: [],
        isLoading: false,
        tree: [],
        types: []
      }),

      computed: {
        items () {
          const children = this.types.map(type => ({
            id: type,
            name: this.getName(type),
            children: this.getChildren(type)
          }))

          return [{
            id: 1,
            name: 'All Breweries',
            children
          }]
        },
        selections () {
          const selections = []

          for (const leaf of this.tree) {
            const brewery = this.breweries.find(brewery => brewery.id === leaf)

            if (!brewery) continue

            selections.push(brewery)
          }

          return selections
        },
        shouldShowTree () {
          return this.breweries.length > 0 && !this.isLoading
        }
      },

      watch: {
        breweries (val) {
          this.types = val.reduce((acc, cur) => {
            const type = cur.brewery_type

            if (!acc.includes(type)) acc.push(type)

            return acc
          }, []).sort()
        }
      },

      methods: {
        fetch () {
          if (this.breweries.length) return
          return fetch('/goods/category/list?pid=0',)
            .then(res => res.json())
            .then(data => (this.breweries = data))
            .catch(err => console.log(err))
        },
        getChildren (type) {
          const breweries = []
          for (const brewery of this.breweries) {
            if (brewery.brewery_type !== type) continue

            breweries.push({
              ...brewery,
              name: this.getName(brewery.name)
            })
          }

          return breweries.sort((a, b) => {
            return a.name > b.name ? 1 : -1
          })
        },
        getName (name) {
          return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        }
      }
    }
</script>

<style scoped>

</style>
