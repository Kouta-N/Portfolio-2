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
    <!-- 削除画面 -->
    <div class="profile-box">
      <div style="text-align: center">
        アカウント削除画面 <br /><br />
        下記のアカウントを本当に削除しますか？<br />
        <nuxt-link to="/user/user-deleted">
          <button class="btn btn-danger mt-4" @click="deleteUser">はい</button>
        </nuxt-link>
        <nuxt-link to="/user/user-profile"
          ><button class="btn btn-info mt-4" style="margin-left: 4em">
            戻る
          </button></nuxt-link
        ><br /><br />
      </div>
      <div class="delete-confirm-box">
        氏名
        <div class="profile-box2">{{ getName }}</div>
        <br />
        メールアドレス
        <div class="profile-box2">{{ getMail }}</div>
        <br />
        自己紹介文
        <div class="profile-box2">{{ getProfile }}</div>
        <br />
        年齢
        <div class="profile-box2">
          {{ getAge }}
        </div>
        <br />
        住所
        <div class="profile-box2">
          {{ getAddress }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    searchWord: '' as any,
  }),
  computed: {
    getName: {
      get() {
        return this.$store.getters.getName
      },
    },
    getMail: {
      get() {
        return this.$store.getters.getMail
      },
    },
    getProfile: {
      get() {
        return this.$store.getters.getProfile
      },
    },
    getAge: {
      get() {
        return this.$store.getters.getAge
      },
    },
    getAddress: {
      get() {
        return this.$store.getters.getAddress
      },
    },
  },
  methods: {
    deleteUser() {
      this.$store
        .dispatch('deleteAccount', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'users',
        })
        .then(() => {
          this.$router.push('/user/user-delete-complete')
        })
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
