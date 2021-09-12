import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryStart,
  addCategoryStart,
  fetchCategoriesStart,
  updateCategoryStart,
} from "../../redux/products/product.actions";
import Modal from "../modal";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import Button from "../forms/Button";
import LoadMore from "../loadMore";
import "../../pages/Admin/styles.scss";
import { Divider, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";

const mapState = ({ productsData }) => ({
  categories: productsData.categories,
});

const ProductCategories = () => {
  const { categories } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideAddCategoryModal, setHideAddCategoryModal] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [parent, setParent] = useState({ id: "", name: "" });
  const [selAction, setSelAction] = useState("add");
  const [selCategoryId, setSelCategoryId] = useState("");
  const { data, queryDoc, isLastPage } = categories;

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  const toggleAddCategoryModal = (
    action,
    currentParent,
    documentID,
    currentCategory
  ) => {
    setSelAction(action);
    if (action === "edit") {
      setCategoryName(currentCategory);
      setParent(currentParent);
      setSelCategoryId(documentID);
    } else {
      resetAddCategoryForm();
    }
    setHideAddCategoryModal(!hideAddCategoryModal);

    //
  };

  const configAddCategoryModal = {
    hideModal: hideAddCategoryModal,
    toggleModal: toggleAddCategoryModal,
  };
  const resetAddCategoryForm = () => {
    setHideAddCategoryModal(true);
    setParent({ id: "", name: "" });
    setCategoryName("");
    setSelCategoryId("");
  };
  const handleActionOnCategorySubmit = (e) => {
    e.preventDefault();
    if (selAction === "add") {
      dispatch(
        addCategoryStart({
          parent,
          categoryName,
        })
      );
    } else {
      dispatch(
        updateCategoryStart({
          selCategoryId,
          parent,
          categoryName,
        })
      );
    }
    resetAddCategoryForm();
  };
  const handleLoadMore = () => {
    dispatch(
      fetchCategoriesStart({
        startAfterDoc: queryDoc,
        persistCategories: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };
  let categoriesArr = [];

  Array.isArray(data) &&
    data.length > 0 &&
    data.map((category, index) => {
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
          <li>
            <Button onClick={() => toggleAddCategoryModal("add")}>
              <AddIcon className="add-icon" />
              New category
              {/* ({Array.isArray(data) && data.length}) */}
            </Button>
          </li>
        </ul>
        {}
      </div>

      <Modal {...configAddCategoryModal}>
        <div className="addNewCategoryForm">
          <form onSubmit={handleActionOnCategorySubmit}>
            <h2>Add new category</h2>
            <Divider />
            {Array.isArray(data) && data.length > 0 && (
              <FormSelect
                defaultValue={parent.id}
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

            {selAction === "add" && <Button type="submit">Add category</Button>}
            {selAction === "edit" && (
              <Button type="submit">Update category</Button>
            )}
          </form>
        </div>
      </Modal>

      {Array.isArray(data) && data.length > 0 && (
        <div className="itemsPanel">
          <table border="0" cellPadding="10" cellSpacing="10">
            <tbody>
              <tr>
                <th>
                  <h1>Manage Categories</h1>
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
                      <th>Title</th>
                      <th>Parent Category</th>
                      {/* <th>Created at</th> */}
                      <th>Actions</th>
                    </tr>
                    <tbody>
                      {Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((category, index) => {
                          const {
                            categoryName,
                            documentID,
                            // createdDate,
                            parent,
                          } = category;

                          return (
                            <tr key={index}>
                              <td>{categoryName}</td>
                              <td>{parent.name}</td>
                              {/* <td>
                              {createdDate.toDate().toDateString()}{" "}
                              {createdDate.toDate().toLocaleTimeString()}
                            </td> */}

                              <td>
                                <Tooltip
                                  title="Hide the category from website"
                                  aria-label="Visibility"
                                >
                                  <IconButton
                                    className="action-button"
                                    aria-label="Visibility"
                                  >
                                    <VisibilityIcon className="action-icons eye-icon" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip
                                  title="Edit category"
                                  aria-label="edit"
                                >
                                  <IconButton
                                    className="action-button"
                                    aria-label="edit"
                                  >
                                    <EditIcon
                                      className="action-icons edit-icon"
                                      onClick={() =>
                                        toggleAddCategoryModal(
                                          "edit",
                                          parent,
                                          documentID,
                                          categoryName
                                        )
                                      }
                                    />
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
                                        dispatch(
                                          deleteCategoryStart(documentID)
                                        )
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

export default ProductCategories;
