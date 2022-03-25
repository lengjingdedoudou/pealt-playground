<template>
    <h1>这是首页</h1>
    <TodoList />
    <h1 @click="toggle">click</h1>
    <dy-rate theme="red" value="3"></dy-rate>
</template>
<script setup lang="ts">
    import TodoList from '../../components/Todolist/index.vue';
    import { useFullscreen } from '@vueuse/core';
    import { watchEffect } from 'vue-demi';

    const { isFullscreen, enter, exit, toggle } = useFullscreen();
    watchEffect(() => {
        console.log(isFullscreen.value);
    });
</script>
