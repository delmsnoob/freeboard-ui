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
              class="md-layout-item md-size-80 md-xsmall-size-100 ml-auto mr-auto text-center"
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
                  <h4 v-else>{{ user }}</h4>
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

          <SearchSection :posts="posts" />

          <div class="container">
            <div class="md-layout-row">
              <h3>{{ this.postcount }} Posts</h3>
              <div 
                v-for="(item, key) in posts"
                :key="key"
              >
                <div class="comment post-container">
                  <div class="md-layout-item post-wrapper">
                    
                    <div class="comment-body">
                      <md-avatar class="md-md">
                        <img
                          src="@/assets/img/faces/user.png"
                          alt="avatar"
                        >
                      </md-avatar>
                      <h4 class="comment-heading">
                        {{ item.author_name }}
                        <small>
                          <timeago :datetime="item.created_at" :auto-update="60"></timeago>
                        </small>
                      </h4>
                    </div>

                    <p class="post-content">{{ item.author_post }}</p>
                    
                    <ReplySection :selectedPost="item.id" @click="selectedPost=post.id" :showReply="showReply" :replyMaxlength="replyMaxlength" :reply="reply"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

import ReplySection from '@/views/components/ReplySection'
import SearchSection from './components/SearchSection'

export default {
  name: "Dashboard",

  components: {
    ReplySection,
    SearchSection
  },

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
    },
  },

  data() {
    return {
      firstname: null,
      password: null,
      leafShow: false,
      user: null,
      email: null,
      postDetails: {
        author: '',
        email: '',
        post: '',
      },
      postcount: 0,
      postMaxlength: 200,
      reply: null,
      replyMaxlength: 200,
      posts: [],
      showReply: false,
      position: 'bottom-right',

      searchFor: null,
      searchParams: 'post',

      showPosts: false
    }
  },

  created() {
    this.getPost()
    this.getToken()
  },

  computed: {
    // ...mapState('posts', {
    //   postList: 'postList',
    //   postCount: 'postCount'
    // }),
      
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
  },

  methods: {
    /* ...mapActions('posts', {
      createPost: 'create'
    }), */

    leafActive() {
      if (window.innerWidth < 768) {
        this.leafShow = false
      } else {
        this.leafShow = true
      }
    },

    clear() {
      this.postDetails.author = ''
      this.postDetails.email = ''
      this.postDetails.post = ''
    },

    async savePost() {
      const data = {
        author_name: this.postDetails.author,
        author_email: this.postDetails.email,
        author_post: this.postDetails.post
      }
      try {
        if (this.postDetails.author !== '' && this.postDetails.email !== ''  && this.postDetails.post !== '') {
          const response = await axios.post('http://localhost:5000/posts', data)
          
          this.posts = response.data
          this.postcount = response.data.length
          this.clear()
        } else {
        }
        
        this.getPost()        
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
    },

    getToken() {
      try {
        const id = JSON.parse(localStorage.getItem('user'))
        
        if (!id) {
          alert('You need to login first')
          this.$router.push({ path: '/' })
        } else {
          this.user = id.username
        }
      } catch (err) {
        console.log(err)
      }
    },

    handleShowPosts(event) {
      const { value } = event.target
      this.value = !value
    }
  }
}
</script>
<style lang="scss" scoped>
  .post-wrapper {
    background-color: #efefef;
  }
  .post-content {
    padding-left: .5rem;
  }
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
  .comment-body {
    display: flex;
    flex-direction: row;
    padding: 1rem 0;
    gap: .5rem;
  }
  .comment-footer{
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    justify-content: flex-end;
  }
  .comment-heading {
    display: flex;
    gap: 1rem;
    font-weight: 500;
    font-size: 15px;
  }
  small {
    display: block;
  }
  .md-md {
    margin: 0;
  }
  
@media all and (min-width: 991px) {
  .btn-container {
    display: flex;
  }
}
</style>
