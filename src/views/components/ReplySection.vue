<template>
  <form>
    <div
      v-show="showReply"
      class="reply-section"
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

    <div class="comment-footer">

      <div
        v-if="!showReply"
        class="md-layout"
      >
        <small class="like-btn">{{ likes }}</small>

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

      <div class="cancel-btn" v-else>
        <md-button
          @click="cancelComment"
          class="md-dense md-raised md-accent"
        >
          <small class="btn-text__cancel">Cancel</small>
        </md-button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'


export default {
  name: 'ReplySection',

  data() {
    return {
      showReply: false,
      reply: '',
      likes: 12
    }
  },

  props: {
    selectedPost: Number,
    replyMaxlength: Number,
    userId: Number
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
      this.likes += 1
    },

    clear() {
      this.reply = ''
    },

    async sendReply() {
      try {
        if (this.reply !== '') {
          await axios.post('http://localhost:5000/comments', {
            post_id: this.selectedPost,
            comment: this.reply,
          })
        }
        this.clear()
      } catch (err) {
        console.log(err)
      }
    }
  },

  computed: {
    showReplyField() {
      return this.post.id === this.selectedPost
    }
  }
}
</script>

<style lang="scss" scoped>
  .reply-section {
    display: flex;
    margin-top: 2rem;
    gap: 1rem;

    .md-textarea {
      min-height: 100px !important;
    }

    &.open {
      transition: all .5s;
    }
  }

  .comment-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .mr {
      margin-right: 0.5rem;
    }

    .cancel-btn {
      margin-top: 2rem;
    }

    .like-btn {
      margin: auto;
    }
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