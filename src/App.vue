<template>
	<div id="app">
		<header-component></header-component>
		<router-view/>
	</div>
</template>

<script>
  import HeaderComponent from './components/Header';

  export default {
    name: 'App',
    components: { HeaderComponent },
  };
</script>

<style>
</style>

