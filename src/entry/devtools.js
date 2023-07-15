import { createApp } from "vue";
import App from "../view/devtools.vue";
chrome.devtools.panels.create("Job Applications Tracke", "", "devtools.html");
createApp(App).mount("#app");
