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
    <!-- プラン作成画面 -->
    <div class="plan-make-box">
      <div style="text-align: center">プラン作成画面</div>
      <br />
      プランの名前<br />
      <input
        v-model="planName"
        class="form-control"
        placeholder="プラン名"
        type="text"
      /><br />
      プランの内容
      <input
        v-model="planContents"
        class="form-control"
        placeholder="プラン内容"
        type="text"
      />
      <br />
      <div style="color: red">{{ message }}</div>
      <button class="btn btn-success" @click="doMakePlan">
        プランを作成する
      </button>
      <button class="btn btn-info" style="margin-left: 2em">
        <nuxt-link to="/coach/coach-plan-list">戻る</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      planName: '' as string,
      planContents: '' as string,
      message: '' as string,
    }
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
    doMakePlan() {
      if (this.planName === '' || this.planContents === '') {
        this.message = '未入力の値があります'
      } else {
        this.$store.commit('makePlan', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          name: this.$store.state.loginUserName,
          plan: this.planName,
          contents: this.planContents,
        })
      }
    },
  },
}
</script>
