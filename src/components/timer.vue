<template>
    <div>
        {{ timerTime }} 
    </div>
</template>
<script>
// import { difference } from 'lodash';

    export default {
        props: {
            dateEnd: {
                type: String,
                default() { return null; }
            },
        },
        // emits: {
        // },
        data(){
            return {
                timer: null,
                time: '',
                timestampCurrent: '',
                moscowdatetime: '',
                timestampEnd: '',
                difference: undefined,
                timerTime:'',
                seconds: undefined,
            }    
        },
        watch: {
            difference(time) {
                if (time === 0) {
                    this.stopTimer()
                }
            },
            seconds(value) {
                // let hours = new Date(value).getHours();
                // let minutes = new Date(value).getMinutes() ;
                // let seconds = new Date(value).getSeconds();

                // let days = parseInt(value / 60 / 60 / 24, 10);
                let hours = parseInt(value / 60 / 60, 10);
                let minutes = parseInt(value / 60 % 60, 10);
                let seconds = parseInt(value % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.timerTime = `${hours}:${minutes}:${seconds}`;

                if (value < 0) {
                    this.stopTimer();
                }
            },
        },
        mounted() {
            this.startTimer();
        },
        destroyed() {
            this.stopTimer()
        },
        created(){
            this.timestampCurrent = Date.now();
            this.timestampEnd = new Date(this.dateEnd).getTime();
            this.moscowdatetime = this.getMoscowDate();
            this.difference = this.calculateDifference();
        },
        methods: {
            startTimer() {
                this.seconds = this.difference;
                this.timer = setInterval(() => {
                    this.seconds--
                }, 1000)
            },
            stopTimer() {
                clearTimeout(this.timer)
            },
            getMoscowDate() {
                const offset = +3;
                return new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" ); // 3600 секунд в часе, 1000 для перевода в милисекунды
            },
            calculateDifference(){
                return Math.round((this.timestampEnd - this.timestampCurrent)/1000);
            }

        }
    }
</script>