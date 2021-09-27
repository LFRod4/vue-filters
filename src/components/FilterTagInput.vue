<template>
  <div>
    <input
      class="tag-input"
      placeholder="Search by tag"
      v-model="filterTagInput"
    />
  </div>
</template>

<script>
export default {
  name: "FilterTagInput",
  computed: {
    filterTagInput: {
      get() {
        return this.$store.state.filterTagInput;
      },
      set(filterTagInput) {
        const lowerCaseInput = filterTagInput.toLowerCase();
        this.$store.commit("updateFilterTagInput", lowerCaseInput);
      },
    },
  },
};
</script>

<style></style>
