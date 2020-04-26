<template>
  <div class="container">
    <div class="answer-sheet">
      <div class="sheet-head">
        <div class="subject">
          <h3>{{ test.subject }}</h3>
        </div>
        <div class="sheet-nav">
          <button v-on:click="decreaseNumber()" class="btn btn-left">a</button>
          <div class="number">
            <h3>{{ currentNumber }}</h3>
          </div>
          <button v-on:click="increaseNumber()" class="btn btn-right">b</button>
        </div>
      </div>
      <div class="question">
        <p>{{ test.questions[currentNumber-1].readings }}</p>
      </div>
      <div class="directive">{{ test.questions[currentNumber-1].directive }}</div>
      <div class="answer-selection">
        <label>
          <input type="radio" value="A" v-model="answers[currentNumber-1]" />
          <span>A</span>
          <span>{{ test.questions[currentNumber-1].choices[0] }}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="B" v-model="answers[currentNumber-1]" />
          <span>B</span>
          <span>{{ test.questions[currentNumber-1].choices[1]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="C" v-model="answers[currentNumber-1]" />
          <span>C</span>
          <span>{{ test.questions[currentNumber-1].choices[2]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="D" v-model="answers[currentNumber-1]" />
          <span>D</span>
          <span>{{ test.questions[currentNumber-1].choices[3]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="E" v-model="answers[currentNumber-1]" />
          <span>E</span>
          <span>{{ test.questions[currentNumber-1].choices[4]}}</span>
        </label>
        <br />
        <br />
        <span>Picked: {{ answers[currentNumber-1] }}</span>
      </div>
      <div class="sheet-foot">
        <button v-on:click="removeAnswer()" class="btn-delete">Hapus Jawaban</button>
      </div>
    </div>
    <div class="time-review">
      <div class="time">
        <h1>02:00</h1>
      </div>
      <div class="review">
        <h3>Question Answered</h3>
        <div>
          <span v-for="n in numberOfQuestion" :key="n">
            <button v-if="n == currentNumber" v-on:click="gotoNumber(n)" class="btn-current">{{ n }}</button>
            <button
              v-else-if="answers[n-1] != null"
              v-on:click="gotoNumber(n)"
              class="btn-answered"
            >{{ n }}</button>
            <button v-else v-on:click="gotoNumber(n)" class="btn-unanswered">{{ n }}</button>
          </span>
        </div>
        <button class="btn-review" v-on:click="showModal()">Review</button>
        <Modal
          v-show="isModalVisible"
          v-on:close="closeModal"
          v-bind:ans="answers"
          v-bind:nums="numberOfQuestion"
          v-bind:curr="currentNumber"
        />
      </div>
      <div>
        <button class="btn-finish">Finish</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal";

export default {
  name: "TestPlatform",
  components: {
    Modal
  },
  data() {
    return {
      answer: "",
      answers: {},
      test: {
        id: 0,
        subject: "",
        questions: [
          {
            number: 1,
            readings: "",
            directive: "",
            choices: ["", "", "", "", ""]
          }
        ]
      },
      currentNumber: 1,
      numberOfQuestion: 0,
      isModalVisible: false
    };
  },
  async mounted() {
    await axios.get("http://localhost:3000/tests/1").then(response => {
      this.test = response.data;
      this.numberOfQuestion = response.data.questions.length;
    });
  },
  methods: {
    increaseNumber() {
      if (this.currentNumber + 1 <= this.test.questions.length) {
        this.currentNumber += 1;
      }
    },
    decreaseNumber() {
      if (this.currentNumber - 1 > 0) {
        this.currentNumber -= 1;
      }
    },
    gotoNumber(num) {
      this.currentNumber = num;
    },
    removeAnswer() {
      this.answers[this.currentNumber - 1] = null;
      this.answer = null;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss">
$primaryColor: white;
$secondaryColor: #1fbed6;
$tertiaryColor: rgb(245, 107, 2);
$hoverBg: rgb(227, 227, 227);

@mixin box {
  background-color: $primaryColor;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 4px 1px #888888;
}

@mixin box-hover {
  background-color: $hoverBg;
}

@mixin btn-circle {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border-radius: 50%;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1rem;
  max-width: 95%;
  margin: 0 auto;

  .answer-sheet {
    @include box();

    .sheet-head {
      margin-left: 1rem;
      display: grid;
      grid-template-columns: 7fr 1fr;

      .sheet-nav {
        display: flex;
        align-items: center;
        .number {
          padding: 0 1rem;
        }

        button {
          border: 1px solid lightgrey;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          color: $tertiaryColor;
          background: $primaryColor;
          cursor: pointer;
          text-decoration: none;
          &:hover {
            background: $hoverBg;
          }
        }
      }
    }

    .question {
      @include box();
      margin: 1rem;
      border: black 1px solid;
      box-shadow: none;
    }

    .directive {
      padding: 1rem;
    }

    .answer-selection {
      padding: 1rem;
    }

    input[type="radio"] {
      @include btn-circle();
      border: 1px solid black;
      background-color: white;
      -webkit-appearance: none; /*to disable the default appearance of radio button*/
      -moz-appearance: none;
      cursor: pointer;
      &:hover {
        @include box-hover();
      }

      &:focus {
        outline-color: transparent;
      }

      &:checked {
        background-color: $secondaryColor;
        border: 1px solid $secondaryColor;
      }

      &:checked ~ span:first-of-type {
        color: white;
      }
    }

    label {
      span:first-of-type {
        position: relative;
        left: -24px;
        font-size: 15px;
        color: black;
      }

      span {
        position: relative;
        top: -10px;
        cursor: pointer;
      }
    }
  }

  .time-review {
    display: grid;
    grid-template-rows: 150px 300px;
    grid-row-gap: 1em;

    .time {
      text-align: center;
      @include box();
    }

    .review {
      @include box();
      align-content: left;
      padding-bottom: 0;
    }
  }
}

button {
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

button.btn-current {
  @include btn-circle();
  background-color: $tertiaryColor;
  border: 1px solid $tertiaryColor;
  margin: 0.3rem;
  color: $primaryColor;
}

button.btn-answered {
  @include btn-circle();
  background-color: $secondaryColor;
  border: 1px solid $secondaryColor;
  margin: 0.3rem;
  color: white;
}

button.btn-unanswered {
  @include btn-circle();
  background-color: white;
  border: 1px solid black;
  margin: 0.3rem;
  color: black;
  &:hover {
    @include box-hover();
  }
}

button.btn-delete {
  cursor: pointer;
  border-radius: 20px;
  width: 10rem;
  height: 3rem;
  background-color: $primaryColor;
  color: $tertiaryColor;
  border: 2px solid $tertiaryColor;
  font-weight: bold;
  margin-left: 1rem;
  &:hover {
    @include box-hover();
  }
}

button.btn-review {
  cursor: pointer;
  border-radius: 20px;
  width: 10rem;
  height: 3rem;
  background-color: $tertiaryColor;
  color: $primaryColor;
  border: 2px solid $tertiaryColor;
  font-weight: bold;
  margin-top: 3rem;
  &:hover {
    @include box-hover();
    color: $tertiaryColor;
  }
}

button.btn-finish {
  cursor: pointer;
  border-radius: 20px;
  width: 100%;
  height: 3rem;
  background-color: $tertiaryColor;
  color: $primaryColor;
  border: 2px solid $tertiaryColor;
  font-weight: bold;
  &:hover {
    @include box-hover();
    color: $tertiaryColor;
  }
}

@media (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
}
</style>