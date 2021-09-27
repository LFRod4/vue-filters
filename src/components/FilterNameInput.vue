<template>
  <div class="">
    <input
      class="filter-input"
      placeholder="Search by name"
      v-model="filterNameInput"
    />
  </div>
</template>

<script>
export default {
  name: "FilterNameInput",
  computed: {
    filterNameInput: {
      get() {
        return this.$store.filterNameInput;
      },
      set(input) {
        let lowerCaseInput = input.toLowerCase();
        this.$store.commit("updateFilterNameInput", lowerCaseInput);
      },
    },
  },
};
</script>

<style scoped></style>
