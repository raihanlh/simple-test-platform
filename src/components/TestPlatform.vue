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
      <div
        class="directive"
      >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo ex, inventore illum beatae sint sunt a reiciendis dolorem nihil itaque, harum deserunt veniam fuga ullam suscipit est quam maiores. Eius!</div>
      <div class="answer-selection">
        <label>
          <input type="radio" value="A" v-model="answer" />
          <span>A</span>
          <span>Option A</span>
        </label>
        <br />
        <label>
          <input type="radio" value="B" v-model="answer" />
          <span>B</span>
          <span>Option B</span>
        </label>
        <br />
        <label>
          <input type="radio" value="C" v-model="answer" />
          <span>C</span>
          <span>Option C</span>
        </label>
        <br />
        <label>
          <input type="radio" value="D" v-model="answer" />
          <span>D</span>
          <span>Option D</span>
        </label>
        <br />
        <label>
          <input type="radio" value="E" v-model="answer" />
          <span>E</span>
          <span>Option E</span>
        </label>
        <br />
        <br />
        <span>Picked: {{ answer }}</span>
      </div>
    </div>
    <div class="time-review">
      <div class="time">
        <h1>02:00</h1>
      </div>
      <div class="review">
        <h3>Question Answered</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestPlatform",
  data() {
    return {
      answer: "",
      test: {
        id: 0,
        subject: "",
        questions: [
          {
            number: 1,
            readings: "",
            directive: "",
            choices: [
              "",
              "",
              "",
              "",
              ""
            ]
          }
        ]
      },
      currentNumber: 1
    };
  },
  async mounted() {
    await axios.get("http://localhost:3000/tests/1").then(response => {
      this.test = response.data;
      console.log(response.data);
    });
  },
  methods: {
    increaseNumber() {
        if (this.currentNumber + 1 <= this.test.questions.length) {
            this.currentNumber += 1;
        }
    },
    decreaseNumber() {
      if (this.currentNumber - 1 <= this.test.questions.length) {
            this.currentNumber -= 1;
        }
    }
  }
};
</script>

<style lang="scss">
$primaryBg: white;
$hoverBg: lightgrey;

@mixin box {
  background: $primaryBg;
  border-radius: 1em;
  padding: 1.5em;
  box-shadow: 0 0 4px 1px #888888;
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
          color: orange;
          background: $primaryBg;
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
      width: 30px;
      height: 30px;
      border-radius: 15px;
      border: 2px solid #1fbed6;
      background-color: white;
      -webkit-appearance: none; /*to disable the default appearance of radio button*/
      -moz-appearance: none;
      cursor: pointer;

      &:focus {
        outline-color: transparent;
      }

      &:checked {
        background-color: #1fbed6;
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
        color: #1fbed6;
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
    }
  }
}

@media (max-width: 640px) {
  .container {
    grid-template-columns: 1fr;
  }
}
</style>