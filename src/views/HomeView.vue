<template>
  <div class="columns is-vcentered main-container">
    <div class="column card is-8 is-offset-2 card-container">
      <FilterNameInput class="filter-input" />
      <FilterTagInput class="filter-input" />
      <StudentCard
        v-for="student in filteredStudents"
        :key="student.id"
        :student="student"
        class="student-card"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StudentCard from "../components/StudentCard.vue";
import FilterNameInput from "../components/FilterNameInput.vue";
import FilterTagInput from "../components/FilterTagInput.vue";
export default {
  components: { StudentCard, FilterNameInput, FilterTagInput },
  name: "HomeView",
  created: function () {
    const storedStudents = localStorage.getItem("students");
    const storedGrades = localStorage.getItem("studentGrades");
    if (storedStudents && storedGrades) {
      this.$store.commit("setStudents", JSON.parse(storedStudents));
      this.$store.commit("setStudentGrades", JSON.parse(storedGrades));
    } else {
      this.$store.dispatch("fetchStudentAssessments");
    }
  },
  computed: {
    ...mapGetters(["filteredStudents"]),
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
}
.card-container {
  background-color: #fff;
  overflow: auto;
  height: 70%;
  padding: 0;
}

.student-card {
  width: 100%;
  border-bottom: 1.5px solid #efefef;
  padding: 20px;
}

.filter-input {
  margin: 0 auto;
  width: 95%;
}
</style>
