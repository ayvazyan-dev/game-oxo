<template>
  <GameSetup @start-game="startGame" v-if="!boardSize" />

  <div class="game" v-else>
    <div
        v-for="(row, rowIndex) in board"
        :key="rowIndex"
        class="game__row"
    >
      <button
          v-for="(col, colIndex) in row"
          :key="'col-' + colIndex"
          class="game__col"
          @click="handleClick(rowIndex, colIndex)"
      >
        {{ col }}
      </button>
    </div>
    <div class="game__info">
      <span v-if="winnerText">{{ winnerText }}</span>
      <span>{{ drawText }}</span>
    </div>
    <div class="game__actions">
      <button class="game__actions-reset" @click="resetGame">Перезагрузить игру</button>
      <button class="game__actions-clear" @click="clearBoardSize">Вернуться к выбору поля</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import GameSetup from "@/components/GameSetup.vue";

const boardSize = ref(null);
const board = ref([]);
const currentPlayer = ref("X");
const winnerText = ref(null);
const drawText = ref(null);

const startGame = (size) => {
  boardSize.value = size;
  board.value.length = size;
  currentPlayer.value = "X";
  winnerText.value = '';
  drawText.value = '';

  for(let i = 0; i < size; i++) {
    board.value[i] = Array.from({length: size}, () => null)
  }
}

const isDraw = computed(() => {
  const raisedArr = board.value.flat();
  return raisedArr.every((val) => val) && !winnerText.value;
});

const handleClick = (row, col) => {
  if (board.value[row][col] || winnerText.value) {
    return;
  }
  board.value[row][col] = currentPlayer.value;
  if (checkWin(currentPlayer.value)) {
    winnerText.value = `Победитель: ${currentPlayer.value}!`;
  } else if (isDraw.value) {
    drawText.value = 'Ничья'
  } else {
    currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
  }
}

const checkWin = (player) => {
  for (let row of board.value) {
    if (row.every((val) => val === player)) {
      return true;
    }
  }

  for (let col = 0; col < boardSize.value; col++) {
    if (board.value.every((row) => row[col] === player)) {
      return true;
    }
  }

  if (board.value.every((row, idx) => row[idx] === player)) {
    return true;
  }

  if (board.value.every((row, idx) => row[boardSize.value - 1 - idx] === player)) {
    return true;
  }

  return false;
}

const resetGame = () => {
  startGame(boardSize.value);
}

const clearBoardSize = () => {
  boardSize.value = null;
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Comic Sans MS';
  margin: 0;
  padding: 0;
}

.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  &__row {
    display: flex;
  }

  &__col {
    width: 80px;
    height: 80px;
    border: 1px solid #2c3e50;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    font-size: 2em;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f7f7f7;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &__info {
    margin-top: 20px;
    font-size: 32px;
    color: #333;
  }

  &__actions {
    display: flex;
    column-gap: 10px;
    &-reset,
    &-clear {
      padding: 10px 20px;
      margin-top: 20px;
      font-size: 1em;
      cursor: pointer;
      background-color: #f0f0f0;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e2e2e2;
      }
    }
  }
}
</style>
