import React from "react";
import { database } from "../../../firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  message,
  Card,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { data } from "autoprefixer";

const { Option } = Select;

const CadetForm = ({ data = {} }) => {
  const [form] = Form.useForm();
  // Function to handle form submission
  
  const onFinish = (values) => {
    // Process form values here
    console.log("Received values of form:", values);
  };

  // add the cadet details to db

  const storage = getStorage();

  // 'file' comes from the Blob or File API

  const addcdtDB = async () => {
    const formValues = form.getFieldsValue();

    // uploadBytes(storageRef,formValues.upload);
    const storageRef = ref(storage, `images/${formValues.id}`);
    await uploadBytes(storageRef, formValues.upload[0].originFileObj);
    const imageUrl = await getDownloadURL(storageRef);
    console.log(imageUrl);

    try {
      // Assuming you have a Firestore reference named citiesRef
      const cadetsRef = collection(database, "cadets");

      // Data to be sent
      const data = {
        name: formValues.name || "Default Name",
        college: formValues.college || "Default College",
        dob: formValues.dob.format("DD-MM-YYYY") || "01-01-2000",
        // dob: moment(formValues.dob).format('DD-MM-YYYY') || "01-01-2000",
        camps: [formValues.campsattended],
        address: formValues.address || "Default Address",
        bankAccountHoldersName:
          formValues.bankAccountHolders || "Default Bank Account Holder Name",
        bankAccountNumber:
          formValues.bankAccountNumber || "Default Bank Account Number",
        height: formValues.height || "Default Height",
        category: formValues.category || "Default Category",
        division: formValues.division || "Default Division",
        email: formValues.email || "default@example.com",
        gender: formValues.gender || "Male",
        ifscCode: formValues.ifscCode || "Default IFSC Code",
        identificationMark:
          formValues.identificationMark || "Default Identification Mark",
        motherName: formValues.motherName || "Default Mother's Name",
        "father'sName": formValues["father'sName"] || "Default Father's Name",

        dateOfEnrolment:
          formValues.dateOfEnrolment.format("DD-MM-YYYY") || "01-01-2022",
        year: formValues.year || "Default Year",
        upload: imageUrl || "Default Upload Value",
        rank: formValues.rank || "Default Rank",
        exam_grade: formValues.exam_grade || "Default Exam Grade",
      };
      const documentRef = doc(cadetsRef, formValues.id);
      await setDoc(documentRef, data);
      console.log("Data successfully sent to Firestore!");
    } catch (error) {
      console.error("Error sending data to Firestore:", error);
    }
    form.resetFields();
  };

  //

  // Function to handle file uploads

  const beforeUpload = (file) => {
    const isJPGOrPNG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPGOrPNG) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size /1024/1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPGOrPNG && isLt2M;
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Card
      title="Cadet Registration Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={data}
        scrollToFirstError
        className="flex px-8 gap-2 justify-around"
      >
        <div className="bg_logo">
          <img
            src="/NCC.png"
            className="absolute inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />
        </div>
        <Col>
          <Form.Item name="id" label="ID" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item name="name" label="Name" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="college"
            label="College"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: false }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bankAccountNumber"
            label="Bank Account Number"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="height" label="Height" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: false }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              {/* Add other categories here */}
            </Select>
          </Form.Item>

          <Form.Item
            name="division"
            label="Division"
            rules={[{ required: false }]}
          >
            <Select>
              <Option value="infantry">Infantry</Option>
              <Option value="armored">Armored</Option>
              {/* Add other divisions here */}
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: false,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="exam_grade"
            label="Examination grade"
            rules={[{ required: false }]}
          >
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              {/* Add other divisions here */}
            </Select>
          </Form.Item>
        </Col>

        <Col>
          <Form.Item name="gender" label="Gender" rules={[{ required: false }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="ifscCode" label="IFSC Code" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="identificationMark"
            label="Identification Mark"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="campsattended"
            label="Camps Attended"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="motherName"
            label="Mother's Name"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfEnrolment"
            label="Date of Enrolment"
            rules={[{ required: false }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item name="year" label="Year" rules={[{ required: false }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="father'sName"
            label="father'sName"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rank"
            label="Rank"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Image must smaller than 2MB and in JPG/PNG format"
          >
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" onClick={addcdtDB}>
              Register
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
};

export default CadetForm;
