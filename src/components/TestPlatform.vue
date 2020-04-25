<template>
  <div class="container">
    <div class="answer-sheet">
      <div class="sheet-head">
        <div class="subject">
          <h3>TPS - Penalaran Umum</h3>
        </div>
        <div class="sheet-nav">
            <button class="btn btn-left">a</button>
            <div class="number">
                <h3>2</h3>
            </div>
            <button class="btn btn-right">b</button>
        </div>
      </div>
      <div class="question">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam quam nam veritatis fugiat reiciendis, nostrum minima temporibus assumenda inventore quasi iste laborum velit voluptas unde sed architecto alias! Autem, necessitatibus.</p>
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
export default {
  name: "TestPlatform"
};
</script>

<style lang="scss">
$primaryBg: white;

@mixin box {
  background: $primaryBg;
  border-radius: 1em;
  padding: 1.5em;
  box-shadow: 1px 1px 5px 1px #888888;
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

          .btn {
              border-radius: 50%;
              width: 2rem;
              height: 2rem;
              background: white;
              cursor: pointer;
          }
      }
    }
    .question {
      @include box();
      margin: 1em;
      border: black 1px solid;
      box-shadow: none;
    }
  }

  .time-review {
    display: grid;
    grid-template-rows: 1fr 1fr;
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