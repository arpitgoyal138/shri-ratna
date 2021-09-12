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
export const handleUpdateProduct = (payload) => {
  console.log("handleUpdateProduct:", payload);
  const {
    productName,
    productDesc,
    productPrice,
    productThumbnail,
    productCategory,
    selProductId,
  } = payload;
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(selProductId)
      .update({
        productName,
        productDesc,
        productPrice,
        productThumbnail,
        productCategory,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;

    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snapshot) => {
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
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
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

/////////////////

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
