<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <!-- <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://www.creative-tim.com">
              Creative Tim
            </a>
          </li>
          <li>
            <a href="https:///presentation.creative-tim.com">
              About Us
            </a>
          </li>
          <li>
            <a href="https:///blog.creative-tim.com">
              Blog
            </a>
          </li>
          <li>
            <a href="https://www.creative-tim.com/license">
              Licenses
            </a>
          </li>
        </ul>
      </nav> -->
      <div class="copyright">
        &copy; {{ year }},Freeboard made with <vuejs :size="30" />
      </div>
    <!-- </div> -->
  </footer>
</template>
<script>
import vuejs from 'vue-material-design-icons/Vuejs.vue'
import 'vue-material-design-icons/styles.css'

export default {
  components: {
    vuejs
  },
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style lang="scss" scoped>
  footer {
    display: flex;
    justify-content: center;
  }
</style>
