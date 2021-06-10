import firebase from '@/plugins/firebase';
import 'firebase/storage';
import { VariablesType, StateType, ContractType } from '@/store/types';
const db = firebase.firestore();
/// /////////////////state////////////////////
export const state = () => ({
  age: '' as string,
  address: '' as string,
  coachSpecialty: '' as string,
  coachImage: '' as string,
  loginUserName: '' as string,
  loginUserMail: '' as string,
  loginUserPass: '' as string,
  loginUserID: '' as string,
  loginCoachID: '' as string,
  profile: '' as string,
  targetCoachID: '' as string,
  targetUserID: '' as string,
  searchText: '' as string,
  userNum: 0 as number,
  messages: [] as Array<string>,
  userContractID: '' as string,
  coachContractID: '' as string,
});
/// /////////////////getters////////////////////
export const getters = {
  getID: (state: StateType) => {
    return state.targetCoachID;
  },
  getName: (state: StateType) => {
    return state.loginUserName;
  },
  getImage: (state: StateType) => {
    return state.coachImage;
  },
  getMail: (state: StateType) => {
    return state.loginUserMail;
  },
  getProfile: (state: StateType) => {
    return state.profile;
  },
  getSpecialty: (state: StateType) => {
    return state.coachSpecialty;
  },
  getAge: (state: StateType) => {
    return state.age;
  },
  getAddress: (state: StateType) => {
    return state.address;
  },
  getTargetCoachID: (state: StateType) => {
    return state.targetCoachID;
  },
  getLoginUserID: (state: StateType) => {
    return state.loginUserID;
  },
  getSearchText: (state: StateType) => {
    return state.searchText;
  },
};
/// /////////////////mutations////////////////////
export const mutations = {
  getCoachID(state: StateType, { email, pass }: VariablesType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.targetCoachID = querySnapshot.docs[index].id;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('対象となるコーチが存在しません。');
      })
      .then(() => {
        this.$router.push('/user/user-coach-plan-list');
      });
  },
  changeSpecialty(state: StateType, { specialty, email, pass }: VariablesType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            db.collection('coaches').doc(state.loginUserID).update({
              CoachSpecialty: specialty,
            });
            state.coachSpecialty = specialty;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changeName(state: StateType, { name, email, pass, storage }: VariablesType) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            state.loginUserName = name;
            db.collection(storage).doc(state.loginUserID).update({
              Name: name,
            });
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
    db.collection(storage).doc(state.loginUserID).update({
      Name: name,
    });
  },
  changeImage(state: StateType, { image, email, pass }: VariablesType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            state.coachImage = image;
            db.collection('coaches').doc(state.loginUserID).update({
              CoachImage: image,
            });
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changeMail(
    state: StateType,
    { email, pass, newEmail, storage }: VariablesType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            let unsubscribe: any = firebase
              .auth()
              .onAuthStateChanged((user) => {
                if (user) {
                  user.updateEmail(newEmail);
                }
                unsubscribe();
              });
            state.loginUserID = querySnapshot.docs[index].id;
            state.loginUserMail = newEmail;
            db.collection(storage).doc(state.loginUserID).update({
              Email: newEmail,
            });
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changeProfile(
    state: StateType,
    { profile, email, pass, storage }: VariablesType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            db.collection(storage).doc(state.loginUserID).update({
              Profile: profile,
            });
            state.profile = profile;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changeAge(state: StateType, { age, email, pass, storage }: VariablesType) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            db.collection(storage).doc(state.loginUserID).update({
              Age: age,
            });
            state.age = age;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changeAddress(
    state: StateType,
    { address, email, pass, storage }: VariablesType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
            db.collection(storage).doc(state.loginUserID).update({
              Address: address,
            });
            state.address = address;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  changePass(
    state: StateType,
    { email, pass, newPass, storage }: VariablesType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            let unsubscribe: any = firebase
              .auth()
              .onAuthStateChanged((user) => {
                if (user) {
                  user.updatePassword(newPass);
                }
                unsubscribe();
              });
            state.loginUserID = querySnapshot.docs[index].id;
            db.collection(storage).doc(state.loginUserID).update({
              Password: newPass,
            });
            state.loginUserPass = newPass;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  makePlan(
    state: StateType,
    { email, pass, name, plan, contents }: VariablesType
  ) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginCoachID = querySnapshot.docs[index].id;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('プラン作成に失敗しました。');
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.loginCoachID)
          .collection('Plans')
          .add({
            CoachName: name,
            PlanName: plan,
            PlanContents: contents,
            PlanReview: 'レビューはまだありません。' as string,
            CoachID: state.loginCoachID,
          });
      })
      .catch((error) => {
        alert(error);
        throw new Error('プラン作成に失敗しました。');
      })
      .then(() => {
        this.$router.push('/coach/coach-make-finished');
      });
  },
  searchCoach(state: StateType, searchWord: string) {
    state.searchText = searchWord;
    this.$router.push('/user/user-coach-list');
  },
  contractCoach(
    state: StateType,
    { coachName, planName, contents }: ContractType
  ) {
    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .add({
        CoachID: state.targetCoachID,
        UserID: state.loginUserID,
        CoachName: coachName,
        PlanName: planName,
        PlanContents: contents,
        Messages: [] as Array<string>,
      })
      .catch((error) => {
        alert(error);
        throw new Error('コーチ依頼に失敗しました。');
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.targetCoachID)
          .collection('ContractUser')
          .add({
            UserID: state.loginUserID,
            CoachID: state.targetCoachID,
            UserName: state.loginUserName,
            UserProfile: state.profile,
            PlanName: planName,
            PlanContents: contents,
          });
      })
      .then(() => {
        db.collection('coaches')
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (querySnapshot.docs[index].id === state.targetCoachID) {
                state.userNum = querySnapshot.docs[index].data().GetUserNum;
                state.userNum += 1;
                db.collection('coaches')
                  .doc(state.targetCoachID)
                  .update({ GetUserNum: state.userNum });
              }
            });
          });
      })
      .catch((error) => {
        alert(error);
        throw new Error('コーチ依頼に失敗しました。');
      })
      .then(() => {
        this.$router.push('/user/user-plan-contracted');
      });
  },
  getPostReview(state: StateType, coachID: string) {
    state.targetCoachID = coachID;
    this.$router.push('/user/user-review');
  },
  postReview(state: StateType, review: string) {
    db.collection('coaches')
      .doc(state.targetCoachID)
      .collection('Plans')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.userContractID = querySnapshot.docs[index].id;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.targetCoachID)
          .collection('Plans')
          .doc(state.userContractID)
          .update({
            PlanReview: state.loginUserName + 'さんのレビュー : ' + review,
          });
      })
      .catch((error) => {
        alert(error);
        throw new Error('変更に失敗しました。');
      });
  },
  getUserChat(state: StateType, coachID: string) {
    state.targetCoachID = coachID;
    this.$router.push('/user/user-chat');
  },
  userChat(state: StateType, chatContents: Array<string>) {
    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.userContractID = querySnapshot.docs[index].id;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('対象となるコーチが存在しません。');
      })
      .then(() => {
        db.collection('users')
          .doc(state.loginUserID)
          .collection('ContractCoach')
          .doc(state.userContractID)
          .update({
            Messages: firebase.firestore.FieldValue.arrayUnion(
              ...[chatContents]
            ),
          });
      })
      .catch((error) => {
        alert(error);
        throw new Error('メッセージ投稿に失敗しました。');
      });
  },
  getCoachChat(state: StateType, userID: string) {
    state.targetUserID = userID;
    this.$router.push('/coach/coach-chat');
  },
  coachChat(state: StateType, chatContents: Array<string>) {
    db.collection('users')
      .doc(state.targetUserID)
      .collection('ContractCoach')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (querySnapshot.docs[index].data().CoachID === state.loginUserID) {
            state.coachContractID = querySnapshot.docs[index].id;
          }
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('対象となるユーザーが存在しません。');
      })
      .then(() => {
        db.collection('users')
          .doc(state.targetUserID)
          .collection('ContractCoach')
          .doc(state.coachContractID)
          .update({
            Messages: firebase.firestore.FieldValue.arrayUnion(
              ...[chatContents]
            ),
          });
      })
      .catch((error) => {
        alert(error);
        throw new Error('メッセージ投稿に失敗しました。');
      });
  },
  async getAccount(state: StateType, userInformation: VariablesType) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        userInformation.email,
        userInformation.pass
      )
      .catch((error) => {
        alert(error);
        throw new Error('アカウント登録失敗');
      })
      .then(() => {
        if (userInformation.storage === 'users') {
          db.collection('users').add({
            Name: userInformation.name,
            Email: userInformation.email,
            Password: userInformation.pass,
            Profile: '未登録',
            Age: '未登録',
            Address: '未登録',
          });
        } else {
          db.collection('coaches').add({
            Name: userInformation.name,
            Email: userInformation.email,
            Password: userInformation.pass,
            Profile: '未登録' as string,
            Age: '未登録' as string,
            Address: '未登録' as string,
            CoachImage: 'https://firebasestorage.googleapis.com/v0/b/yourcoach-21414.appspot.com/o/no_image.png?alt=media&token=ed66a82f-7412-44aa-9466-900e741da90e' as string,
            CoachSpecialty: '未登録' as string,
            GetUserNum: 0 as number,
          });
          state.coachImage =
            'https://firebasestorage.googleapis.com/v0/b/yourcoach-21414.appspot.com/o/no_image.png?alt=media&token=ed66a82f-7412-44aa-9466-900e741da90e';
          state.coachSpecialty = '未登録' as string;
        }
        db.collection(userInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  userInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  userInformation.pass
              ) {
                state.loginUserID = querySnapshot.docs[index].id;
                state.loginUserName = userInformation.name;
                state.loginUserMail = userInformation.email;
                state.loginUserPass = userInformation.pass;
                state.age = '未登録';
                state.address = '未登録';
                state.profile = '未登録';
              }
            });
          })
          .catch((error) => {
            alert(error);
          })
          .then(() => {
            if (userInformation.storage === 'users') {
              this.$router.push('/user/user-profile');
            } else {
              this.$router.push('/coach/coach-profile');
            }
          })
          .catch((error) => {
            alert(error);
          });
      });
  },
  async login(state: StateType, loginInformation: VariablesType) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginInformation.email, loginInformation.pass)
      .catch((error) => {
        alert(error);
        throw new Error('ログインに失敗しました。');
      })
      .then(() => {
        db.collection(loginInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  loginInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  loginInformation.pass
              ) {
                state.loginUserMail = loginInformation.email;
                state.loginUserPass = loginInformation.pass;
                state.loginUserID = querySnapshot.docs[index].id;
                state.loginUserName = querySnapshot.docs[index].data().Name;
                state.profile = querySnapshot.docs[index].data().Profile;
                state.age = querySnapshot.docs[index].data().Age;
                state.address = querySnapshot.docs[index].data().Address;
                if (loginInformation.storage === 'coaches') {
                  state.coachImage = querySnapshot.docs[
                    index
                  ].data().CoachImage;
                  state.coachSpecialty = querySnapshot.docs[
                    index
                  ].data().CoachSpecialty;
                }
              }
            });
          })
          .catch((error) => {
            alert(error);
            throw new Error('ログインに失敗しました。');
          });
      })
      .then(() => {
        if (loginInformation.storage === 'users') {
          this.$router.push('/user/user-profile');
        } else {
          this.$router.push('/coach/coach-profile');
        }
      });
  },
  async deleteAccount(state: StateType, deleteInformation: VariablesType) {
    await db
      .collection(deleteInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              deleteInformation.email &&
            querySnapshot.docs[index].data().Password === deleteInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id;
          }
        });
      })
      .then(() => {
        db.collection(deleteInformation.storage)
          .doc(state.loginUserID)
          .delete();
      })
      .then(() => {
        let unsubscribe: any = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            user.delete();
          }
          unsubscribe();
        });
      })
      .catch((error) => {
        alert(error);
        throw new Error('アカウント削除に失敗しました。');
      })
      .then(() => {
        this.$router.push('/user/user-deleted');
      });
  },
  async logout() {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        alert(error);
      })
      .then(() => {
        this.$router.push('/');
      });
  },
};
////////////////////actions////////////////////
export const actions = {
  getAccount({ commit }, { name, email, pass, storage }: VariablesType) {
    const userInformation = { name, email, pass, storage };
    commit('getAccount', userInformation);
  },
  login({ commit }, { email, pass, storage }: VariablesType) {
    const loginInformation = { email, pass, storage };
    commit('login', loginInformation);
  },
  logout({ commit }) {
    commit('logout');
  },
  deleteAccount({ commit }, { email, pass, storage }) {
    const deleteInformation = {
      email,
      pass,
      storage,
    };
    commit('deleteAccount', deleteInformation);
  },
};
