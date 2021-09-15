import { firestore } from "../../firebase/utils";

export const handleAddCategory = (category) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc()
      .set(category)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleUpdateCategory = (payload) => {
  console.log("handleUpdateCategory:", payload);
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc(payload.selCategoryId)
      .update({
        parent: payload.parent,
        categoryName: payload.categoryName,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchCategories = ({
  filterType,
  startAfterDoc,
  persistCategories = [],
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 100;

    let ref = firestore
      .collection("categories")
      .orderBy("createdDate")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistCategories,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteCategory = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchCategory = (categoryID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("categories")
      .doc(categoryID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: categoryID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
