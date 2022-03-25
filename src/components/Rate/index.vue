<template>
    <div :style="{ fontStyle }">{{ rate }}</div>
</template>
<script setup lang="ts">
    import { defineProps, computed } from 'vue';
    let props = defineProps({
        value: Number,
        theme: { type: String, default: 'orange' },
    });
    console.log(props.theme);

    let rate = computed(() => {
        if (props.value) return '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value);
    });
    const themeObj = {
        black: '#00',
        white: '#fff',
        red: '#f5222d',
        orange: '#fa541c',
    };

    const fontStyle = computed(() => {
        return `color:${themeObj[props.theme.toString()]}`;
    });
</script>
