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
        ><span style="font-size: 1.5em">プラン検索ワード</span></label
      >
      <div class="input-form">
        <input
          v-model="planKeyword"
          type="text"
          class="form-control"
          placeholder="検索ワード"
        />
      </div>
    </div>
    <br />
    <!-- プラン一覧 -->
    <div v-for="plan in filteredPlans" :key="plan.index">
      <div
        class="card"
        style="
          max-width: 50%;
          margin: 3em auto;
          box-shadow: 0 0 0.2em 0 grey;
          border-radius: 0.4em;
        "
      >
        <div class="row no-gutters">
          <div class="card-body" style="margin: 1em 1em 1em 1em">
            <h5 class="card-title">コーチの氏名</h5>
            <div class="profile-box2">
              {{ plan.coachName }}
            </div>
            プラン名 <br />
            <div class="profile-box2">
              {{ plan.name }}
            </div>
            プラン内容 <br />
            <div class="profile-box2">
              {{ plan.contents }}
            </div>
            プランレビュー <br />
            <div class="profile-box2">
              {{ plan.review }}
            </div>
            <button
              class="btn btn-success mt-3"
              @click="doContract(plan.coachName, plan.name, plan.contents)"
            >
              コーチを依頼する
            </button>
            <nuxt-link to="/user/user-coach-list">
              <button class="btn btn-info mt-3" style="margin-left: 2em">
                戻る
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import firebase from '@/plugins/firebase'
import { planType } from '@/store/types'
export default {
  data: () => ({
    planKeyword: '' as any,
    plans: [] as Array<planType>,
    searchWord: '' as any,
  }),
  computed: {
    filteredPlans() {
      const cutoutPlans = [] as Array<planType>
      this.plans.forEach((value) => {
        if (
          value.coachName.includes(this.planKeyword) ||
          value.name.includes(this.planKeyword) ||
          value.contents.includes(this.planKeyword) ||
          value.review.includes(this.planKeyword)
        ) {
          cutoutPlans.push(value)
        }
      })
      return cutoutPlans
    },
  },
  created() {
    const db = firebase.firestore()
    const dbPlan = db
      .collection('coaches')
      .doc(this.$store.state.targetCoachID)
      .collection('Plans')
    dbPlan.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const planData = doc.data()
        const pushPlan: planType = {
          coachName: planData.CoachName,
          name: planData.PlanName,
          contents: planData.PlanContents,
          review: planData.PlanReview,
        }
        this.plans.push(pushPlan)
      })
    })
  },
  methods: {
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    doContract(cName: string, pName: string, pContents: string) {
      this.$store.commit('contractCoach', {
        coachName: cName,
        planName: pName,
        contents: pContents,
      })
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
