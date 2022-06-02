<template>
  <form>
    <div class="comment-actions">
      <div
        v-show="!showReply"
        class="md-layout"
      >
        <!-- <small class="like-btn">{{ likes }}</small> -->
        <md-button
          @click="likePost"
          class="md-simple md-raised md-info"
        >
          <md-icon class="mr">thumb_up</md-icon>
          <small>like</small>
        </md-button>

        <md-button
          class="md-simple md-raised md-success" 
          @click="toggleReplyField"
        >
          <md-icon class="mr">reply</md-icon>
          <small>reply</small>
        </md-button>
        
      </div>
    </div>
    <div
      v-show="showReply"
      class="reply-section"
      >
      <md-avatar class="md-md">
        <img
          src="@/assets/img/faces/user.png"
          alt="avatar"
        >
      </md-avatar>

      <md-field md-clearable>
        <label>Write a nice reply</label>
        <md-textarea
          v-model="reply"
          md-autogrow
          :maxlength="replyMaxlength"
          class="md-textarea"
        >
        
        </md-textarea>
        <md-button
          @click="sendReply"
          :md-ripple="false"
          class="md-simple md-dense md-raised md-info btn-fab send-btn"
        >
          <md-icon class="mr">send</md-icon>
        </md-button>
      </md-field>
    </div>

    

    <div class="cancel-btn" v-show="showReply">
      <md-button
        @click="cancelComment"
        class="md-dense md-raised md-accent"
      >
        <small class="btn-text__cancel">Cancel</small>
      </md-button>
    </div>
    
    <div
      v-if="!commentCount"
      class="md-layout-row text-center">
      <i><small>Be the first one to comment</small></i>
    </div>
    <div
      v-else
      class="md-layout-row comment-wrapper">
      <div
        v-for="(item, key) in commentList"
        v-show="showReplySection"
        :key="key"
      >
        <div class="comment">
          <md-avatar class="md-avatar">
            <img
              src="@/assets/img/faces/user.png"
              alt="avatar"
            >
          </md-avatar>
          <div class="md-layout-item">
            <h4 class="comment-heading">
              User reply
              <small>
                <timeago :datetime="item.created_at" :auto-update="60"></timeago>
              </small>
            </h4>
            <div class="comment-body">
              <p class="comment-content">{{ item.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout-item show-reply">
      <md-button
        @click="toggleShowReplySection"
        class="md-simple"
      >
        <span v-if="showReplySection">hide replies </span>
        <span v-else>show replies ({{ commentCount }})</span>
      </md-button>
    </div>
    
  </form>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'


export default {
  name: 'ReplySection',

  data() {
    return {
      showReply: false,
      commentReply: false,
      reply: '',
      commentList: [],
      likes: 12,
      commentCount: 0,
      showReplySection: false,
      userIdComment: null
    }
  },

  props: {
    selectedPost: Number,
    replyMaxlength: Number,
    userId: Number,
    showAll: Boolean
  },

  created() {
    this.getComments()
    this.getToken()
  },

  methods: {
    ...mapActions('comments', {
      createReply: 'createReply'
    }),
    
    toggleReplyField() {
      this.showReply = !this.showReply
    },

    cancelComment() {
      this.showReply = !this.showReply
      this.reply = null
    },

    likePost() {
      this.likes++
    },

    clear() {
      this.reply = ''
    },

    toggleShowReplySection() {
      this.showReplySection = !this.showReplySection
    },

    async sendReply() {
      try {
        if (this.reply !== '') {
          const data = {
            user_id: this.userIdComment,
            post_id: this.selectedPost,
            comment: this.reply
          }
          await axios.post('http://localhost:5000/comments', data)
        }
        this.clear()
        this.getComments()
      } catch (err) {
        console.log(err)
      }
    },

    async getComments() {
      try {
        const response = await axios.get(`http://localhost:5000/comments/${this.selectedPost}`) 
        this.commentList = response.data
        this.commentCount = response.data.length
      } catch (err) {
        console.log(err)
      }
    },

    getToken() {
      try {
        const id = JSON.parse(localStorage.getItem('user'))

        if (!id) {
          alert('Please login first')
          this.$router.push('/')
        } else {
          this.userIdComment = id.id
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  /* computed: {
    showReplyField() {
      return this.post.id === this.selectedPost
    }
  } */
}
</script>

<style lang="scss" scoped>
  .reply-section {
    display: flex;
    margin-top: 2rem;
    padding: 0 2rem 0 1rem;
    gap: 1rem;

    .md-textarea {
      min-height: 100px !important;
      padding-right: 2rem;
    }
    &.open {
      transition: all .5s;
    }
  }
  .comment {
      display: flex;
      margin-top: 1rem;
      justify-content: flex-start;
    }
  .md-avatar {
    margin: 0;
  }
  .comment-heading {
    display: flex;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0;
    gap: 1rem;
  }
  .comment-wrapper {
    margin: 0rem 2rem;
  }
  .comment-body {
    margin-top: 1rem;
  }
  .comment-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .mr {
      margin-right: 0.5rem;
    }
  }
  .show-reply {
    display: flex;
    justify-content: center;
  }
  .like-btn {
    margin: auto;
  }
  .cancel-btn {
    margin-top: 2rem;
    padding-right: 2rem;
    display: flex;
    justify-content: end;
  }
  .send-btn {
    position: absolute;
    bottom: 0;
    right: -1rem;
  }

  .btn-text__cancel {
    color: white;
  }
</style>