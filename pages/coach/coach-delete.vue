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

    <div class="profile-box">
      <div style="text-align: center">
        アカウント削除画面 <br /><br />
        下記のアカウントを本当に削除しますか？<br />
        <button class="btn btn-danger mt-3" @click="deleteCoach">
          <nuxt-link to="/coach/coach-deleted">はい</nuxt-link></button
        ><button class="btn btn-info mt-3" style="margin-left: 4em">
          <nuxt-link to="/coach/coach-profile">戻る</nuxt-link></button
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
        得意スポーツ
        <div class="profile-box2">
          {{ getSpecialty }}
        </div>
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
    getSpecialty: {
      get() {
        return this.$store.getters.getSpecialty
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
    deleteCoach() {
      this.$store
        .dispatch('deleteAccount', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'coaches',
        })
        .then(() => {
          this.$router.push('/coach/coach-delete-complete')
        })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
