import { useState } from "react";
import { useNavigate } from "react-router";
import SideBar from "../components/SideBar";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import {
  Button,
  Form,
  List,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  Upload,
} from "antd";
import { database } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Training2 = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/training2/doc1`);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const [data, setData] = useState([
    {
      title: "Title 1",
      desc: "Description of the document",
    },
    {
      title: "Title 2",
      desc: "Description of the document",
    },
    {
      title: "Title 3",
      desc: "Description of the document",
    },
    {
      title: "Title 4",
      desc: "Description of the document",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async () => {
    try {
      const formValues = await form.validateFields();
      const { name, date, desc, upload } = formValues;
  
      if (!upload || upload.length === 0) {
        throw new Error('No file selected for upload');
      }
  
      // Assuming the file to upload is the first file in the upload array
      const file = upload[0].originFileObj;
      if (!file) {
        throw new Error('No file found');
      }
  
      // Create a reference to the file in Firebase Storage
      // Make sure to use a unique identifier for each file's path (e.g., a timestamp or a unique ID)
      // Here I'm using `file.name` but consider a more unique approach
      const storage = getStorage(); // Move this line into the function
  
      const storageRef = ref(storage, `pdf/${file.name}`);
  
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!', uploadResult);
  
      // After a successful upload, get the download URL
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log('File available at', downloadURL);
  
      // Save form data and file download URL to the database
      const newData = {
        title: name,
        date: date.format('YYYY-MM-DD'),
        desc: desc,
        fileURL: downloadURL,
      };
  
      // Add document to Firestore collection
      const docRef = await addDoc(collection(database, 'Training_2'), newData);
      console.log('Document written with ID: ', docRef.id);
  
      // Update state with new data
      setData((prevData) => [...prevData, newData]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors, e.g., show a notification to the user
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="flex gap-4">
      <SideBar />
      <div className="flex-1 flex mr-4 flex-col rounded-md justify-center self-center bg-white p-4 h-full overflow-auto">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 self-start justify-start font-poppins">
            <div className="text-3xl text-left font-semibold mb-3">
              Documents
            </div>
          </div>
          <Form
            form={form}
            className="text-left"
            name="nest-messages"
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="desc" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="upload"
              label="Upload Document"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="Upload pdf or word file only. Max size: 2MB"
              rules={[{ required: true }]}
            >
              <Upload beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                onClick={onFinish}
                className="bg-blue-700 text-white"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>

        <List
          style={{
            maxHeight: "calc(100vh - 25rem)",
            height: "calc(100vh - 10rem)",
            overflow: "auto",
            width: "100%",
          }}
          className="flex-1"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={<div>{item.desc}</div>}
              />
              <List.Item actions={[<Button onClick={handleClick}>View</Button>]}></List.Item>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Training2;
