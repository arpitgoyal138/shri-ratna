import { firestore } from "../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleUpdateProduct = ({ payload, documentID }) => {
  // console.log("handleUpdateProduct: ID=", documentID, " payload:", payload);
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .update(payload)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchProducts = ({
  pageSize,
  filterType,
  visibility,
  startAfterDoc,
  persistProducts = [],
}) => {
  console.log("visibility: ", visibility);
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("products")
      .orderBy("createdDate", "desc")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory.name", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    ref.onSnapshot((snapshot) => {
      const totalCount = snapshot.size;
      const data = [
        ...persistProducts,
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
        isLastPage: totalCount < pageSize,
      });
    });
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
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

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
