<template>
  <div class="wrapper">
    <div class="section page-header" :style="headerStyle">
      <div class="container">
        <span>404</span>
        <span>Page Not Found</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',

  bodyClass: "login-page",

  props: {
    header: {
      type: String,
      default: require("@/assets/img/nature-3.jpg")
    }
  },

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  span {
    font-size: 30px;
    margin: .5rem 0;
  }
</style>