<template>
  <div class="container">
    <div class="answer-sheet">
      <div class="sheet-head">
        <div class="subject">
          <h3>{{ test.subject }}</h3>
        </div>
        <div class="sheet-nav">
          <button v-on:click="decreaseNumber()" :disabled="currentNumber <= 1" class="btn btn-left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="number">
            <h3>{{ currentNumber }}</h3>
          </div>
          <button
            v-on:click="increaseNumber()"
            :disabled="currentNumber >= numberOfQuestion"
            class="btn btn-right"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div class="question">
        <p>{{ test.questions[currentNumber-1].readings }}</p>
      </div>
      <div class="directive">{{ test.questions[currentNumber-1].directive }}</div>
      <div class="answer-selection">
        <label>
          <input type="radio" value="A" v-model="answers[currentNumber]" />
          <span>A</span>
          <span>{{ test.questions[currentNumber-1].choices[0] }}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="B" v-model="answers[currentNumber]" />
          <span>B</span>
          <span>{{ test.questions[currentNumber-1].choices[1]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="C" v-model="answers[currentNumber]" />
          <span>C</span>
          <span>{{ test.questions[currentNumber-1].choices[2]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="D" v-model="answers[currentNumber]" />
          <span>D</span>
          <span>{{ test.questions[currentNumber-1].choices[3]}}</span>
        </label>
        <br />
        <label>
          <input type="radio" value="E" v-model="answers[currentNumber]" />
          <span>E</span>
          <span>{{ test.questions[currentNumber-1].choices[4]}}</span>
        </label>
        <br />
        <br />
        <span>Picked: {{ answers[currentNumber] }}</span>
      </div>
      <div class="sheet-foot">
        <button v-on:click="removeAnswer()" class="btn-delete">Hapus Jawaban</button>
      </div>
    </div>
    <div class="time-review">
      <Timer v-bind:time-left="timeLeft" />
      <div class="review">
        <h3>Question Answered</h3>
        <h2>{{ countAnswered() }} of {{ numberOfQuestion }}</h2>
        <div>
          <span v-for="n in numberOfQuestion" :key="n">
            <button v-if="n == currentNumber" v-on:click="gotoNumber(n)" class="btn-current">{{ n }}</button>
            <button
              v-else-if="answers[n] != null"
              v-on:click="gotoNumber(n)"
              class="btn-answered"
            >{{ n }}</button>
            <button v-else v-on:click="gotoNumber(n)" class="btn-unanswered">{{ n }}</button>
          </span>
        </div>
        <button class="btn-review" v-on:click="showModal('review')">Review</button>
        <ReviewModal
          v-show="isModalVisible.review"
          v-on:close="closeModal"
          v-bind:ans="answers"
          v-bind:nums="numberOfQuestion"
          v-bind:curr="currentNumber"
        />
      </div>
      <div>
        <button class="btn-finish" v-on:click="showModal('result')">Finish</button>
        <ResultModal
          v-show="isModalVisible.result"
          v-on:close="closeModal"
          v-bind:answers="answers"
          v-bind:testId="testId"
          v-bind:userId="userId"
          v-bind:numberOfQuestion="numberOfQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ReviewModal from "./ReviewModal";
import ResultModal from "./ResultModal";
import Timer from "./Timer";

export default {
  name: "TestPlatform",
  components: {
    ReviewModal,
    ResultModal,
    Timer
  },
  data() {
    return {
      userId: 1,
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
      isModalVisible: {
        review: false,
        result: false
      },
      time: {
        timeLimit: 3600,
        timePassed: 0,
        timerInterval: null
      }
    };
  },
  props: {
    testId: Number
  },
  mounted() {
    this.startTimer();
    this.fetchTest();
    window.addEventListener("keyup", event => {
      if (event.keyCode === 37) {
        this.decreaseNumber();
      } else if (event.keyCode === 39) {
        this.increaseNumber();
      } else if (event.keyCode === 46) {
        this.removeAnswer();
      } else if (event.keyCode === 65) {
        this.answers[this.currentNumber] = 'A';
      } else if (event.keyCode === 66) {
        this.answers[this.currentNumber] = 'B';
      } else if (event.keyCode === 67) {
        this.answers[this.currentNumber] = 'C';
      } else if (event.keyCode === 68) {
        this.answers[this.currentNumber] = 'D';
      } else if (event.keyCode === 69) {
        this.answers[this.currentNumber] = 'E';
      } else if (event.keyCode === 82) {
        if (!this.isModalVisible.review) {
          this.showModal('review');
        }
      } else if (event.keyCode === 13) {
        if (!this.isModalVisible.result) {
          this.showModal('result');
        }
      } else if (event.keyCode === 27) {
        this.closeModal();
      }
    });
  },
  methods: {
    async fetchTest() {
      // Fetch test questions from backend API
      await axios
        .get(`http://localhost:3000/tests/${this.testId}`)
        .then(response => {
          this.test = response.data;
          this.numberOfQuestion = response.data.questions.length;
        });
    },
    increaseNumber() {
      // Add currentNumber when button is clicked
      if (this.currentNumber + 1 <= this.test.questions.length) {
        this.currentNumber += 1;
      }
    },
    decreaseNumber() {
      // Subtract currentNumber when button is clicked
      if (this.currentNumber - 1 > 0) {
        this.currentNumber -= 1;
      }
    },
    gotoNumber(num) {
      // Set currentNumber to num
      this.currentNumber = num;
    },
    removeAnswer() {
      // Set answer to null
      this.answers[this.currentNumber] = null;
      this.answer = null;
    },
    showModal(modal) {
      // Set isModalVisible to true when button is clicked
      if (modal == "review") {
        this.isModalVisible.review = true;
      } else if (modal == "result") {
        this.isModalVisible.result = true;
      }
    },
    closeModal() {
      // Set isModalVisible to false when button is clicked
      this.isModalVisible.review = false;
      this.isModalVisible.result = false;
    },
    countAnswered() {
      // Count not null answers
      let ans = this.answers;
      let arrAnswers = Object.keys(ans).map(function(key) {
        return [ans[key]];
      });

      let notNullArrAnswers = arrAnswers.filter(String);
      return notNullArrAnswers.length;
    },
    startTimer() {
      // Start the timer
      this.time.timerInterval = setInterval(
        () => (this.time.timePassed += 1),
        1000
      );
    },
    async submitAnswer() {
      // Get new Id
      let fetched = await axios.get("http://localhost:3000/userAnswers/");
      let newId = fetched.length + 1;

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

      let res = await axios.post("http://localhost:3000/userAnswers/", params);
      console.log(res.data);
    }
  },
  computed: {
    // Calculate time left
    timeLeft() {
      const { timeLimit, timePassed } = this.time;
      return timeLimit - timePassed > 0 ? timeLimit - timePassed : 0;
    }
  }
};
</script>

<style lang="scss">
@import "./../assets/css/TestPlatform.scss";
</style>