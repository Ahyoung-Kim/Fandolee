import React from "react";
import styled from "styled-components";
import { colors } from "../../common/color";

import PostInputBox from "./PostInputBox";

import { postInputWidth } from "./PostInputBox";

const PostTextArea = ({ label, onChange, value, name, placeholder }) => {
  return (
    <PostInputBox label={label}>
      <TextArea
        onChange={onChange}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </PostInputBox>
  );
};

export default PostTextArea;

const TextArea = styled.textarea`
  display: inline-box;
  box-sizing: border-box;
  border: 1px solid ${colors.COLOR_GRAY_BORDER};
  width: ${postInputWidth};
  max-width: ${postInputWidth};
  height: 300px;
  max-height: 300px;
  border-radius: 5px;
  line-height: 20px;
  padding: 5px 10px;
`;
