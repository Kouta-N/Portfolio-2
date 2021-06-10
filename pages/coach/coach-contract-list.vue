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
    <!-- 検索ボックス -->
    <br />
    <div class="coach-search-box">
      <label class="form-label"
        ><span style="font-size: 1.5em">ユーザー検索ワード</span></label
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
          <h5 class="card-title">ユーザーの氏名</h5>
          <div class="profile-box2">
            {{ contract.userName }}
          </div>
          ユーザープロフィール <br />
          <div class="profile-box2">
            {{ contract.userProfile }}
          </div>
          プラン名 <br />
          <div class="profile-box2">
            {{ contract.planName }}
          </div>
          プラン内容 <br />
          <div class="profile-box2">
            {{ contract.contents }}
          </div>
          <br />
          <button
            class="btn btn-info mt-3"
            style="margin-left: 3em"
            @click="goCoachChat(contract.userID)"
          >
            チャット画面へ移動する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
import { coachContractType } from '@/store/types'
export default {
  data: () => ({
    contractKeyword: '' as any,
    contracts: [] as Array<coachContractType>,
    searchWord: '' as any,
  }),
  computed: {
    filteredContracts() {
      const cutoutContracts = [] as Array<coachContractType>
      this.contracts.forEach((value) => {
        if (
          value.contents.includes(this.contractKeyword) ||
          value.planName.includes(this.contractKeyword) ||
          value.userName.includes(this.contractKeyword) ||
          value.userProfile.includes(this.contractKeyword)
        ) {
          cutoutContracts.push(value)
        }
      })
      return cutoutContracts
    },
  },
  created() {
    const db = firebase.firestore()
    const dbContract = db
      .collection('coaches')
      .doc(this.$store.state.loginUserID)
      .collection('ContractUser')
    dbContract.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contractData = doc.data()
        const pushContract: coachContractType = {
          userName: contractData.UserName,
          userProfile: contractData.UserProfile,
          planName: contractData.PlanName,
          contents: contractData.PlanContents,
          userID: contractData.UserID,
        }
        this.contracts.push(pushContract)
      })
    })
  },
  methods: {
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
    goCoachChat(userID: string) {
      this.$store.commit('getCoachChat', userID)
    },
  },
}
</script>
