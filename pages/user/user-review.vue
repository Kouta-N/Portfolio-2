<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><span class="title-font"
          ><nuxt-link to="/user/user-profile">YourCoach</nuxt-link></span
        >
        <input
          v-model.trim="searchWord"
          type="text"
          placeholder="コーチ検索ワード"
          style="margin-left: 10%"
        />
        <button class="btn btn-primary" @click="doSearchCoach">検索</button>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 25%">
          <b-nav-item>
            <nuxt-link to="/user/user-profile">
              <button class="btn btn-info">
                あなたのプロフィール
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/user/user-coach-list">
              <button class="btn btn-info ml-4">
                コーチ一覧とプラン
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/user/user-contract-list">
              <button class="btn btn-info ml-4">
                コーチ依頼履歴
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
    <!-- レビュー投稿画面 -->
    <form style="margin: 2em auto; max-width: 40%">
      <div class="form-group">
        <label>レビュー内容投稿欄</label>
        <textarea
          v-model="review"
          rows="3"
          class="form-control"
          placeholder="レビュー内容"
        />
      </div>
      <button
        type="button"
        class="btn btn-outline-success"
        style="margin-top: 1em"
        @click="doPostReview"
      >
        投稿
      </button>
      <div style="color: green; margin-top: 1em">{{ resultMessage }}</div>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    resultMessage: '' as string,
    review: '' as string,
    searchWord: '' as string,
  }),
  computed: {
    getID: {
      get() {
        return this.$store.getters.getID
      },
    },

    getSearchText: {
      get() {
        return this.$store.getters.getSearchText
      },
    },
  },
  methods: {
    doPostReview() {
      if (this.review === '') {
        this.resultMessage = '何も入力されていません。'
      } else {
        this.$store.commit('postReview', this.review)
        this.review = ''
        this.resultMessage = 'レビューを投稿しました。'
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
