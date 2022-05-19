<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" :style="headerStyle">
      <div class="md-layout">
        <div class="md-layout-item">
          <div class="image-wrapper">
            <img :src="leaf4" alt="leaf4" class="leaf4" v-show="leafShow" />
            <img :src="leaf3" alt="leaf3" class="leaf3" v-show="leafShow" />
            <img :src="leaf2" alt="leaf2" class="leaf2" v-show="leafShow" />
            <img :src="leaf1" alt="leaf1" class="leaf1" v-show="leafShow" />
            <div class="brand">
              <h1>Freeboard</h1>
              <h3>Feel free to post your comments and ideas</h3>
            </div>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container text-center">
          <div class="md-layout-row">
            <div
              class="md-layout-item md-size-66 md-xsmall-size-100 ml-auto mr-auto text-center"
            >
              <h2>Post your comment as</h2>
              <div class="md-layout-row">
                <div class="md-layout-item">
                  <md-avatar class="md-large">
                    <img
                      src="@/assets/img/faces/user.png"
                      alt="avatar"
                    >
                  </md-avatar>
                </div>
                <div class="md-layout-item">
                  <h4 v-if="user === null">Guest</h4>
                </div>
              </div>
              <div class="post-comment">                
                <form @submit.prevent="savePost">
                  <div class="md-layout">
                    <!-- Guest name -->
                    <div class="md-layout-item">
                      <md-field md-clearable>
                        <label>Your Name</label>
                        <md-input
                          v-model="postDetails.author"
                        >
                        </md-input>
                      </md-field>
                    </div>  

                    <!-- Guest email -->
                    <div class="md-layout-item">
                      <md-field md-clearable>
                        <label>Your Email</label>
                        <md-input
                          v-model="postDetails.email"
                          type="email"
                        >
                        </md-input>
                      </md-field>
                    </div>
                  </div>

                  <!-- Guest comment/post -->
                  <md-field>
                    <label>What's on your mind?</label>
                    <md-textarea
                      v-model="postDetails.post"
                      :maxlength=postMaxlength
                      md-autogrow
                      class="md-textarea"
                    >
                    </md-textarea>
                  </md-field>

                  <!-- Post comment -->
                  <div class="comment-footer">
                    <md-button
                      type="submit"
                      class="md-accent md-md ml-auto"
                    >
                      Post
                    </md-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="posts-section">
        <div class="section">
          <div class="container">
            <div class="md-layout-row">
              <h3>{{ this.postcount }} Posts</h3>
              <div v-for="(item, key) in posts"
                :key="key"
              >
                <div class="comment post-container">
                    <md-avatar class="md-large">
                      <img
                        src="@/assets/img/faces/user.png"
                        alt="avatar"
                      >
                    </md-avatar>

                  <div class="md-layout-item">
                    <div class="comment-body">
                      <h4 class="comment-heading">
                        {{ item.author_name }}
                        <small>
                          <timeago :datetime="item.created_at" :auto-update="60"></timeago>
                        </small>
                      </h4>
                    </div>

                    <p>{{ item.author_post }}</p>

                    <!-- <div
                      v-show="showReplyField"
                      class="reply-section"
                      :id="item.id"
                    >
                      <md-avatar class="md-large">
                        <img
                          src="@/assets/img/faces/user.png"
                          alt="avatar"
                        >
                      </md-avatar>
                      <md-field md-clearable>
                        <label>Write a nice reply</label>
                        <md-textarea
                          v-model="reply"
                          :maxlength=replyMaxlength
                          md-autogrow
                          class="md-textarea"
                        >
                        </md-textarea>
                      </md-field>
                    </div> -->

                    <ReplySection :selectedPost="item.id" :post="posts" @click="selectedPost = post.id" :showReply="showReply" :replyMaxlength="replyMaxlength" :reply="reply"/>

                    <!-- <div class="comment-footer">
                      <md-button class="md-simple md-raised md-info no-pad">
                        <md-icon>thumb_up</md-icon>
                        <small class="icon-text">like</small>
                      </md-button>

                      <md-button
                        class="md-simple md-raised md-success" 
                        @click="toggleReplyField(item.id)"
                      >
                        <md-icon>reply</md-icon>
                        <small class="icon-text">reply</small>
                      </md-button>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-signup page-header" :style="signupImage">
        <div class="container">
          <div class="md-layout">
            <div
              class="md-layout-item md-size-33 md-medium-size-40 md-small-size-50 md-xsmall-size-70 mx-auto text-center"
            >
              <login-card header-color="green">
                <h4 slot="title" class="card-title">Login</h4>
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-facebook-square"></i>
                </md-button>
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-twitter"></i>
                </md-button>
                <md-button
                  slot="buttons"
                  href="javascript:void(0)"
                  class="md-just-icon md-simple md-white"
                >
                  <i class="fab fa-google-plus-g"></i>
                </md-button>
                <p slot="description" class="description">Or Be Classical</p>
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>face</md-icon>
                  <label>First Name...</label>
                  <md-input v-model="firstname"></md-input>
                </md-field>
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>email</md-icon>
                  <label>Email...</label>
                  <md-input v-model="email" type="email"></md-input>
                </md-field>
                <md-field class="md-form-group" slot="inputs">
                  <md-icon>lock_outline</md-icon>
                  <label>Password...</label>
                  <md-input v-model="password"></md-input>
                </md-field>
                <md-button slot="footer" class="md-simple md-success md-lg">
                  Get Started
                </md-button>
              </login-card>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-download" id="downloadSection">
        <div class="container">
          <div class="md-layout text-center">
            <div class="md-layout-item md-size-66 md-small-size-100 mx-auto">
              <h2>Do you love this UI Kit?</h2>
              <h4>
                Cause if you do, it can be yours for FREE. Hit the buttons below
                to navigate to our website where you can find the kit. Our
                friends from
                <a
                  href="https://themeisle.com/?utm_campaign=mkfree-hestia&amp;utm_source=creativetim&amp;utm_medium=website"
                  target="_blank"
                  >ThemeIsle</a
                >
                created a Wordpress Theme which can be also downloaded for free.
                Start a new project or give an old Bootstrap project a new look!
              </h4>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100 mx-auto">
              <md-button
                href="https://www.creative-tim.com/product/material-kit"
                target="_blank"
                class="md-success md-lg"
                ><i class="fab fa-html5"></i> Free HTML Download</md-button
              >
              <md-button
                href="https://themeisle.com/themes/hestia/?utm_campaign=mkfree-hestia&amp;utm_source=creativetim&amp;utm_medium=website"
                class="md-success md-lg"
                target="_blank"
                ><i class="fab fa-wordpress"></i> Wordpress Theme</md-button
              >
            </div>
          </div>
          <br /><br />
          <div class="sharing-area text-center">
            <div class="md-layout">
              <div class="md-layout-item">
                <h3>Thank you for supporting us!</h3>
              </div>
            </div>

            <md-button class="md-twitter"
              ><i class="fab fa-twitter"></i>Tweet</md-button
            >
            <md-button class="md-facebook"
              ><i class="fab fa-facebook-square"></i> Share</md-button
            >
            <md-button class="md-google"
              ><i class="fab fa-google-plus"></i> Share</md-button
            >
            <md-button class="md-github"
              ><i class="fab fa-github"></i> Star</md-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from '@/components'
import ReplySection from './components/ReplySection.vue'
import axios from 'axios';
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    LoginCard,
    ReplySection
},
  name: "Index",
  bodyClass: "index-page",
  props: {
    image: {
      type: String,
      default: require("@/assets/img/vue-mk-header.jpg")
    },
    leaf4: {
      type: String,
      default: require("@/assets/img/leaf4.png")
    },
    leaf3: {
      type: String,
      default: require("@/assets/img/leaf3.png")
    },
    leaf2: {
      type: String,
      default: require("@/assets/img/leaf2.png")
    },
    leaf1: {
      type: String,
      default: require("@/assets/img/leaf1.png")
    },
    signup: {
      type: String,
      default: require("@/assets/img/city.jpg")
    },
    landing: {
      type: String,
      default: require("@/assets/img/landing.jpg")
    },
    profile: {
      type: String,
      default: require("@/assets/img/profile.jpg")
    }
  },
  data() {
    return {
      firstname: null,
      password: null,
      leafShow: false,
      user: null,
      email: null,
      postDetails: {
        author: null,
        email: null,
        post: null,
      },
      postcount: 0,
      posts: [],
      postMaxlength: 200,
      reply: null,
      replyMaxlength: 100,

      showReply: false
    };
  },

  created() {
    this.getPost()
  },

  methods: {
    ...mapActions('posts', {
      createPost: 'create'
    }),

    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false
      } else {
        this.leafShow = true
      }
    },

    toggleReplyField(id) {
      this.showReplyField = !this.showReplyField
    },

    async savePost() {
      try {
        if (this.postDetails !== null) {
          await axios.post('http://localhost:5000/posts', {
            author_name: this.postDetails.author,
            author_email: this.postDetails.email,
            author_post: this.postDetails.post
          })
        } 
        this.getPost()        
        this.postDetails.author = ''
        this.postDetails.email = ''
        this.postDetails.post = ''
      } catch (err) {
        console.log(err)
      }
    },

    async getPost() {
      try {
        const response = await axios.get('http://localhost:5000/posts')
        this.posts = response.data
        this.postcount = response.data.length
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.image})`
      }
    },
    signupImage() {
      return {
        backgroundImage: `url(${this.signup})`
      }
    }
  },
  mounted() {
    this.leafActive()
    window.addEventListener("resize", this.leafActive)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.leafActive)
  }
}
</script>
<style lang="scss" scoped>
  .posts-section {
    max-width: 800px;
    margin: auto;
  }
  .comment {
    display: flex;
    justify-content: start;
    // align-items: flex-start;
  }

  .post-container {
      margin-bottom: 4rem;
    }

  .md-textarea {
    min-height: 100px !important;
  }

  .comment-footer{
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    justify-content: flex-end;
  }

  .comment-heading {
    // display: flex;
    font-weight: 500;
    flex-direction: row;
  }

  small {
    display: block;
  }

  .md-large {
    margin: 0;
  }

@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
