import React from "react";

const ProfileImg = ({ src, onChange, edit }) => {
  return (
    <>
      <label
        htmlFor="photo-upload"
        style={{
          borderRadius: "50%",
          display: "inline-block",
          cursor: "pointer",
          border: "5px solid #bd9c29",
          marginBottom: "25px",
        }}
      >
        <div
          className="img-wrap img-upload"
          style={{
            height: "200px",
            width: "200px",
            overflow: "hidden",
            borderRadius: "100%",
          }}
        >
          <img
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            for="photo-upload"
            src={
              src ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt={"profile"}
          />
        </div>
        {edit && (
          <input
            id="photo-upload"
            type="file"
            onChange={onChange}
            style={{ display: "none" }}
          />
        )}
      </label>
    </>
  );
};

export default ProfileImg;
