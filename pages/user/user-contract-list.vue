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
    <!-- 検索ボックス -->
    <br />
    <div class="coach-search-box">
      <label class="form-label"
        ><span style="font-size: 1.5em">プラン内容検索ワード</span></label
      >
      <div class="input-form">
        <input
          v-model="contractKeyword"
          type="text"
          class="form-control"
          placeholder="検索ワード"
        />
      </div>
    </div>
    <br />
    <!-- プラン一覧 -->
    <div v-for="contract in filteredContracts" :key="contract.index">
      <div
        class="card"
        style="
          max-width: 40%;
          margin: 3em auto;
          box-shadow: 0 0 0.2em 0 grey;
          border-radius: 0.4em;
        "
      >
        <div class="card-body">
          <h5 class="card-title">コーチの氏名</h5>
          <div class="profile-box2">
            {{ contract.coachName }}
          </div>
          プラン名 <br />
          <div class="profile-box2">
            {{ contract.planName }}
          </div>
          プラン内容 <br />
          <div class="profile-box2">
            {{ contract.contents }}
          </div>
          <button
            class="btn btn-info mt-3"
            style="margin-left: 3em"
            @click="goUserChat(contract.coachID)"
          >
            チャット画面へ移動する
          </button>
          <button
            class="btn btn-info mt-3"
            style="margin-left: 3em"
            @click="goPostReview(contract.coachID)"
          >
            レビューを書く
          </button>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
import { userContractType } from '@/store/types'
export default {
  data: () => ({
    contractKeyword: '' as any,
    contracts: [] as Array<userContractType>,
    searchWord: '' as any,
  }),
  computed: {
    filteredContracts() {
      const cutoutContracts = [] as Array<userContractType>
      this.contracts.forEach((value) => {
        if (
          value.coachName.includes(this.contractKeyword) ||
          value.planName.includes(this.contractKeyword) ||
          value.contents.includes(this.contractKeyword)
        ) {
          cutoutContracts.push(value)
        }
      })
      return cutoutContracts
    },
  },
  created() {
    const db = firebase.firestore()
    const dbcontract = db
      .collection('users')
      .doc(this.$store.state.loginUserID)
      .collection('ContractCoach')
    dbcontract.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contractData = doc.data()
        const pushContract: userContractType = {
          coachName: contractData.CoachName,
          planName: contractData.PlanName,
          contents: contractData.PlanContents,
          coachID: contractData.CoachID,
        }
        this.contracts.push(pushContract)
      })
    })
  },
  methods: {
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    goPostReview(coachID: string) {
      this.$store.commit('getPostReview', coachID)
    },
    goUserChat(coachID: string) {
      this.$store.commit('getUserChat', coachID)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
