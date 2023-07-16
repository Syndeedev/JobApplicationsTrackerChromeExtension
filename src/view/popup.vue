<template>
  <div class="p-5 w-96">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-lg text-blue-900">Job Application Tracker</h1>
      <p @click="viewJobs" class="hover:text-blue-600 text-xs cursor-pointer">
        View Tracked Jobs
      </p>
    </div>

    <div class="alert-danger" role="alert" v-if="error">
      <strong class="font-bold">{{ error }}</strong>
    </div>

    <div class="alert-success" role="alert" v-if="message">
      <p class="font-bold">{{ message }}</p>
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
      :disabled="loading"
      type="button"
      class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full"
    >
      {{ loading ? "Loading..." : "Add Job" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
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
      loading: false,
      error: null,
      message: null,
    };
  },

  mounted() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      this.form.job_url = tabs[0].url;
    });
  },

  methods: {
    async addJob() {
      this.loading = true;
      this.message = null;
      this.error = null;

      try {
        const emptyValues = Object.values(this.form).filter(
          (value) => !value || value === ""
        );

        if (emptyValues.length > 0) {
          throw new Error("All fields are required");
        }
        const payload = {
          "JOB URL": this.form.job_url,
          "COMPANY NAME": this.form.company_name,
          "JOB TITLE": this.form.job_title,
          STATUS: this.form.status,
        };

        const response = await axios.post(
          "https://in4h2dimqg.execute-api.us-east-1.amazonaws.com",
          payload
        );

        if (response.data.status === "Successful") {
          this.message = "Job added to your tracker successfully";
          this.form.company_name = "";
          this.form.job_title = "";
        } else {
          throw new Error("Could not add job to your tracker please try again");
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    viewJobs() {
      chrome.tabs.create({
        url: "https://docs.google.com/spreadsheets/d/1e6HhRAcd2qTrMgMR33g_8dCHFP-Q29ro6yNoXHFBk48/edit#gid=0&fvid=212168865",
      });
    },
  },
};
</script>
