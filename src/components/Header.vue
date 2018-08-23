<template>
	<div class="header">
		<div class="page__container">
			<nav class="header-nav">
				<router-link class="header-nav-link" to="/about">About</router-link>
				<router-link class="header-nav-link" to="/">ToDo list</router-link>
			</nav>
		</div>
	</div>
</template>

<script>
  export default {
    name: "header-component",
  };
</script>

<style lang="less" scoped>
	@import "~@/assets/styles/variables.less";

	.header {
		background-color: @pink_color;
		padding: 24px 0;
		.header-nav {
			display: flex;
			flex-direction: row;
			.header-nav-link {
				color: @white_color;
				font-size: 16px;
				text-decoration: none;
				text-transform: uppercase;
				margin-right: 30px;
				&:last-child {
					margin-right: 0px;
				}
			}
		}
	}
</style>