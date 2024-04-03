import React from "react";
import SideBar from "../components/SideBar";
import pdf from "./mini.pdf";
import { Card, Form, Input } from "antd";

const Training2 = () => {
  return (
    <div className="flex gap-4 ">
      <SideBar className="" />
      <div className="w-full flex justify-between gap-4 self-center  m-3">
        <div className="">
          <embed src={pdf} className="" height={"800"} width={"550"} />
        </div>
        <div className="flex-1 flex justify-start self-start">
          <Card title="ADD NOTES" className="flex-1">
            <Form>
              <Input.TextArea
                placeholder="Add Notes or Corrections Here"
                autoSize={{
                  minRows: 6,
                  maxRows: 20,
                }}
              />
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training2;
