<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <md-card
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <!-- <md-card-header>
              <div class="md-title">Please login</div>
            </md-card-header> -->
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('userName')">
                    <label for="username">Username</label>
                    <md-input
                      name="username"
                      id="username"
                      v-model="form.userName"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.userName.required">Username is required</span>
                    <span class="md-error" v-else-if="!$v.form.userName">Invalid username</span>
                  </md-field>
                  <md-card-actions class="actions">
                    <md-button
                      type="submit"
                      class="md-info md-block"
                      :disabled="sending"
                    >Next</md-button>
                  </md-card-actions>
                </div>
              </div>
            </md-card-content>  
            <!-- <login-card header-color="green" class="card">
              <h4 slot="title" class="card-title">Login</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>Username</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg">
                Login
              </md-button>
            </login-card> -->
          </md-card>

          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved successfully!</md-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { LoginCard } from "@/components"
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    // LoginCard

  },
  bodyClass: "login-page",
  data() {
    return {
      form: {
        userName: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }
  },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },

  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      }
    }
  },

  validations: {
    form: {
      userName: required
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    clearForm () {
      this.$v.$reset()
      this.form.userName = null
    },

    next () {
      this.sending = true

      window.setTimeout(() => {
        this.lastUser = this.form.userName
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },

    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveuser()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-card-header {
    max-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .actions {
    border: none !important;
  }
</style>
