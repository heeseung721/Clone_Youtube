import React, { useState } from "react";

const useInputItem = () => {
  const [input, setInput] = useState({
    title: "",
    content: "",
    tag: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const reset = () => {
    setInput({
      title: "",
      content: "",
      tag: "",
    });
  };
  return { input, setInput, onChangeHandler, reset };
};

export default useInputItem;
