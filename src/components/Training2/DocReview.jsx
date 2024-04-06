import React from "react";

import pdf from "./mini.pdf";
import { Button, Card, Form, Input } from "antd";
import SideBar from "../SideBar";
import FormItem from "antd/es/form/FormItem";

const DocReview = () => {
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
              <Form.Item>
                <Input.TextArea
                  placeholder="Add Notes or Corrections Here"
                  autoSize={{
                    minRows: 6,
                    maxRows: 20,
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" className="bg-blue-700 text-white">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocReview;
