<template>
  <div class="time">
    <p>Sisa Waktu Tryout</p>
    <h1>{{ formattedTimeLeft }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    timeLeft: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    }
  }
};
</script>

<style lang="scss">
</style>