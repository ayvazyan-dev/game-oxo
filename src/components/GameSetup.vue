<template>
  <div class="game-setup">
    <h2 class="game-setup__title">Выберите поле</h2>
    <button class="game-setup__button" @click="$emit('startGame', 3)">3x3</button>
    <button class="game-setup__button" @click="$emit('startGame', 4)">4x4</button>
    <button class="game-setup__button" @click="$emit('startGame', 5)">5x5</button>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.game-setup {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    margin-bottom: 20px;
    font-size: 2em;
    color: #333;
  }

  &__button {
    padding: 10px 20px;
    margin: 10px;
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
</style>
