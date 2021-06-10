<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><span class="title-font">YourCoach</span>
        <input
          v-model.trim="searchWord"
          type="text"
          placeholder="コーチ名検索"
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
    <!-- プロフィール -->
    <div class="profile-box">
      <div style="text-align: center">
        <div style="font-size: 1.5em">あなたのプロフィール</div>
      </div>
      <br />
      氏名
      <div class="profile-box2">{{ getName }}</div>
      <br />
      メールアドレス
      <div class="profile-box2">{{ getMail }}</div>
      <br />
      プロフィール
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
      <br />
      <span style="margin-left: 7em">
        <nuxt-link to="/user/user-change-profile"
          ><button class="btn btn-info mt-4">
            プロフィールを変更する
          </button></nuxt-link
        >
        <span style="margin-left: 3em">
          <nuxt-link to="/user/user-delete"
            ><button class="btn btn-danger mt-4">
              アカウント削除
            </button></nuxt-link
          >
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      searchWord: '' as string,
    }
  },
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
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
