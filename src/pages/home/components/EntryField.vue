<template>
	<div class="entry-field">
		<input v-model="task" @keyup.enter="addTask" :placeholder="placeholder" @focus="inputFocus" @blur="inputBlur"
		       class="entry-field__input">
		<button @click="addTask" class="entry-field__button">Жми</button>
		<div class="entry-field__subtitle">можешь отправить таск, нажав Enter</div>
	</div>
</template>

<script>
  import Find from 'lodash/find';

  export default {
    name: "entry-field",
    props: ['tasks'],
    data() {
      return {
        task: '',
        placeholder: 'писать здесь',
      };
    },
    methods: {
      addTask() {
        if (this.task !== '') {
          let scriptStart = '<script';
          let scriptEnd = '<' + '/' + 'script>';

          if (~this.task.toLowerCase().indexOf(scriptStart) && ~this.task.toLowerCase().indexOf(scriptEnd)) {
            this.$eventBus.$emit('onError', {
              error: true,
              errorText: "It looks like you\'re using forbidden characters!<br/> Don't hurt me like that!",
            });
          } else {
            let taskFound = Find(this.tasks, (existingTask) => {
              return existingTask.title == this.task;
            });
            if (taskFound !== undefined) {
              this.$eventBus.$emit('onError', {
                error: true,
                errorText: "It seems that such task already exists!<br/> Don't repeat yourself!",
              });
            } else {
              this.$eventBus.$emit('addTask', {
                task: this.task,
              });
            }
          }
          this.task = '';
        } else {
          this.$eventBus.$emit('onError', {
            error: true,
            errorText: "Your task is empty!<br/>Really, dude?<br/>You really don't know anything more interesting?",
          });
        }
      },
      inputBlur() {
        this.placeholder = 'писать здесь';
      },
      inputFocus() {
        this.placeholder = '';
      },
    },
  };
</script>

<style lang="less" scoped>
	@import "~@/assets/styles/variables.less";

	.entry-field {
		margin-top: 50px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		.entry-field__input {
			border: none;
			border-bottom: 1px solid @pink_color;
			color: rgba(0, 0, 0, .4);
			background-color: transparent;
			padding-top: 14px;
			padding-bottom: 9px;
			vertical-align: bottom;
			text-transform: uppercase;
			transition: border-bottom .2s ease-in-out;
			min-width: 260px;
			&:focus, &:active {
				outline: none;
				border-bottom: 2px solid darken(@pink_color, 15);
			}
		}
		.entry-field__button {
			border: none;
			background-color: @pink_color;
			color: @white_color;
			text-transform: uppercase;
			font-weight: normal;
			padding: 12px 32px;
			cursor: pointer;
			transition: border-bottom .2s ease-in-out;
			&:focus, &:active {
				outline: none;
			}
			&:hover {
				background-color: darken(@pink_color, 15);
			}
		}
	}

	.entry-field__subtitle {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: rgba(0, 0, 0, .4);
	}
</style>