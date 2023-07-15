<template>
  <div class="p-5 w-96">
    <h1 class="text-lg mb-6 text-blue-900">Job Application Tracker</h1>

    <div class="mb-6">
      <label for="email" class="label"> Job URL </label>
      <input type="text" class="input" readonly disabled />
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Company Name </label>
      <input type="text" class="input" />
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Job Title </label>
      <input type="text" class="input" />
    </div>

    <div class="mb-6">
      <label for="email" class="label"> Status </label>
      <select class="input">
        <option value="draft" selected>Draft</option>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="offer">Offer</option>
      </select>
    </div>

    <button
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
      form: {},
    };
  },
};
</script>
