<template>
  <div id="app">
    <HomeView />
  </div>
</template>

<script>
import HomeView from "./views/HomeView.vue";

export default {
  name: "App",
  components: {
    HomeView,
  },
};
</script>

<style>
#app {
  font-family: Raleway, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  height: 100vh;
}

input {
  border: none;
  border-bottom: 1.3px solid #efefef;
  width: 100%;
  font-size: 1em;
  padding: 15px 0;
  color: #efefef;
  font-weight: 300;
}

::-webkit-input-placeholder {
  /* Edge */
  color: hsl(0, 0%, 48%);
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: hsl(0, 0%, 48%);
}

::placeholder {
  color: hsl(0, 0%, 48%);
}

input:focus {
  border: none;
  outline: none;
  border-bottom: 1.3px solid #000;
  color: #000;
}
</style>
