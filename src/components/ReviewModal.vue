<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <h3>Review</h3>
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <div v-for="n in nums" :key="n" class="answer-list">
            <div v-if="n == curr" class="answer">
              <button class="btn-current">{{ n }}</button>
              <p v-if="ans[n-1] != null">{{ ans[n-1] }}</p>
              <p v-else>-</p>
            </div>
            <div v-else-if="ans[n-1] != null" class="answer">
              <button class="btn-answered">{{ n }}</button>
              <p v-if="ans[n-1] != null">{{ ans[n-1] }}</p>
              <p v-else>-</p>
            </div>
            <div v-else class="answer">
              <button class="btn-unanswered">{{ n }}</button>
              <p v-if="ans[n-1] != null">{{ ans[n-1] }}</p>
              <p v-else>-</p>
            </div>
          </div>
        </section>
        <footer class="modal-footer">
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ReviewModal",
  methods: {
    close() {
      this.$emit("close");
    }
  },
  props: {
    ans: Object,
    nums: Number,
    curr: Number
  }
};
</script>

<style lang="scss">
  @import './../assets/css/Modal.scss';
</style>