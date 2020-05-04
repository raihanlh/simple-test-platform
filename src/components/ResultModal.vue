<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" v-show="isInConfirmation">
        <section class="modal-result-body">Are you sure you want to submit your answers?</section>
        <div class="confirmation">
          <button v-on:click="submitAnswer">Yes</button>
          <button v-on:click="close">No</button>
        </div>
      </div>
      <div class="modal" v-show="isInResult">
        <section class="modal-result-body">Your score :</section>
        <h1 class="score">{{ score }} / 100</h1>
        <div class="result">
          <button v-on:click="close">Back to Home</button>
          <router-link :to="{ path: 'pembahasan/' + testId }">
            <button>Pembahasan</button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";

export default {
  name: "ResultModal",
  data() {
    return {
      isInConfirmation: true,
      isInResult: false,
      score: 0,
      url: process.env.VUE_APP_URL
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async submitAnswer() {
      // Get new Id
      console.log('test');
      console.log(this.url);
      let fetched = await axios.get(`${this.url}/userAnswers/`);
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

      let res = await axios.post(`${this.url}/userAnswers/`, params);

      console.log(res.data);

      this.isInResult = true;
      this.isInConfirmation = false;

      this.calculateScore();
    },
    async calculateScore() {
      const res = await axios.get(
        `${this.url}/correctAnswers/${this.testId}`
      );

      let correctAnswer = 0;

      for (let i = 1; i <= res.data.numberOfQuestion; i++) {
        this.answers[i] == res.data.answers[i] && correctAnswer++;
      }

      this.score = (correctAnswer / res.data.numberOfQuestion) * 100;
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

@mixin btn {
  margin: 1rem;
  cursor: pointer;
  border-radius: 20px;
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

.modal {
  align-items: center;
  width: 30%;
}

.modal-result-body {
  display: block;
  padding: 3rem;
}

.confirmation {
  button {
    @include btn();

    width: 6rem;
    height: 3rem;
  }
}

.result {
  button {
    @include btn();

    width: 10rem;
    height: 3rem;
  }
}

@media (max-width: 768px) {
  .modal {
    width: 80%;
  }
  .result {
    display: grid;
    grid-template-rows: 1fr;
  }
}
</style>