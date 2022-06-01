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

            <md-progress-spinner
              v-if="sending"
              :md-diameter="30"
              :md-stroke="4"
              md-mode="indeterminate"
              class="spinner"
            />

            <md-card-actions class="actions">
              <md-button
                type="submit"
                class="md-info md-block"
                :disabled="sending"
              >Login</md-button>

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
import { vueLocalStorage } from '../assets/mixins/VueLocalStorage'
import md5 from 'md5'
import axios from 'axios'
// import { mapActions } from 'vuex'

// import { LoginCard } from "@/components"
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

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

    async login () {
      this.sending = true

      const data = {
        username: this.form.username,
        password: md5(this.form.password)
      }

      try {
<<<<<<< HEAD
        const token = await axios.post('http://localhost:5000/users/login', data)
        console.log(token, 'token')
=======
        const token = await axios.post('http://localhost:5000/users/login', data, {
          headers: {
            'Authorization': `Basic ${token}`
          }
        })
        console.log(token, 'token');
>>>>>>> 34eb93b2ab42f47430eeb216b32c35215a2f4f95

        // axios.defaults.headers.Authorization = `Bearer ${token}`

        // vueLocalStorage.setItem('token', token)
        console.log(token.data)
        // if (token.)

        await this.$router.push({ path: `/dashboard/${data.username}` })
      } catch (err) {
        console.log(err)
      }

      
      /* try {
        const response = await axios.post('http://localhost:5000/users/login', data)
        window.setTimeout(() => {
        this.sending = false
          this.$router.push({ path: `/dashboard/${data.username}` })
        }, 1500)
        this.clearForm()
      } catch (err) {
        console.log(err)
      } */
      /* window.setTimeout(() => {
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500) */
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
  .spinner {
    position: absolute;
    bottom: 0;
    margin: 0 9.8rem 1rem;
  }
</style>
