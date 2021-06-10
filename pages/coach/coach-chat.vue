<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">
          <nuxt-link to="/coach/coach-profile">YourCoach</nuxt-link>
        </div></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 40%">
          <b-nav-item>
            <nuxt-link to="/coach/coach-profile">
              <button class="btn btn-info ml-4 center-block">
                あなたのプロフィール
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/coach/coach-plan-list">
              <button class="btn btn-info ml-4">
                プラン一覧と作成
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/coach/coach-contract-list">
              <button class="btn btn-info ml-4">
                コーチ中のユーザ一覧
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <button class="btn btn-secondary" @click="doLogout">
              ログアウト
            </button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- チャット投稿画面 -->
    <form style="margin: 2em auto; max-width: 40%">
      <div class="form-group">
        <label>チャット内容投稿欄</label>
        <textarea
          v-model="message"
          rows="3"
          class="form-control"
          placeholder="チャット内容"
        />
      </div>
      <button
        type="button"
        class="btn btn-outline-success"
        style="margin-top: 1em"
        @click="doCoachChat"
      >
        投稿
      </button>
      <div style="color: green; margin-top: 1em">{{ resultMessage }}</div>
    </form>
    <br />
    <div class="chat-form">
      チャット内容
      <br />
      <div v-for="chatContent in chatContents" :key="chatContent.index">
        <div class="user-chat-box">{{ chatContent }}<br /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
export default {
  data: () => ({
    resultMessage: '' as string,
    message: '' as string,
    chatContents: [] as Array<string>,
    searchWord: '' as any,
  }),
  computed: {
    getSearchText: {
      get() {
        return this.$store.getters.getSearchText
      },
    },
  },
  created() {
    const db = firebase.firestore()
    const dbChat = db
      .collection('users')
      .doc(this.$store.state.targetUserID)
      .collection('ContractCoach')
    dbChat.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const chatData = doc.data()
        if (this.$store.state.loginUserID === chatData.CoachID) {
          this.chatContents = []
          chatData.Messages.forEach((value) => {
            this.chatContents.unshift(value)
          })
        }
      })
    })
  },
  methods: {
    doCoachChat() {
      if (this.message === '') {
        this.resultMessage = '何も入力されていません。'
      } else {
        this.$store.commit(
          'coachChat',
          this.$store.state.loginUserName + ': ' + this.message
        )
        this.message = ''
      }
    },
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
