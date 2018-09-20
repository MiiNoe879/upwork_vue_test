<template lang='pug'>
  section.mt6.mw5.center.w-100
    h1.tc.f3.fw7.ttu.tracked Todos
    hr.bt.b--moon-gray
    div.mb5
      template(v-for='todo in todos')
        div.items-center.flex.shadow-1(v-if="todo.complete && todo.status!=='archived'", v-on:click="onSelect(todo)").h2.mb3.mt3
          input(type="checkbox" checked).ml3.mr3
          pre.flex-auto.strike-ns {{todo.title}}
          pre.ml3.mr3(v-on:click="onRemove(todo, $event)") X
        div.items-center.flex.shadow-1(v-if="!todo.complete && todo.status!=='archived'", v-on:click="onSelect(todo)").h2.mb3.mt3.b--mid-gray
          input(type="checkbox" unchecked).ml3.mr3
          pre.flex-auto {{todo.title}}
          pre.ml3.mr3(v-on:click="onRemove(todo, $event)") X
      input(placeholder="New Todo", v-on:keydown="onNew",  v-model="todo").h2.w-100.mb3
    template(v-if="todos.filter((todo) => todo.status === 'archived').length")
      h1.tc.f3.fw5.ttu.tracked Archived Todos
      hr.bt.b--moon-gray
      div.mb5
        template(v-for='todo in todos')
          div.items-center.flex.shadow-1(v-if="todo.complete && todo.status==='archived'", v-on:click="onSelect(todo)").h2.mb3.mt3
            input(type="checkbox" checked).ml3.mr3
            pre.flex-auto.strike-ns {{todo.title}}
            pre.ml3.mr3(v-on:click="onRemove(todo, $event)") X
          div.items-center.flex.shadow-1(v-if="!todo.complete && todo.status==='archived'", v-on:click="onSelect(todo)").h2.mb3.mt3.b--mid-gray
            input(type="checkbox" unchecked).ml3.mr3
            pre.flex-auto {{todo.title}}
            pre.ml3.mr3(v-on:click="onRemove(todo, $event)") X
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data: () => ({
    todo: ''
  }),
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  methods: {
    onNew (event) {
      if (event.key === 'Enter' && this.todo) {
        this.$store.dispatch('add', this.todo)
        this.todo = ''
      }
    },
    onRemove (todo, event) {
      if (event) event.stopPropagation()
      this.$store.dispatch('remove', todo)
    },
    onSelect (todo) {
      this.$store.dispatch('update', todo)
    }
  }
}
</script>
