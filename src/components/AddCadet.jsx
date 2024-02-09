import React from "react";
import { Form, Input, Button } from "antd";

const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
};

const AddCadet = () => {
  return (
    <>
      <Form>
        <Form.Item>
          <Input label="Fullnames" placeholder="Full Name" />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCadet;
