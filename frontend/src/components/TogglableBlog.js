import React, { useState, useImperativeHandle } from "react";
import propTypes from "prop-types";

const TogglableBlog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return toggleVisibility;
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {props.title} by {props.author}
        </div>
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{props.title}</div>
        {props.children}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  );
});

TogglableBlog.propTypes = {
  title: propTypes.string.isRequired,
};

TogglableBlog.displayName = "TogglableBlog";

export default TogglableBlog;
