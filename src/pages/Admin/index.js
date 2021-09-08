import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "./../../redux/products/product.actions";
import Modal from "./../../components/modal";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Button from "./../../components/forms/Button";
import LoadMore from "./../../components/loadMore";
// import CKEditor from "ckeditor4-react";
import "./styles.scss";
import { Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState("");

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("mens");
    setProductName("");
    setProductThumbnail("");
    setProductPrice(0);
    setProductDesc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productDesc,
      })
    );
    resetForm();
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

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              <AddIcon
                style={{
                  verticalAlign: "middle",
                  marginTop: "-3px",
                  marginRight: "5px",
                }}
              />
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

            <FormSelect
              label="Category"
              options={[
                {
                  value: "mens",
                  name: "Mens",
                },
                {
                  value: "womens",
                  name: "Womens",
                },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={(e) => setProductName(e.target.value)}
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
            />

            {/* <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            /> */}

            <br />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
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
                  <tr class="table_heading">
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
                          createdDate,
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
                            <td>{productCategory}</td>
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
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
