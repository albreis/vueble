<template>
  <Vueble :table="table" />
</template>

<script>
/* eslint-disable */
import Vueble from './Vueble'
import Table from './Table.js'
export default {
    components: {
        Vueble
    },
    data() {
        return {
            table: Table
        }
    }
}
</script>

<style lang="stylus">
table
    [data-name]:after
        content attr(data-name)
</style>