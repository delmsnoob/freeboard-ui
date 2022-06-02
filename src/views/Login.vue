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
                <div class="category">Login</div>
              </md-card-header>
              
              <div class="md-layout login-card">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('username')">
                  <md-icon>person</md-icon>
                    <label for="username">Username</label>
                    <md-input
                      name="username"
                      id="username"
                      v-model="form.username"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.username.required">Username is required</span>
                    <span class="md-error" v-else-if="!$v.form.username">Invalid username</span>
                  </md-field>
                  
                  <md-field :class="getValidationClass('password')">
                  <md-icon>lock</md-icon>
                    <label for="username">Password</label>
                    <md-input
                      name="password"
                      id="password"
                      type="password"
                      v-model="form.password"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.password.required">Password is required</span>
                    <span class="md-error" v-else-if="!$v.form.password">Invalid password</span>
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <span class="text-danger" v-if="invalid">Invalid credentials</span>

            <md-progress-bar v-if="sending" md-mode="indeterminate" class="md-progress-bar"/>

            <md-card-actions class="actions">
              <md-button type="submit" class="md-info md-block" :disabled="sending">Login</md-button>
              <md-button to="/register" class="md-simple md-info" :disabled="sending">Create account</md-button>
            </md-card-actions>
          </md-card>

          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved successfully!</md-snackbar>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import axios from 'axios'

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [validationMixin],
  
  bodyClass: "login-page",
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      invalid: false
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
      username: required,
      password: required
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
      this.form.password = null
    },

    invalidate () {
      window.setTimeout(() => {
        this.invalid = !this.invalid
        this.sending = !this.sending
      }, 500)
    },

    async checkToken () {
      try {
        const id = JSON.parse(localStorage.getItem('user'))
        const token = id.username

        console.log(id, 'id')
        console.log(token, 'token')

        if (id) {
          this.$router.push({ path: `/dashboard/${token}` })
        }
      } catch (err) {
        console.log(err)
      }
    },

    async login () {
      this.sending = true
      
      const data = {
        username: this.form.username,
        password: md5(this.form.password)
      }

      try {
        const token = await axios.post('http://localhost:5000/users/login', data)

        if (token.data) {
          window.setTimeout(() => {
            const tokenData = {
              id: token.data.id,
              username: token.data.username
            }
            localStorage.setItem('user', JSON.stringify(tokenData))
            this.$router.push({ path: `/dashboard/${token.data.username}` })
          }, 500)
        } else {
          this.invalidate()
        }
      } catch (err) {
        console.log(err)
      }
    },

    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.login()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    height: 370px !important;
    align-items: center;
  }
  .md-progress-bar {
    position: absolute;
    bottom: -1.3rem;
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
    display: block !important;
    border: none !important;
    justify-content: center !important;
    padding: 0 1.5rem !important;
    text-align: center;
    position: absolute;
    bottom: 2.5rem;
    right: 0;
    left: 0;
  }
  .login-card {
    margin-top: 3rem;
  }
  .text-danger {
    // font-style: italic;
    font-size: 12px;
    width: 100%;
    // margin: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem !important;
    line-height: .5;
  }
</style>
