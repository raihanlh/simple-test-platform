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
  name: "Modal",
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
$primaryColor: white;
$secondaryColor: #1fbed6;
$tertiaryColor: rgb(245, 107, 2);
$hoverBg: rgb(227, 227, 227);

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: $tertiaryColor;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 50px 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: black;
  background: transparent;
}

.answer {
    display: flex;
    padding: 1rem;
    align-items: center;
}

header#modalTitle {
    margin-left: 2rem;
}

button.btn-answered button.btn-unanswered button.btn-current {
    cursor: none;
}

@media (max-width: 640px) {
  .modal-body {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>