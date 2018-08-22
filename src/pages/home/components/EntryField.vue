<template>
	<div>
		<input v-model="task" placeholder="напиши задачу">
		<button @click="addTask">нажми, чтобы добавить таск</button>
	</div>
</template>

<script>
  export default {
    name: "entry-field",
    data() {
      return {
        task: '',
      };
    },
    methods: {
      addTask() {
        this.$eventBus.$emit('addTask', {
          task: this.task,
        });
        this.task = '';
      },
    },
  };
</script>

<style scoped>

</style>