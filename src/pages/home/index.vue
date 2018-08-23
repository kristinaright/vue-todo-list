<template>
	<div class="home-page">
		<div class="page__container">
			<div class="home-page__cat">
				<div class="home-page__cat_speech">
					<h4 v-html="error.isActive ? error.text : defaultGreeting"></h4>
				</div>
				<div class="home-page__cat_face" :class="{'sad-cat': error.isActive}">
					<div class="home-page__cat_face-ear left-ear">
						<div class="home-page__cat_face-ear-tip"></div>
					</div>
					<div class="home-page__cat_face-ear right-ear">
						<div class="home-page__cat_face-ear-tip"></div>
					</div>
					<div class="home-page__cat_face-eye left-eye">
						<div class="home-page__cat_face-pupil"></div>
						<div class="home-page__cat_face-glare"></div>
						<div class="home-page__cat_face-glare-bg"></div>
						<div class="home-page__cat_face-glare-2"></div>
					</div>
					<div class="home-page__cat_face-eye right-eye">
						<div class="home-page__cat_face-pupil"></div>
						<div class="home-page__cat_face-glare"></div>
						<div class="home-page__cat_face-glare-bg"></div>
						<div class="home-page__cat_face-glare-2"></div>
					</div>
					<div class="home-page__cat_face-mouth"></div>
				</div>
			</div>
			<div v-if="!error.isActive">
				<entry-field></entry-field>
				<to-do-list :todoList="tasks"></to-do-list>
			</div>
			<button v-else @click="errorDeactivate" class="error-button">I will not play tricks anymore. I promise
			</button>
		</div>
	</div>
</template>

<script>
  import EntryField from './components/EntryField';
  import ToDoList from './components/ToDoList';
  import FindIndex from 'lodash/findIndex';
  import Find from 'lodash/find';

  export default {
    name: "Home",
    components: { ToDoList, EntryField },
    data() {
      return {
        tasks: [],
        nextTodoId: 0,
        defaultGreeting: 'Hi! I\'m Victor.<br/>It\'s my TODO list with Vue.js.<br/>You can test it.<br/>Nice to meet u :)',
        error: {
          isActive: false,
          text: '',
        },
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

      this.$eventBus.$on('performTask', data => {
        this.performTask(data);
      });

      this.$eventBus.$on('onError', data => {
        this.onError(data);
      });
    },
    methods: {
      removeTask(data) {
        let currentIndex = FindIndex(this.tasks, function (task) {
          return task.id == data.currentTaskId;
        });
        this.tasks.splice(currentIndex, 1);
      },
      performTask(data) {
        let currentTask = Find(this.tasks, function (task) {
          return task.id == data.currentTaskId;
        });
        currentTask.isDone = true;
      },
      onError(data) {
        this.error.isActive = data.error;
        this.error.text = data.errorText;
      },
      errorDeactivate() {
        this.error.isActive = false;
      },
    },
  };
</script>

<style lang="less" scoped>
	@import "~@/assets/styles/variables.less";

	.home-page {
		background-color: @peach_color;
		height: calc(100vh - 18px);
	}

	.home-page__cat {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		padding-top: 100px;
	}

	.home-page__cat_speech {
		position: relative;
		background-color: rgba(255, 255, 255, .7);
		color: #555;
		font-weight: 100;
		border: 1px solid rgba(0, 0, 0, .2);
		height: auto;
		width: 240px;
		border-radius: 15px;
		margin-right: 35px;
		margin-top: -20px;
		padding: 15px;
		box-sizing: border-box;
		&:after {
			content: '';
			position: absolute;
			right: -20px;
			bottom: 20px;
			border: 7px solid transparent;
			border-left: 15px solid rgba(255, 255, 255, 1);
		}
	}

	.home-page__cat_face {
		position: relative;
		background-color: #FF9166;
		height: 80px;
		width: 80px;
		border-radius: 50%;
	}

	.home-page__cat_face-eye {
		background-color: rgba(255, 255, 255, .9);
		height: 24px;
		width: 24px;
		border-radius: 50%;
		position: absolute;
		top: 19px;
		&.left-eye {
			left: 12px;
		}
		&.right-eye {
			right: 12px;
		}
		.home-page__cat_face-pupil {
			background-color: rgba(0, 0, 0, .8);
			height: 19px;
			width: 18px;
			border-radius: 50%;
			position: absolute;
			top: 1px;
		}
		.home-page__cat_face-glare {
			background-color: rgba(255, 255, 255, .6);
			height: 14px;
			width: 12px;
			border-radius: 50%;
			position: absolute;
			top: 2px;
			left: 2px;
		}
		.home-page__cat_face-glare-bg {
			background-color: rgba(0, 0, 0, .73);
			height: 14px;
			width: 11px;
			border-radius: 50%;
			position: absolute;
			top: 2px;
			left: 1.6px;
			transition: top .3s ease-in;
		}
		.home-page__cat_face-glare-2 {
			background-color: rgba(255, 255, 255, .25);
			height: 5px;
			width: 5px;
			border-radius: 50%;
			position: absolute;
			top: 6px;
			left: 3.5px;
		}
	}

	.home-page__cat_face-ear {
		background-color: darken(#FF9166, 2);
		height: 42px;
		width: 38px;
		border-radius: 50%;
		position: absolute;
		top: -8px;
		z-index: 0;
		transition: top .3s ease-in;
		&.left-ear {
			left: 2px;
		}
		&.right-ear {
			right: 2px;
		}
		.home-page__cat_face-ear-tip {
			border-width: 12px;
			border-style: solid;
			border-color: transparent;
			border-bottom-width: 14px;
			border-bottom-color: darken(#FF9166, 2);
			position: absolute;
			top: -20px;
			left: 7.2px;
		}
	}

	.home-page__cat_face-mouth {
		height: 13px;
		width: 6px;
		border-radius: 150px 0 0 150px;
		border-top: 2px solid rgba(0, 0, 0, .8);
		border-left: 2px solid rgba(0, 0, 0, .8);
		border-bottom: 2px solid rgba(0, 0, 0, .8);
		transform: translate(0px) rotate(-90deg);
		position: absolute;
		left: 34px;
		top: 46px;
		transition: all .3s ease-in;
	}

	.sad-cat {
		.home-page__cat_face-ear {
			top: -2px;
		}
		.home-page__cat_face-eye {
			.home-page__cat_face-glare-bg {
				top: 4px;
			}
		}
		.home-page__cat_face-mouth {
			border-right: 2px solid rgba(0, 0, 0, .8);
			border-left: none;
			border-radius: 0px 150px 150px 0px;
		}
	}

	.error-button {
		border: none;
		background-color: darken(@pink_color, 20);
		color: @white_color;
		text-transform: uppercase;
		font-weight: normal;
		padding: 12px 32px;
		cursor: pointer;
		transition: border-bottom .2s ease-in-out;
		width: 100%;
		margin-top: 50px;
		&:focus, &:active {
			outline: none;
		}
		&:hover {
			background-color: darken(@pink_color, 25);
		}
	}
</style>
