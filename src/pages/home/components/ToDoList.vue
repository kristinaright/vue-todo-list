<template>
	<div>
		<h4>Запланированные</h4>
		<ol>
			<li v-for="todoItem in plannedTasks" :key="todoItem.id">{{todoItem.title}}
				<button @click="removeTask(todoItem.id)">х</button>
				<button @click="performTask(todoItem.id)">сделано</button>
			</li>
		</ol>
		<h4>Выполненные</h4>
		<ol>
			<li v-for="todoItem in readyTasks" :key="todoItem.id">{{todoItem.title}}</li>
		</ol>
	</div>
</template>

<script>
  import Filter from 'lodash/filter';

  export default {
    name: "to-do-list",
    props: ['todoList'],
    computed: {
      plannedTasks() {
        return Filter(this.todoList, function (todoItem) {
          return !todoItem.isDone;
        });
      },
      readyTasks() {
        return Filter(this.todoList, function (todoItem) {
          return todoItem.isDone;
        });
      },
    },
    methods: {
      removeTask(taskId) {
        this.$eventBus.$emit('removeTask', {
          currentTaskId: taskId,
        });
      },
      performTask(taskId) {
        this.$eventBus.$emit('performTask', {
          currentTaskId: taskId,
        });
      },
    },
  };
</script>

<style scoped>

</style>