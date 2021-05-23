<template>
    <div class="table-builder">
        <table v-if="table" v-bind="parse(table.attrs, {table, model})" v-on="parse(table.events, {table, model})">
            <thead v-if="table.header" v-bind="parse(table.header.attrs, {table, model})" v-on="parse(table.header.events, {table, model})">
                <tr v-for="(row, i) in parse(table.header.rows, {table, model})" :key="`thead-tr-${i}`" v-bind="parse(row.attrs, {table, row, model})" v-on="parse(row.events, {table, row, model})">
                    <th v-for="(col, i) in parse(row.cols, {table, row, model})" v-html="col.label" :key="`thead-tr-th-${i}`" v-bind="parse(col.attrs, {table, row, col, model})" v-on="parse(col.events, {table, row, col, model})"></th>
                </tr>
            </thead>
            <tbody v-if="table.body" v-bind="parse(table.body.attrs, {table, model})" v-on="parse(table.body.events, {table, model})">
                <tr v-for="(row, i) in parse(table.body.rows, {table, model})" :key="`thead-tr-${i}`" v-bind="parse(row.attrs, {table, row, model})" v-on="parse(row.events, {table, row, model})">
                    <td v-for="(col, i) in parse(row.cols, {table, row, model})" v-html="col.label" :key="`tbody-tr-td-${i}`" v-bind="parse(col.attrs, {table, row, col, model})" v-on="parse(col.events, {table, row, col, model})"></td>
                </tr>
            </tbody>
            <tfoot v-if="table.footer" v-bind="parse(table.footer.attrs, {table, model})" v-on="parse(table.footer.events, {table, model})">
                <tr v-for="(row, i) in parse(table.footer.rows, {table, model})" :key="`tfoot-tr-${i}`" v-bind="parse(row.attrs, {table, row, model})" v-on="parse(row.events, {table, row, model})">
                    <td v-for="(col, i) in parse(row.cols, {table, row, model})" v-html="col.label" :key="`tfoot-tr-td-${i}`" v-bind="parse(col.attrs, {table, row, col, model})" v-on="parse(col.events, {table, row, col, model})"></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        table: {}            
    },
    methods: {
        parse(input, params) {
            if(typeof input == 'function') {
                return input(params)
            }
            return input
        }
    }
}
</script>

<style lang="stylus" scoped>
.table-builder
    *
        box-sizing border-box
.row
  display flex
  flex-wrap wrap 
  width 100%
[class*="col-"]
  width 100%
for i in 1..12
  .col-{i}
    max-width unit(100% * (i / 12), '%')
    padding 15px
</style>