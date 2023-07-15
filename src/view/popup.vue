<template>
  <div class="p-5 w-96">
    <h1 class="text-lg mb-6 text-blue-900">Job Application Tracker</h1>

    <div class="alert-danger" role="alert" v-if="error">
      <strong class="font-bold">{{ error }}</strong>
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Job URL </label>
      <input
        type="text"
        class="input"
        readonly
        disabled
        v-model="form.job_url"
      />
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Company Name </label>
      <input type="text" class="input" v-model="form.company_name" />
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Job Title </label>
      <input type="text" class="input" v-model="form.job_title" />
    </div>

    <div class="mb-6">
      <label class="label"> Status </label>
      <select class="input" v-model="form.status">
        <option value="draft">Draft</option>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer</option>
      </select>
    </div>

    <button
      @click="addJob"
      type="button"
      class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
    >
      Add Job
    </button>
  </div>
</template>

<script>
export default {
  name: "popupView",
  data() {
    return {
      form: {
        job_url: "",
        company_name: "",
        job_title: "",
        status: "draft",
      },
      error: null,
    };
  },
  mounted() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      this.form.job_url = tabs[0].url;
    });

    setInterval(() => (this.error = null), 1000 * 5);
  },
  methods: {
    addJob() {
      try {
        const emptyValues = Object.values(this.form).filter(
          (value) => !value || value === ""
        );

        if (emptyValues.length > 0) {
          throw new Error("All fields are required");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
