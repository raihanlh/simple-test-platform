<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle">
        <section class="modal-result-body">Are you sure you want to submit your answers?</section>
        <div class="confirmation">
          <button v-on:click="submitAnswer">Yes</button>
          <button v-on:click="close">No</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from 'axios';

export default {
  name: "ResultModal",
  methods: {
    close() {
      this.$emit("close");
    },
    async submitAnswer() {
      // Get new Id
      let fetched = await axios.get("http://localhost:3000/userAnswers/");
      let newId = fetched.data.length + 1;

      // Add null to unanswered questions
      for (let i = 1; i <= this.numberOfQuestion; i++) {
        if (!this.answers[i]) {
          this.answers[i] = null;
        }
      }

      const params = {
        id: newId,
        testId: this.testId,
        numberOfQuestion: this.numberOfQuestion,
        userId: this.userId,
        answers: this.answers
      };

      //let res = await axios.post("http://localhost:3000/userAnswers/", params);
      //console.log(res.data);
      console.log(params);
    }
  },
  props: {
    answers: Object,
    testId: Number,
    numberOfQuestion: Number,
    userId: Number
  }
};
</script>
<style lang="scss" scoped>
@import "./../assets/css/Modal.scss";

.modal {
  align-items: center;
  width: 30%;
}

.modal-result-body {
  display: block;
  padding: 3rem;
}

button {
  margin: 1rem;
  cursor: pointer;
  border-radius: 20px;
  width: 6rem;
  height: 3rem;
  background-color: $tertiaryColor;
  color: $primaryColor;
  border: 2px solid $tertiaryColor;
  font-weight: bold;
  margin-top: 3rem;
  &:hover {
    color: $tertiaryColor;
    background-color: $primaryColor;
  }
}
</style>