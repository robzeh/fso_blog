import React, { useState, useImperativeHandle } from "react";

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
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>{props.title}</div>
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>{props.title}</div>
        {props.children}
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  );
});

export default TogglableBlog;
