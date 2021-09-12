import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  updateProductStart,
  fetchProductsStart,
  deleteProductStart,
  addCategoryStart,
  fetchCategoriesStart,
} from "./../../redux/products/product.actions";
import Modal from "./../../components/modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/loadMore";
import { CKEditor } from "ckeditor4-react";
import "./styles.scss";
import { Divider, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

const mapState = ({ productsData }) => ({
  products: productsData.products,
  categories: productsData.categories,
});

const Admin = (props) => {
  const { products, categories } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideAddProductModal, setHideAddProductModal] = useState(true);
  const [hideAddCategoryModal, setHideAddCategoryModal] = useState(true);
  const [productCategory, setProductCategory] = useState({
    id: "",
    name: "",
  });
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [parent, setParent] = useState({
    id: "",
    name: "",
  });
  const [selProductId, setSelProductId] = useState("");
  const [selAction, setSelAction] = useState("");
  const { data, queryDoc, isLastPage } = products;
  useEffect(() => {
    dispatch(fetchProductsStart());
    dispatch(fetchCategoriesStart());
  }, []);

  const toggleAddProductModal = (action, currentProduct, documentID) => {
    console.log("currentProduct:", currentProduct);
    setSelAction(action);
    if (action === "edit") {
      setSelProductId(documentID);
      setProductName(currentProduct.productName);
      setProductPrice(currentProduct.productPrice);
      setProductThumbnail(currentProduct.productThumbnail);
      setProductDesc(currentProduct.productDesc);
      setProductCategory(currentProduct.productCategory);
    } else {
      resetAddProductForm();
    }
    setHideAddProductModal(!hideAddProductModal);
  };

  const configAddProductModal = {
    hideModal: hideAddProductModal,
    toggleModal: toggleAddProductModal,
  };

  const toggleAddCategoryModal = () =>
    setHideAddCategoryModal(!hideAddCategoryModal);

  const configAddCategoryModal = {
    hideModal: hideAddCategoryModal,
    toggleModal: toggleAddCategoryModal,
  };

  const resetAddProductForm = () => {
    setHideAddProductModal(true);
    setProductCategory({ id: "", name: "" });
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
    setSelProductId("");
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
      dispatch(
        updateProductStart({
          productCategory,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
          selProductId,
        })
      );
    } else {
      dispatch(
        addProductStart({
          productCategory,
          productName,
          productThumbnail,
          productPrice,
          productDesc,
        })
      );
    }

    resetAddProductForm();
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
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  let categoriesArr = [];

  Array.isArray(categories.data) &&
    categories.data.length > 0 &&
    categories.data.map((category, index) => {
      categoriesArr[index] = {
        name: category.categoryName,
        value: category.documentID,
      };
      return 0;
    });
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
              defaultValue={productCategory.id}
              options={[
                {
                  name: "- Select Category",
                  value: "",
                },
                ...categoriesArr,
              ]}
              required
              handleChange={(e) => {
                let index = e.nativeEvent.target.selectedIndex;
                if (e.target.value !== "") {
                  setProductCategory({
                    id: e.target.value,
                    name: e.target[index].text,
                  });
                } else {
                  setProductCategory({
                    id: "",
                    name: "",
                  });
                }
              }}
            />
            <FormInput
              label="Title"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
              required
            />
            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
              required
            />
            <h3>Product details</h3>
            <CKEditor
              initData={productDesc}
              onChange={(evt) => setProductDesc(evt.editor.getData())}
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
                    <tr className="table_heading">
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      {/* <th>Created at</th> */}
                      <th>Actions</th>
                    </tr>
                    <tbody>
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((product, index) => {
                          const {
                            productName,
                            productThumbnail,
                            productPrice,
                            documentID,
                            // createdDate,
                            productCategory,
                          } = product;

                          return (
                            <tr key={index}>
                              <td>
                                <img
                                  className="thumb"
                                  src={productThumbnail}
                                  alt="product thumbnail"
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
                                  title="Hide the product from website"
                                  aria-label="Visibility"
                                >
                                  <IconButton
                                    className="action-button"
                                    aria-label="Visibility"
                                  >
                                    <VisibilityIcon className="action-icons eye-icon" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit product" aria-label="edit">
                                  <IconButton
                                    className="action-button"
                                    aria-label="edit"
                                    onClick={() =>
                                      toggleAddProductModal(
                                        "edit",
                                        product,
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
                                  >
                                    <DeleteIcon
                                      className="action-icons delete-icon"
                                      onClick={() =>
                                        dispatch(deleteProductStart(documentID))
                                      }
                                    />
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
