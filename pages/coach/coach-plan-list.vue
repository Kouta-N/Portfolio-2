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
    <!-- プラン一覧 -->
    <div class="text-center">
      <button class="btn btn-info mt-5">
        <nuxt-link to="/coach/coach-make-plan">プランの作成ページへ</nuxt-link>
      </button>
    </div>
    <div v-for="(plan, index) in plans" :key="plan.index">
      <div class="plan-display-box">
        プランナンバー
        <div class="plan-information-box">
          {{ index + 1 }}
        </div>
        プラン名 <br />
        <div class="plan-information-box">
          {{ plan.name }}
        </div>
        プラン内容 <br />
        <div class="plan-information-box">
          {{ plan.contents }}
        </div>
        プランレビュー <br />
        <div class="plan-information-box">
          {{ plan.review }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import firebase from '@/plugins/firebase'
import { makePlanType } from '~/store/types'
export default {
  data: () => ({
    plans: [] as Array<makePlanType>,
  }),
  created() {
    const db = firebase.firestore()
    const dbPlan = db
      .collection('coaches')
      .doc(this.$store.state.loginUserID)
      .collection('Plans')
    dbPlan.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const planData = doc.data()
        const pushPlan: makePlanType = {
          name: planData.PlanName,
          contents: planData.PlanContents,
          review: planData.PlanReview,
        }
        this.plans.push(pushPlan)
      })
    })
  },
  methods: {
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
