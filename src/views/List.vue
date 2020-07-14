<template>
  <div id="list">
    <div class="container my-3 w-100 mx-5">
      <div class="row w-100">
        <div class="col-8 col-md-10">
          <b-form-input v-model="newtodo" class="newtodo"></b-form-input>
        </div>
        <b-btn variant="warning" @click="addTodo" class="col-2 col-md-1 px-0 addtodo">新增</b-btn>
        <b-btn variant="info" @click="clearNewtodo" class="col-2 col-md-1 px-0">清空</b-btn>
      </div>
    </div>
    <b-table-simple>
      <b-thead>
        <b-tr>
          <b-th>事項</b-th>
          <b-th>動作</b-th>
        </b-tr>
      </b-thead>
      <draggable v-model="todos" tag="tbody" v-bind="dragOption">
        <b-tr v-if="todos.length == 0">
          <b-td colspan="2">沒有事項</b-td>
        </b-tr>
        <b-tr v-else v-for="(todo, index) in todos" :key="index">
          <b-td>
            <b-form-input v-model="todo.model" v-if="todo.edit" maxlength="10"></b-form-input>
            <b-btn variant="link" class="text-primary " v-if="todo.edit" @click="cancelTodo(index)">
              <font-awesome-icon :icon="['fas','undo']"></font-awesome-icon>
            </b-btn>
            <b-btn variant="link" class="text-success" v-if="todo.edit" @click="saveTodo(index)">
              <font-awesome-icon :icon="['fas','save']"></font-awesome-icon>
            </b-btn>
            <span v-else>{{ todo.name}}</span>
          </b-td>
          <b-td>
            <b-btn variant="link" class="text-primary" @click="editTodo(index)">
              <font-awesome-icon :icon="['fas','pencil-alt']" class="pencil"></font-awesome-icon>
            </b-btn>
            <b-btn variant="link" class="text-danger" @click="delTodo(index)">
              <font-awesome-icon :icon="['fas','times']"></font-awesome-icon>
            </b-btn>
          </b-td>
        </b-tr>
      </draggable>
    </b-table-simple>

  </div>
</template>

<script>
export default {
  data () {
    return {
      newtodo: '',
      dragOption: {
        // 在拖曳的時候會有轉場效果
        animation: 200
      }
    }
  },
  methods: {
    // 新增
    addTodo () {
      if (this.newtodo.length > 0) {
        this.$store.commit('addTodo', this.newtodo)
      }
      this.newtodo = ''
    },
    clearNewtodo () {
      if (this.newtodo.length > 0) {
        this.newtodo = ''
      }
    },
    delTodo (index) {
      this.$store.commit('delTodo', index)
    },
    editTodo (index) {
      this.$store.commit('editTodo', index)
    },
    cancelTodo (index) {
      this.$store.commit('cancelTodo', index)
    },
    saveTodo (index) {
      this.$store.commit('saveTodo', index)
    }

  },
  computed: {
    todos: {
      // 在讀取todos 要做的事情
      get () {
        return this.$store.getters.todos
      },
      // 讓computed 支援寫入的功能
      // 修改 todos 時候，要做的事情，預設會帶value 進來
      // value 為修改後的值
      set (value) {
        this.$store.commit('dragTodo', value)
      }
    }
  }
}
</script>
