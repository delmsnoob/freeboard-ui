<template>
  <div class="wrapper">
    <div class="section page-header" :style="headerStyle">
      <div class="container">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-90 md-medium-size-40 mx-auto md-card"
          >
            <md-card-content>
              <md-card-header>
                <div class="category">Create account</div>
              </md-card-header>
              <div class="md-layout register-card">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('username')" class="md-field">
                    <md-icon>person</md-icon>
                    <label for="username">Username</label>
                    <md-input
                      name="username"
                      id="username"
                      v-model="form.username"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
                  </md-field>

                  <md-field :class="getValidationClass('email')" class="md-field">
                    <md-icon>email</md-icon>
                    <label for="email">Email</label>
                    <md-input
                      name="email"
                      id="email"
                      v-model="form.email"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.email.required">Email is required</span>
                    <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                  </md-field>
                  
                  <md-field :class="getValidationClass('password')" class="md-field">
                    <md-icon>lock</md-icon>
                    <label for="password">Password</label>
                    <md-input
                      name="password"
                      id="password"
                      type="password"
                      v-model="form.password"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
                    <span class="md-error" v-else-if="!$v.form.password.minLength">Password too short</span>
                    <span class="md-error" v-else-if="!$v.form.password.maxLength">Password too long</span>
                  </md-field>

                  <md-field :class="getValidationClass('cpassword')" class="md-field">
                    <md-icon>lock</md-icon>
                    <label for="cpassword">Confirm password</label>
                    <md-input
                      name="cpassword"
                      id="cpassword"
                      type="password"
                      v-model="form.cpassword"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.cpassword.required">Please confirm password</span>
                    <span class="md-error" v-else-if="form.password && !$v.form.cpassword.sameAsPassword">Password do not match</span>
                  </md-field>
                </div>
              </div>
            </md-card-content>  


            <md-card-actions class="actions">
              <md-button
                type="submit"
                class="md-info md-block"
                :disabled="sending"
              >Create account</md-button>
            </md-card-actions>

            <md-progress-spinner
              v-if="sending"
              :md-diameter="30"
              :md-stroke="4"
              md-mode="indeterminate"
              class="spinner"
            />


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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import axios from 'axios'

import md5 from 'md5'

import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  components: {
    // LoginCard

  },
  bodyClass: "login-page",
  data() {
    return {
      form: {
        username: null,
        email: null,
        password: null,
        cpassword: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      match: false
    }
  },

  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
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
      username: { required },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(9)
      },
      cpassword: {
        required,
        sameAsPassword:  sameAs('password')
      }
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
      this.form.username = null
      this.form.email = null
      this.form.password = null
      this.form.cpassword = null
    },

    async register () {
      this.sending = true

      const data = {
        username: this.form.username,
        email: this.form.email,
        password: md5(this.form.password)
      }
      try {
        const response = await axios.post('http://localhost:5000/users/register', data)
        window.setTimeout(() => {
        this.lastUser = this.form.username
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
      } catch (err) {
        console.log(err)
      }
    },

    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.register()
        window.setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    height: 450px !important;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .md-card-header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .actions {
    border: none !important;
    justify-content: center !important;
    margin-top: 1rem !important;
    padding: .5rem 1rem !important
  }
  .register-card {
    margin-top: 2rem;
  }
  .md-error {
    margin-bottom: 1rem !important;
  }
  .md-field {
    margin-top: 1rem;
  }
  .spinner {
    position: absolute;
    bottom: 0;
    margin: 0 9.8rem 1rem;
    // right: 0;
    // left: 0;
  }
</style>
