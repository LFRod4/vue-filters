<template>
  <div>
    <div class="columns">
      <div class="column image-container is-2">
        <figure class="image is-128x128">
          <img :src="student.pic" class="is-rounded" />
        </figure>
      </div>
      <div class="column is-8 student-container">
        <div class="student-name">
          {{ formatStudentName }}
        </div>
        <div class="student-info">
          <div class="">Email: {{ student.email }}</div>
          <div class="">Company: {{ student.company }}</div>
          <div class="">Skill: {{ student.skill }}</div>
          <div class="">Average: {{ gradeAverage }}%</div>
          <div v-if="showTestScores" class="pt-3">
            <div v-for="(grade, index) in grades" :key="index">
              Test {{ index + 1 + ":" }}
              <span class="grade-format">{{
                "             " + grade + "%"
              }}</span>
            </div>
          </div>
          <div v-if="student.tags">
            <div
              v-for="(tag, index) in student.tags"
              :key="index"
              class="tag is-medium"
              :class="{ 'ml-1': index !== 0 }"
            >
              {{ tag }}
            </div>
          </div>
          <input
            class="tag-input"
            placeholder="Add a tag"
            v-model="tagInput"
            v-on:keyup.enter="addTag"
          />
        </div>
      </div>
      <div class="column is-2 icon-container">
        <span class="icon is-small is-pulled-right">
          <i
            class="fas fa-plus"
            v-if="!showTestScores"
            @click="togglePlusMinus"
          ></i>
          <i
            class="fas fa-minus"
            v-if="showTestScores"
            @click="togglePlusMinus"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StudentCard",
  props: ["student"],
  data: function () {
    return {
      showTestScores: false,
      tagInput: "",
    };
  },
  methods: {
    togglePlusMinus() {
      this.showTestScores = !this.showTestScores;
    },
    addTag() {
      const studentId = this.student.id;
      const tagName = this.tagInput;
      this.$store.commit("addTag", {
        studentId,
        tagName,
      });
      // this.$store.commit("atag", {
      //   studentId,
      //   tagName,
      // });
      this.tagInput = "";
    },
  },
  computed: {
    ...mapGetters([
      "singleStudentGrades",
      "singleStudentTags",
      "studentAverage",
    ]),
    formatStudentName() {
      const fullName = this.student.firstName + " " + this.student.lastName;
      return fullName.toUpperCase();
    },
    gradeAverage() {
      return this.studentAverage(this.student.id);
    },
    grades() {
      return this.singleStudentGrades(this.student.id);
    },
    tags() {
      return this.singleStudentTags(this.student.id);
    },
  },
};
</script>

<style scoped>
.image {
  border: 2px solid #efefef;
  border-radius: 50%;
}

.image-container {
  padding-top: 30px;
}

.student-container {
  padding-left: 30px;
}

.student-info {
  padding-left: 20px;
}

.student-name {
  font-size: 3em;
  font-weight: 900;
  color: black;
}

.icon-container {
  padding-top: 50px;
}

.icon {
  font-size: 3em;
  color: #aaaaaa;
  padding-right: 30px;
}

.grade-format {
  padding-left: 20px;
}

.fas:hover {
  color: black;
  cursor: pointer;
}

.tag-input {
  width: 30%;
}

.tag {
  background-color: #e0e0e0;
}
</style>
