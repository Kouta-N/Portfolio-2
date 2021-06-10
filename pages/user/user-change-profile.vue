<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><span class="title-font"
          ><nuxt-link to="/user/user-profile">>YourCoach</nuxt-link></span
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
    <!-- プロフィール変更画面 -->
    <div class="profile-box">
      <div style="text-align: center">プロフィール変更画面</div>
      <br />
      氏名
      <div class="profile-box2">{{ getName }}</div>
      変更する氏名を入力
      <input
        v-model="newName"
        class="form-control"
        placeholder="氏名"
        type="text"
      />
      <br />
      <div style="color: red">{{ errName }}</div>
      <button class="btn btn-warning" @click="doChangeName">
        氏名を変更する
      </button>
      <br /><br />
      メールアドレス
      <div class="profile-box2">{{ getMail }}</div>
      変更するメールアドレスを入力<br />
      <input
        v-model="newMail"
        class="form-control"
        placeholder="メールアドレス"
        type="mail"
      /><br />
      <div style="color: red">{{ errMail }}</div>
      <button class="btn btn-warning" @click="doChangeMail">
        メールアドレスを変更する
      </button>
      <br /><br />
      プロフィール
      <div class="profile-box2">{{ getProfile }}</div>
      変更するプロフィールの内容を入力<br />
      <input
        v-model="newProfile"
        class="form-control"
        placeholder="プロフィール"
        type="text"
      /><br />
      <div style="color: red">{{ errProfile }}</div>
      <button class="btn btn-warning" @click="doChangeProfile">
        プロフィールを変更する
      </button>
      <br /><br />
      年齢
      <div class="profile-box2">
        {{ getAge }}
      </div>
      変更する年齢を入力<br />
      <input
        v-model="newAge"
        class="form-control"
        placeholder="年齢"
        type="text"
      /><br />
      <div style="color: red">{{ errAge }}</div>
      <button class="btn btn-warning" @click="doChangeAge">
        年齢を変更する
      </button>
      <br /><br />
      住所
      <div class="profile-box2">
        {{ getAddress }}
      </div>
      変更する住所を入力<br />
      <input
        v-model="newAddress"
        class="form-control"
        placeholder="アドレス"
        type="text"
      /><br />
      <div style="color: red">{{ errAddress }}</div>
      <button class="btn btn-warning" @click="doChangeAddress">
        住所を変更する
      </button>
      <br /><br />
      変更するパスワードを入力<br />
      <input
        v-model="newPass"
        class="form-control"
        placeholder="パスワード"
        type="password"
      /><br />
      <div style="color: red">{{ errPass }}</div>
      <button class="btn btn-warning" @click="doChangePass">
        パスワードを変更する
      </button>
      <br /><br />
      <button class="btn btn-info">
        <nuxt-link to="/user/user-profile">戻る</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      newName: '' as string,
      newMail: '' as string,
      newProfile: '' as string,
      newAge: 0 as number,
      newAddress: '' as string,
      newPlan: '' as string,
      newPass: '' as string,
      errName: '' as string,
      errMail: '' as string,
      errProfile: '' as string,
      errAge: '' as string,
      errAddress: '' as string,
      errPass: '' as string,
      searchWord: '' as any,
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
    doChangeName() {
      if (this.newName !== '') {
        this.$store.commit('changeName', {
          name: this.newName,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'users',
        })
      } else if (this.newName === '') {
        this.errName = '何も入力されていません。'
      } else {
        this.errName = '適切な氏名を入力してください。'
      }
    },
    doChangeMail() {
      const tester = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (this.newMail === '') {
        this.errMail = '何も入力されていません。'
      } else if (!tester.test(this.newMail)) {
        this.errMail =
          'メールアドレスが半角文字でないか、形式が正しくありません。'
      } else {
        this.$store.commit('changeMail', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          newEmail: this.newMail,
          storage: 'users',
        })
      }
    },
    doChangeProfile() {
      if (this.newProfile !== '') {
        this.$store.commit('changeProfile', {
          profile: this.newProfile,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'users',
        })
      } else if (this.newProfile === '') {
        this.errProfile = '何も入力されていません。'
      } else {
        this.errProfile = '適切な自己紹介文を入力してください。'
      }
    },
    doChangeAge() {
      if (this.newAge !== '') {
        this.$store.commit('changeAge', {
          age: this.newAge,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'users',
        })
      } else if (this.newAge === '') {
        this.errAge = '何も入力されていません。'
      } else {
        this.errAge = '適切な年齢を入力してください。'
      }
    },
    doChangeAddress() {
      if (this.newAddress !== '') {
        this.$store.commit('changeAddress', {
          address: this.newAddress,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'users',
        })
      } else if (this.newAddress === '') {
        this.errAddress = '何も入力されていません。'
      } else {
        this.errAddress = '適切な住所を入力してください。'
      }
    },
    doChangePass() {
      const tester = /^[a-z\d]{6,}$/i
      if (this.newPass === '') {
        this.errPass = '何も入力されていません。'
      } else if (!tester.test(this.newPass)) {
        this.errPass = '6文字以上の適切なパスワードを入力してください。'
      } else {
        this.$store.commit('changePass', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          newPass: this.newPass,
          storage: 'users',
        })
        this.newPass = ''
        this.errPass = 'パスワードを変更しました'
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
