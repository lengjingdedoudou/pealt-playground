import { ref, watch } from 'vue';
export default function useFavicon(newIcon: string) {
    const favicon = ref(newIcon);

    const updateIcon = (icon: string) => {
        // document.head.querySelectorAll(`link[rel*="icon"]`).forEach((el) => (el.href = `${icon}`));
    };
    const reset = () => (favicon.value = '/favicon.ico');

    watch(favicon, (i) => {
        updateIcon(i);
    });
    return { favicon, reset };
}
