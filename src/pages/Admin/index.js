// React Libraries
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import {
  addProductStart,
  updateProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/products/product.actions";
import {
  addCategoryStart,
  fetchCategoriesStart,
} from "./../../redux/categories/category.actions";

// Components
import Modal from "./../../components/modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/loadMore";
import FileUpload from "../../components/forms/FileUpload";
import { CKEditor } from "ckeditor4-react";

import "./styles.scss";

// Material UI
import { Divider, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Paper } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// Firebase
import { storage } from "../../firebase/utils";

// Schemas
import { productSchema } from "../../components/schemas/product";

// Assets
import AddProductImage from "./../../assets/images/placeholders/add-product.jpg";

// Image Libraries
import Compress from "compress.js";

const compress = new Compress();
const mapState = ({ productsData, categoriesData }) => ({
  products: productsData.products,
  categories: categoriesData.categories,
});

const Admin = (props) => {
  const { products, categories } = useSelector(mapState);
  const dispatch = useDispatch();
  // States
  const [hideAddProductModal, setHideAddProductModal] = useState(true);
  const [hideAddCategoryModal, setHideAddCategoryModal] = useState(true);
  const [product, setProduct] = useState(productSchema);
  const [categoryName, setCategoryName] = useState("");
  const [parent, setParent] = useState({
    id: "",
    name: "",
  });
  const [selProductId, setSelProductId] = useState("");
  const [selAction, setSelAction] = useState("");
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [childCategories, setChildCategories] = useState([]);
  const [selCategories, setSelCategories] = useState([]);
  const { data, queryDoc, isLastPage } = products;
  const limitPageSize = 10;

  useEffect(() => {
    dispatch(fetchProductsStart({ pageSize: limitPageSize }));
    dispatch(fetchCategoriesStart());
  }, []);

  const handleImageChange = (e) => {
    setProgress(0);
    const upImage = e.target.files[0];
    if (upImage) {
      console.log("image:", upImage);
      setImage(upImage);

      compress
        .compress([...e.target.files], {
          size: 10, // the max size in MB, defaults to 2MB
          quality: 0.75, // the quality of the image, max is 1,
          maxWidth: 900, // the max width of the output image, defaults to 1920px
          maxHeight: 900, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
          rotate: true, // Enables rotation, defaults to false
        })
        .then((img_data) => {
          // returns an array of compressed images
          console.log("img_data:", img_data);
          setImageData((prevState) => {
            if (prevState) {
              return [...prevState, ...img_data];
            } else {
              return img_data;
            }
          });

          ///// Convert base64 to file /////////
          const img_ = img_data[0];
          const fileName = img_.alt;
          const base64str = img_.data;
          const imgExt = img_.ext;
          const file = Compress.convertBase64ToFile(base64str, imgExt);
          handleFileUpload({
            path: "images/products/",
            file,
            fileName,
          });
        });
    }
  };
  const handleFileUpload = ({ path, file, fileName }) => {
    console.log("path:", path, " file:", file);
    const uploadTask = storage.ref(`${path}/${fileName}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log("file upload error:", error.message);
      },
      () => {
        storage
          .ref(`${path}`)
          .child(fileName)
          .getDownloadURL()
          .then((fileUrl) => {
            console.log("url:", fileUrl);
            setProduct((prevState) => ({
              ...prevState,
              productImages: [
                ...prevState.productImages,
                { name: fileName, url: fileUrl },
              ],
            }));
          });
      }
    );
  };
  const handleDeleteFile = (index, fileName) => {
    console.log("delete file:", index);
    const tempImageData = [...imageData];
    tempImageData.splice(index, 1);
    setImageData(tempImageData);
    storage
      .ref(`images/products/`)
      .child(fileName)
      .delete()
      .then(() => {
        console.log("deleted successfully");
        // Delete url from product
        setProduct((prevState) => ({
          ...prevState,
          productImages: prevState.productImages.filter(
            (state) => state.name !== fileName
          ),
        }));
      })
      .catch((err) => {
        console.log("delete err:", err.message);
      });
  };
  const toggleAddProductModal = (action, currentProduct, documentID) => {
    if (action === "edit") {
      setSelAction(action);
      resetAddProductForm();
      setSelProductId(documentID);
      setProduct({ ...currentProduct });
    }
    if (action === "add") {
      setSelAction(action);
    }
    if (selAction === "edit" && action === undefined) {
      resetAddProductForm();
    }
    setHideAddProductModal(!hideAddProductModal);
  };
  const toggleAddCategoryModal = () => {
    setHideAddCategoryModal(!hideAddCategoryModal);
  };
  const configAddProductModal = {
    hideModal: hideAddProductModal,
    toggleModal: toggleAddProductModal,
  };
  const configAddCategoryModal = {
    hideModal: hideAddCategoryModal,
    toggleModal: toggleAddCategoryModal,
  };

  const resetAddProductForm = () => {
    setHideAddProductModal(true);
    setSelProductId("");
    setProduct(productSchema);
    setChildCategories([]);
    setSelCategories([]);
    setImageData([]);
  };
  const resetAddCategoryForm = () => {
    setHideAddCategoryModal(true);
    setParent({ id: "", name: "" });
    setCategoryName("");
  };
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (selAction === "edit") {
      //
      if (product.productCategory.id !== "") {
        dispatch(
          updateProductStart(
            {
              ...product,
            },
            selProductId
          )
        );
        resetAddProductForm();
      } else {
        window.alert("Please select category");
        return;
      }
    } else {
      if (product.productCategory.id !== "") {
        dispatch(
          addProductStart({
            ...product,
          })
        );
        resetAddProductForm();
      } else {
        window.alert("Please select category");
        return;
      }
    }
  };
  const handleVisibility = (visibility, documentID) => {
    console.log("visibility: ", visibility, " docId:", documentID);
    dispatch(
      updateProductStart(
        {
          productVisible: visibility,
        },
        documentID
      )
    );
  };
  const handleAddCategorySubmit = (e) => {
    e.preventDefault();

    dispatch(
      addCategoryStart({
        parent,
        categoryName,
      })
    );
    resetAddCategoryForm();
  };
  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        pageSize: limitPageSize,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };
  console.log("products:", products);
  const handleCategoryChange = (e, lvl) => {
    let index = e.nativeEvent.target.selectedIndex;
    const tempChildCategories = [...childCategories];
    tempChildCategories.splice(lvl + 1);
    setChildCategories(tempChildCategories);
    const tempSelCategories = [...selCategories];

    tempSelCategories.splice(lvl + 1);

    setSelCategories(tempSelCategories);

    if (e.target.value !== "") {
      setSelCategories((prevState) => {
        if (prevState) {
          return [...prevState, e.target.value];
        } else {
          return [e.target.value];
        }
      });
      getChildCategories(e.target.value, e.target[index].text, lvl);
    } else {
      setProduct((prevState) => ({
        ...prevState,
        productCategory: { id: "", name: "" },
      }));
    }
  };
  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  let categoriesArr = [];
  let parentCategories = [];
  let childCategoriesArr = [];
  Array.isArray(categories.data) &&
    categories.data.length > 0 &&
    categories.data.map((category, index) => {
      if (!category.parent || category.parent.id === "") {
        parentCategories.push({
          value: category.documentID,
          name: category.categoryName,
        });
      }
      categoriesArr[index] = {
        name: category.categoryName,
        value: category.documentID,
      };
      return 0;
    });

  const getChildCategories = (id, name, level) => {
    Array.isArray(categories.data) &&
      categories.data.length > 0 &&
      categories.data.map((category, index) => {
        if (category.parent && category.parent.id === id) {
          childCategoriesArr.push({
            value: category.documentID,
            name: category.categoryName,
          });
        }
        return 0;
      });
    if (childCategoriesArr.length !== 0) {
      setChildCategories((prevState) => {
        if (prevState) {
          return [...prevState, childCategoriesArr];
        } else {
          return [childCategoriesArr];
        }
      });
      setProduct((prevState) => ({
        ...prevState,
        productCategory: { id: "", name: "" },
      }));
    } else {
      setProduct((prevState) => ({
        ...prevState,
        productCategory: {
          id,
          name,
        },
      }));
    }
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          {Array.isArray(categories.data) && categories.data.length > 0 && (
            <li>
              <Button onClick={() => toggleAddProductModal("add")}>
                <AddIcon className="add-icon" />
                New product
              </Button>
            </li>
          )}
          <li>
            <Button onClick={() => toggleAddCategoryModal()}>
              <AddIcon className="add-icon" />
              New category
              {/* ({Array.isArray(categories.data) && categories.data.length}) */}
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configAddProductModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleAddProductSubmit}>
            {selAction === "add" && <h2>Add new product</h2>}
            {selAction === "edit" && <h2>Edit product</h2>}
            <Divider />
            <FormSelect
              label="Category"
              options={[
                {
                  name: "- Select category",
                  value: "",
                },
                ...parentCategories,
              ]}
              required={selAction === "add" ? true : false}
              handleChange={(e) => handleCategoryChange(e, -1)}
            />
            {childCategories &&
              childCategories.length > 0 &&
              childCategories.map((category, index) => {
                return (
                  <FormSelect
                    label="Sub category"
                    defaultValue={
                      selCategories[index + 1]
                        ? selCategories[index + 1].value
                        : ""
                    }
                    options={[
                      {
                        name: "- Select sub category",
                        value: "",
                      },
                      ...category,
                    ]}
                    required
                    handleChange={(e) => handleCategoryChange(e, index)}
                    key={index}
                  />
                );
              })}
            <FormInput
              label="Title"
              type="text"
              value={product.productName}
              handleChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  productName: e.target.value,
                }))
              }
              required
            />

            <FormInput
              label="Price"
              type="number"
              min="1"
              max="10000000"
              step="1"
              value={product.productPrice}
              handleChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  productPrice: e.target.value,
                }))
              }
              required
            />
            {selAction === "add" &&
              imageData.map((img, index) => {
                return (
                  <label className="uploaded-product" key={index}>
                    <Paper
                      style={{
                        backgroundImage: `url(${img.prefix}${img.data})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Tooltip title="Delete">
                        <IconButton
                          className="action-button"
                          aria-label="delete"
                          onClick={() => {
                            if (window.confirm("Sure to delete?"))
                              handleDeleteFile(index, img.alt);
                          }}
                        >
                          <DeleteIcon className="action-icons delete-icon" />
                        </IconButton>
                      </Tooltip>
                    </Paper>
                  </label>
                );
              })}

            {selAction === "edit" &&
              product.productImages.map((img, index) => {
                return (
                  <label className="uploaded-product" key={index}>
                    <Paper
                      style={{
                        backgroundImage: `url(${img.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Tooltip title="Delete">
                        <IconButton
                          className="action-button"
                          aria-label="delete"
                          onClick={() => {
                            if (window.confirm("Sure to delete?"))
                              handleDeleteFile(index, img.name);
                          }}
                        >
                          <DeleteIcon className="action-icons delete-icon" />
                        </IconButton>
                      </Tooltip>
                    </Paper>
                  </label>
                );
              })}

            <FileUpload
              handleChange={handleImageChange}
              // bgImageSrc="https://via.placeholder.com/150"
              bgImageSrc={AddProductImage}
              upProgress={progress}
            />

            <h3>Product details</h3>
            <CKEditor
              initData={product.productDesc}
              onChange={(evt) =>
                setProduct((prevState) => ({
                  ...prevState,
                  productDesc: evt.editor.getData(),
                }))
              }
            />
            <br />
            {selAction === "add" && <Button type="submit">Add product</Button>}
            {selAction === "edit" && (
              <Button type="submit">Update product</Button>
            )}
          </form>
        </div>
      </Modal>

      <Modal {...configAddCategoryModal}>
        <div className="addNewCategoryForm">
          <form onSubmit={handleAddCategorySubmit}>
            <h2>Add new category</h2>
            <Divider />
            {Array.isArray(categories.data) && categories.data.length > 0 && (
              <FormSelect
                label="Parent Category (if any)"
                options={[
                  {
                    value: "",
                    name: "- Select Parent",
                  },
                  ...categoriesArr,
                ]}
                handleChange={(e) => {
                  let index = e.nativeEvent.target.selectedIndex;
                  if (e.target.value !== "") {
                    setParent({
                      id: e.target.value,
                      name: e.target[index].text,
                    });
                  } else {
                    setParent({
                      id: "",
                      name: "",
                    });
                  }
                }}
              />
            )}

            <FormInput
              label="Name"
              type="text"
              value={categoryName}
              handleChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <br />

            <Button type="submit">Add category</Button>
          </form>
        </div>
      </Modal>

      {Array.isArray(data) && data.length > 0 && (
        <div className="itemsPanel">
          <table border="0" cellPadding="10" cellSpacing="10">
            <tbody>
              <tr>
                <th>
                  <h1>Manage Products</h1>
                </th>
              </tr>

              <tr>
                <td>
                  <table
                    className="results"
                    border="0"
                    cellPadding="10"
                    cellSpacing="0"
                  >
                    <tbody className="table_data">
                      <tr className="table_heading">
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        {/* <th>Created at</th> */}
                        <th></th>
                      </tr>
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((item, index) => {
                          const {
                            productName,
                            productImages,
                            productPrice,
                            documentID,
                            // createdDate,
                            productCategory,
                            productVisible,
                          } = item;

                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  className="thumb"
                                  src={
                                    productImages.length > 0
                                      ? productImages[0].url
                                      : "https://via.placeholder.com/150"
                                  }
                                  alt="product"
                                />
                              </td>
                              <td>{productName}</td>
                              <td>{productCategory.name}</td>
                              <td>Rs. {productPrice}</td>
                              {/* <td>
                              {createdDate.toDate().toDateString()}{" "}
                              {createdDate.toDate().toLocaleTimeString()}
                            </td> */}

                              <td>
                                <Tooltip
                                  title={
                                    productVisible
                                      ? "Hide the product from website"
                                      : "Show the product on website"
                                  }
                                  aria-label="Visibility"
                                >
                                  <IconButton
                                    className="action-button"
                                    aria-label="Visibility"
                                    onClick={(e) => {
                                      const str = productVisible
                                        ? "Hide the product " +
                                          productName +
                                          " from website ?"
                                        : "Show the product " +
                                          productName +
                                          " on website?";
                                      if (window.confirm(str))
                                        handleVisibility(
                                          !productVisible,
                                          documentID
                                        );
                                    }}
                                  >
                                    {productVisible && (
                                      <VisibilityIcon className="action-icons eye-icon" />
                                    )}
                                    {!productVisible && (
                                      <VisibilityOffIcon className="action-icons eye-icon" />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit product" aria-label="edit">
                                  <IconButton
                                    className="action-button"
                                    aria-label="edit"
                                    onClick={() =>
                                      toggleAddProductModal(
                                        "edit",
                                        item,
                                        documentID
                                      )
                                    }
                                  >
                                    <EditIcon className="action-icons edit-icon" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    className="action-button"
                                    aria-label="delete"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Sure to delete product " +
                                            productName +
                                            " ?"
                                        )
                                      )
                                        dispatch(
                                          deleteProductStart(documentID)
                                        );
                                    }}
                                  >
                                    <DeleteIcon className="action-icons delete-icon" />
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td>
                          {!isLastPage && <LoadMore {...configLoadMore} />}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
