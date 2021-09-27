import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    students: {},
    studentGrades: {},
    studentTags: {},
    filterNameInput: "",
    filterTagInput: "",
  },
  getters: {
    singleStudentGrades: (state) => (studentId) => {
      return state.studentGrades[studentId];
    },
    singleStudentTags: (state) => (studentId) => {
      return state.studentTags[studentId];
    },
    studentAverage: (state) => (studentId) => {
      const studentGrades = state.studentGrades[studentId];
      let total = 0;
      for (let i = 0; i < studentGrades.length; i++) {
        let currGradeNum = Number(studentGrades[i]);
        total += currGradeNum;
      }
      return total / studentGrades.length;
    },
    nameFilterIds: (state) => {
      let namesHash = {};
      if (state.filterNameInput === "") {
        return [];
      } else {
        for (const studentObj in state.students) {
          const student = state.students[studentObj];
          const fullName = `${
            student.firstName + student.lastName
          }`.toLowerCase();
          namesHash[fullName] = student.id;
        }

        const studentNames = Object.keys(namesHash);
        let filteredStudents = [];
        for (let i = 0; i < studentNames.length; i++) {
          if (studentNames[i].includes(state.filterNameInput)) {
            const currName = studentNames[i];
            const studentId = namesHash[currName];
            filteredStudents.push(studentId);
          }
        }
        return filteredStudents;
      }
    },
    tagFilterIds: (state) => {
      if (state.filterTagInput === "") {
        return [];
      } else {
        const allTags = Object.keys(state.studentTags);
        let filtTags = [];
        let taggedStudentIds = [];
        for (let i = 0; i < allTags.length; i++) {
          const currTag = allTags[i];
          if (currTag.includes(state.filterTagInput)) {
            filtTags.push(currTag);
          }
        }
        filtTags.forEach((tag) => {
          taggedStudentIds = [...taggedStudentIds, ...state.studentTags[tag]];
        });

        return taggedStudentIds;
      }
    },
    mixedFilters: (state, getters) => {
      if (getters.tagFilterIds.length > 0 && getters.nameFilterIds.length > 0) {
        const sortedIds = [
          ...getters.nameFilterIds,
          ...getters.tagFilterIds,
        ].sort((a, b) => a - b);

        let uniqueStudentIds = [];
        let idObj = {};
        for (let i = 0; i < sortedIds.length; i++) {
          const currId = sortedIds[i];
          if (idObj[currId]) {
            uniqueStudentIds.push(currId);
          } else {
            idObj[currId] = true;
          }
        }
        return uniqueStudentIds;
      } else {
        return [];
      }
    },
    filteredStudents: (state, getters) => {
      if (getters.mixedFilters.length > 0) {
        return getters.mixedFilters.map(
          (studentId) => state.students[studentId]
        );
      } else if (
        getters.tagFilterIds.length === 0 &&
        getters.nameFilterIds.length > 0
      ) {
        return getters.nameFilterIds.map(
          (studentId) => state.students[studentId]
        );
      } else if (
        getters.tagFilterIds.length > 0 &&
        getters.nameFilterIds.length === 0
      ) {
        return getters.tagFilterIds.map(
          (studentId) => state.students[studentId]
        );
      } else {
        return state.students;
      }
    },
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    setStudentGrades(state, studentGrades) {
      state.studentGrades = studentGrades;
    },
    updateFilterNameInput(state, filterInput) {
      state.filterNameInput = filterInput;
    },
    updateFilterTagInput(state, tagInput) {
      state.filterTagInput = tagInput;
    },
    addTag(state, { studentId, tagName }) {
      if (!state.studentTags[tagName]) {
        Vue.set(state.studentTags, tagName, []);
      }
      if (!state.students[studentId]["tags"]) {
        Vue.set(state.students[studentId], "tags", []);
      }
      state.studentTags[tagName].push(studentId);
      state.students[studentId].tags.push(tagName);
    },
  },
  actions: {
    async fetchStudentAssessments({ commit }) {
      let response = await fetch(
        "https://api.hatchways.io/assessment/students"
      );
      let { students: studentAssessments } = await response.json();
      if (studentAssessments) {
        //Normalize/flatten data
        let students = {};
        let studentGrades = {};
        // Clean object of grades array
        // eslint-disable-next-line no-unused-vars
        const studentArr = studentAssessments.map(({ grades, ...obj }) => obj);
        studentArr.forEach((student) => {
          let studentId = student.id;
          students[studentId] = student;
        });
        commit("setStudents", students);

        studentAssessments.forEach((student) => {
          let studentId = student.id;
          studentGrades[studentId] = student.grades;
        });
        commit("setStudentGrades", studentGrades);

        //Set local storage
        const localStudents = JSON.stringify(students);
        const localStudentGrades = JSON.stringify(studentGrades);
        localStorage.setItem("students", localStudents);
        localStorage.setItem("studentGrades", localStudentGrades);
      }
    },
  },
});
