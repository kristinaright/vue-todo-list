<template>
	<div>
		<entry-field></entry-field>
		<to-do-list :todoList="tasks"></to-do-list>
	</div>
</template>

<script>
  import EntryField from './components/EntryField';
  import ToDoList from './components/ToDoList';
  import FindIndex from 'lodash/findIndex';

  export default {
    name: "Home",
    components: { ToDoList, EntryField },
    data() {
      return {
        tasks: [],
        nextTodoId: 0,
      };
    },
    mounted() {
      this.$eventBus.$on('addTask', data => {
        this.tasks.push({
          id: this.nextTodoId++,
          title: data.task,
          isDone: false,
        });
      });

      this.$eventBus.$on('removeTask', data => {
        this.removeTask(data);
      });
    },
    methods: {
      removeTask(data) {
        let currentIndex = FindIndex(this.tasks, function (task) {
          return task.id == data.currentTaskId;
        });
        this.tasks.splice(currentIndex, 1);
      },
    },
  };
</script>

<style scoped>

</style>
