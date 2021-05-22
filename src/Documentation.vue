<template>
  <div class="documentation">
      <aside>
          <h3>Vueble {{infos.version}}</h3>
          <a v-for="page in pages" :key="page.name" :class="{active: page.name == component.name}" @click.prevent="component=page">{{page.name}}</a>
      </aside>
      <main>
          <h1 v-html="component.name"></h1>
          <hr/>
          <component :is="component" />
      </main>
  </div>
</template>

<script>
import Infos from '@/../package.json'
import Introducao from './pages/Introducao.vue'
import Instalacao from './pages/Instalacao.vue'
export default {
    data() {
        return {
            infos: Infos,
            component: Introducao,
            pages: [
                Introducao,
                Instalacao,
            ]
        }
    }
}
</script>

<style lang="stylus">
*
    box-sizing border-box
body
    margin 0
    padding 0
    font-family Verdana, Arial, 'sans-serif'
    .documentation
        display flex
aside
    background #137
    width 200px
    min-height 100vh
    padding 15px
    h3
        font-size 15px
        color #fff
        border-bottom 1px solid #aaa
        padding-bottom 10px
    a
        color #fff
        line-height 50px
        cursor pointer
        display block
        &.active
            font-weight bold
        &+a
            border-top 1px solid #570
main
    width 100%
    padding 15px
    h1
        margin 0 0 15px 0
        color #ccc
        font-size 20px
    hr
        border 1px solid #ddd
</style>