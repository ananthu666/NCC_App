import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideBar from "../components/SideBar";
import UpdateForm from "../components/UpdateForm";

import { database } from "../../firebase";
import {
  doc,
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

const UpdateCadet = () => {
  const location = useLocation();
  const { cadet } = location.state || {};

  const [initialFileList, setInitialFileList] = useState("");

  useEffect(() => {
    if (cadet && cadet.upload) {
      const file  = [
      {
        url : cadet.upload
      }]

      setInitialFileList(file); 
    }
  }, [cadet]);

  const storage = getStorage();
  async function handleSubmit(formValues) {
  try {
    const cadetDocRef = doc(database, "cadets", cadet.id);
    const fieldsToUpdate = {};
    if (formValues.upload && formValues.upload!==cadet.upload) {
      const storageRef = ref(storage, `images/${formValues.id}`);
      await uploadBytes(storageRef, formValues.upload);
      const imageUrl = await getDownloadURL(storageRef);
      fieldsToUpdate.upload = imageUrl;
    }

    if (formValues.name !== cadet.name) {
      fieldsToUpdate.name = formValues.name;
    }
    if (formValues.college !== cadet.college) {
      fieldsToUpdate.college = formValues.college;
    }
    if (formValues.dob !== cadet.dob) {
      fieldsToUpdate.dob = formValues.dob;
    }
    if (formValues.address !== cadet.address) {
      fieldsToUpdate.address = formValues.address;
    }
    if (formValues.bankAccountNumber !== cadet.bankAccountNumber) {
      fieldsToUpdate.bankAccountNumber = formValues.bankAccountNumber;
    }
    if (formValues.height !== cadet.height) {
      fieldsToUpdate.height = formValues.height;
    }
    if (formValues.category !== cadet.category) {
      fieldsToUpdate.category = formValues.category;
    }
    if (formValues.division !== cadet.division) {
      fieldsToUpdate.division = formValues.division;
    }
    if (formValues.email !== cadet.email) {
      fieldsToUpdate.email = formValues.email;
    }
    if (formValues.gender !== cadet.gender) {
      fieldsToUpdate.gender = formValues.gender;
    }
    if (formValues.ifsc !== cadet.ifsc) {
      fieldsToUpdate.ifsc = formValues.ifsc;
    }
    if (formValues.identificationMark !== cadet.identificationMark) {
      fieldsToUpdate.identificationMark = formValues.identificationMark;
    }
    if (formValues.motherName !== cadet.motherName) {
      fieldsToUpdate.motherName = formValues.motherName;
    }
    if (formValues["father 'sName"] !== cadet["father 'sName"]) {
      fieldsToUpdate["father 'sName"] = formValues["father 'sName"];
    }
    if (formValues.dateOfEnrolment !== cadet.dateOfEnrolment) {
      fieldsToUpdate.dateOfEnrolment = formValues.dateOfEnrolment;
    }
    if (formValues.year !== cadet.year) {
      fieldsToUpdate.year = formValues.year;
    }
    
    await updateDoc(cadetDocRef, fieldsToUpdate);
    console.log("Cadet data updated successfully");
  } catch (error) {
    console.error("Error updating cadet data:", error);
  }
}

  return (
    <div className="flex gap-10">
      <SideBar className="" />
      <div className="flex flex-1 justify-center items-center">
        <UpdateForm data={cadet} initialFileList={initialFileList}  handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default UpdateCadet;
