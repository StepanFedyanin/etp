<template>
    <div class="sidebar__bottom-date">
        <pre>{{ currentDate }}</pre>
        <pre>{{ currentTime }} ({{ this.currentTimeZone }} GMT)</pre>
    </div>
</template>

<script>

    export default {
        name: 'SidebarClock',
        data() {
            return {
                timer: null,
                currentDate: null,
                currentTime: null,
                currentTimeZone: null,
            };
        },
        mounted() {
            this.timer = setInterval(() => {
                let date = new Date();
                this.currentTime = date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                this.currentTimeZone = -1 * date.getTimezoneOffset() / 60;
                this.currentTimeZone = this.currentTimeZone > 0 ? '+' + this.currentTimeZone : this.currentTimeZone;
                this.currentDate = date.toLocaleDateString('ru');
            }, 1000);
        },
        unmounted() {
            clearTimeout(this.timer);
        },
        methods: {
        }
    };
</script>
