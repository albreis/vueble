<template>
    <div class="table-builder">
        <table v-if="table" v-bind="parse(table.attrs, table)" v-on="parse(table.events, table)">
            <thead v-if="table.header" v-bind="parse(table.header.attrs, table)" v-on="parse(table.header.events, table)">
                <tr v-for="(row, i) in parse(table.header.rows, table)" :key="`thead-tr-${i}`" v-bind="parse(row.attrs, table, row)" v-on="parse(row.events, table, row)">
                    <th v-for="(col, i) in parse(row.cols, table, row)" v-html="col.label" :key="`thead-tr-th-${i}`" v-bind="parse(col.attrs, table, row, col)" v-on="parse(col.events, table, row, col)"></th>
                </tr>
            </thead>
            <tbody v-if="table.body" v-bind="parse(table.body.attrs, table)" v-on="parse(table.body.events, table)">
                <tr v-for="(row, i) in parse(table.body.rows, table)" :key="`thead-tr-${i}`" v-bind="parse(row.attrs, table, row)" v-on="parse(row.events, table, row)">
                    <td v-for="(col, i) in parse(row.cols, table, row)" v-html="col.label" :key="`tbody-tr-td-${i}`" v-bind="parse(col.attrs, table, row, col)" v-on="parse(col.events, table, row, col)"></td>
                </tr>
            </tbody>
            <tfoot v-if="table.footer" v-bind="parse(table.footer.attrs, table)" v-on="parse(table.footer.events, table)">
                <tr v-for="(row, i) in parse(table.footer.rows, table)" :key="`tfoot-tr-${i}`" v-bind="parse(row.attrs, table, row)" v-on="parse(row.events, table, row)">
                    <td v-for="(col, i) in parse(row.cols, table, row)" v-html="col.label" :key="`tfoot-tr-td-${i}`" v-bind="parse(col.attrs, table, row, col)" v-on="parse(col.events, table, row, col)"></td>
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
        parse(...params) {
            var input = params[0]
            var table = params[1] || null
            var row = params[2] || null
            var col = params[3] || null
            if(typeof input == 'function') {
                return input(table, row, col)
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