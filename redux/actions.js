import firebase from "firebase";
import { CATEGORIES_STATE_CHANGE, EXPENSES_STATE_CHANGE } from "./constants";

export function fetchExpensesFromCategories(categoryID) {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("categoriesData")
      .doc(categoryID)
      .collection("expenses")
      .get()
      .then((snapshot) => {
        let expenses = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: EXPENSES_STATE_CHANGE, expenses, categoryID });
      });
  };
}

export function fetchExpenses() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("categoriesData")
      .get()
      .then((snapshot) => {
        let categoriesData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: CATEGORIES_STATE_CHANGE, categoriesData });

        for (let i = 0; i < categoriesData.length; i++) {
          dispatch(fetchExpensesFromCategories(categoriesData[i].id));
        }
      });
  };
}
