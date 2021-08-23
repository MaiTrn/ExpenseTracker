import firebase from "firebase";
import { CATEGORIES_STATE_CHANGE, EXPENSES_STATE_CHANGE } from "./constants";

const currentDate = new Date();
export function fetchExpensesFromUsers(categoryID) {
  let expensesList = [];
  return (dispatch) => {
    firebase
      .firestore()
      .collection("usersData")
      .doc(firebase.auth().currentUser.uid)
      .collection("expensesData")
      .doc(categoryID)
      .collection("expenses")
      .where("status", "==", "C")
      .where("creation.month", "==", currentDate.getMonth() + 1)
      .where("creation.year", "==", currentDate.getFullYear())
      .get()
      .then((snapshot) => {
        let expenses = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        expensesList = expenses;
      });
    firebase
      .firestore()
      .collection("usersData")
      .doc(firebase.auth().currentUser.uid)
      .collection("expensesData")
      .doc(categoryID)
      .collection("expenses")
      .where("status", "==", "P")
      .get()
      .then((snapshot) => {
        let expenses = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        for (let i = 0; i < expenses.length; i++) {
          expensesList.push(expenses[i]);
        }
        dispatch({
          type: EXPENSES_STATE_CHANGE,
          expenses: expensesList,
          categoryID,
        });
      });
  };
}

export function fetchCategories() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("categoriesData")
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        let categoriesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: CATEGORIES_STATE_CHANGE, categoriesData });
        for (let i = 0; i < categoriesData.length; i++) {
          dispatch(fetchExpensesFromUsers(categoriesData[i].id));
        }
      });
  };
}

//get last month's total amount
// export function getLastMonthExpenses() {
//   let totalLastMonth = 0;
//   if (currentDate.getMonth() + 1 == 1) {
//     return (dispatch) => {
//       firebase
//         .firestore()
//         .collection("usersData")
//         .where("creation.month", "==", 12)
//         .get()
//         .then((snapshot) => {
//           let categoriesData = snapshot.docs.map((doc) => {
//             const data = doc.data();
//             const id = doc.id;
//             return { id, ...data };
//           });
//           for (let i = 0; i < categoriesData.length; i++) {
//             totalLastMonth += snapshot.docs[i];
//           }
//         });
//     };
//   }
// }
