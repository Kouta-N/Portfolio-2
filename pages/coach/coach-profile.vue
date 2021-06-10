<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">YourCoach</div></b-navbar-brand
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
    <!-- プロフィール -->

    <!-- プロフィール -->
    <div class="profile-box">
      <div style="text-align: center">
        <div style="font-size: 1.5em">あなたのプロフィール</div>
      </div>
      <br />
      氏名
      <div class="profile-box2">{{ getName }}</div>
      <br />
      プロフィール画像
      <div class="profile-box2"><img :src="getImage" class="img-box" /></div>
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
      専門スポーツ
      <div class="profile-box2">
        {{ getSpecialty }}
      </div>
      <br />
      住所
      <div class="profile-box2">
        {{ getAddress }}
      </div>
      <br />
      <span style="margin-left: 7em">
        <nuxt-link to="/coach/coach-change-profile"
          ><button class="btn btn-info mt-4">
            プロフィールを変更する
          </button></nuxt-link
        >
        <span style="margin-left: 3em">
          <nuxt-link to="/coach/coach-delete"
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
  computed: {
    getName: {
      get() {
        return this.$store.getters.getName
      },
    },
    getImage: {
      get() {
        return this.$store.getters.getImage
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
    getRequestPlan: {
      get() {
        return this.$store.getters.getRequestPlan
      },
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
