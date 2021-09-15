import React from "react";
import "./styles.scss";
import { Paper } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { CircularProgressWithLabel } from "./../../ProgressBar";

const FileUpload = ({
  handleChange,
  label,
  bgImageSrc,
  upProgress,
  ...otherProps
}) => {
  const isUploading = upProgress !== 100 && upProgress !== 0;
  return (
    <label
      className={
        isUploading ? "custom-file-upload uploading" : "custom-file-upload"
      }
    >
      {!isUploading && <input type="file" onChange={handleChange} />}
      <Paper
        style={{
          backgroundImage: `url(${bgImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {isUploading && <CircularProgressWithLabel value={upProgress} />}
        {!isUploading && (
          <AddCircleOutlineIcon className="add-icon placeholder" />
        )}
      </Paper>
    </label>
    // </div>
  );
};

export default FileUpload;
