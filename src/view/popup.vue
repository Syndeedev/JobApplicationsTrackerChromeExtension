<template>
  <div class="bg-gray-100">
    <h1>Hello {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "popupView",
  data() {
    return {
      msg: "popup",
    };
  },
};
</script>
