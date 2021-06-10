<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">
          <nuxt-link to="/">YourCoach</nuxt-link>
        </div></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 55%">
          <b-nav-item>
            <nuxt-link to="/login/user-registration">
              <b-button variant="primary">ユーザー新規登録</b-button>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/login/coach-login">
              <b-button variant="success">コーチログイン</b-button>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/login/coach-registration">
              <b-button variant="success">コーチ新規登録</b-button>
            </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- ログインフォーム -->
    <div class="main-text">
      <br />
      <br />
      <div class="login-box">
        <h2 style="text-align: center">ユーザーログイン画面</h2>
        <br />
        <div class="mb-3">
          <label class="form-label">メールアドレス</label>
          <input
            v-model="userMailAddress"
            type="email"
            class="form-control"
            placeholder="メールアドレス"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">パスワード</label>
          <input
            v-model="userPassword"
            type="password"
            class="form-control"
            placeholder="パスワード"
          />
        </div>
        <div style="color: red">{{ errMessage }}</div>
        <br />
        <div style="text-align: center">
          <button class="login-button" @click="userLogin">
            ユーザーログイン
          </button>
        </div>
      </div>
      <!-- ログイン、登録ページのリンク -->
      <div class="links" style="text-align: center">
        <br />
        コーチとしてログインする場合は
        <button class="login-button">
          <nuxt-link to="/login/coach-login">こちら</nuxt-link></button
        ><br /><br />
        ユーザの新規登録は
        <button class="login-button">
          <nuxt-link to="/login/user-registration">こちら</nuxt-link></button
        ><br /><br />
        コーチの新規登録は
        <button class="login-button">
          <nuxt-link to="/login/coach-registration">こちら</nuxt-link></button
        ><br /><br />
        <button class="btn btn-info">
          <nuxt-link to="/">ホームへ戻る</nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      userMailAddress: '' as string,
      userPassword: '' as string,
      errMessage: '' as string,
    }
  },
  methods: {
    userLogin() {
      if (this.userMailAddress === '' || this.userPassword === '') {
        this.errMessage = '未入力の箇所があります。'
      }
      this.$store.dispatch('login', {
        email: this.userMailAddress,
        pass: this.userPassword,
        storage: 'users' as string,
      })
    },
    doLoginTwitter() {
      this.$store.commit('loginTwitter')
    },
  },
}
</script>
