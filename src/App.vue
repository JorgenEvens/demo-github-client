<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
    text-align: center;
}
ul {
    list-style: none;
}
li {
    margin-bottom: 0.4em;
}
nav li {
    display: inline-block;
    padding-right: 1em;
}
pre {
    text-align: left;
}
span.tag {
    background: green;
    border-radius: 20px;
    padding: 3px 15px;
    color: white;
}
</style>
