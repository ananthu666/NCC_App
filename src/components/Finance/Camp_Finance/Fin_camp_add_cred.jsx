import React, { useState } from "react";

import { database } from "../../../../firebase";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

const CadetForm=({camp_id,camp_day})=>
{
  const addtomaincamp = async () => {
    const formValues = form1.getFieldsValue();
    const data = {camp_bal:{
      vrno: formValues.vrno||1,
      towhom: formValues.towhom||'ananthu',
      onwhataccount: formValues.onwhataccount||'Bank',
      // cash: formValues.cash||'0',
      // bank: formValues.bank||'0',
      ta_off: formValues.ta_off||'0',
      messing_off: formValues.messing_off||'0',
      messing_cad: formValues.messing_cad||'0',
      incidentials: formValues.incidentials||'0',
      rank_pay: formValues.rank_pay||'0',
      ta_da_civil: formValues.ta_da_civil||'0',
      pol: formValues.pol||'0',
      security_depo: formValues.security_depo||'0',
      suspense: formValues.suspense||'0',
      initials_of_off: formValues.initials_of_off||'0',
      camp_id: camp_id,
      ship_modelling: formValues.ship_modelling||'0',
      mode_of_payment: formValues.mode_of_payment||'Bank',
      day_count:camp_day,
      date: new Date().toLocaleDateString(),
      }
    };
    try {
      // Assuming you have a Firestore reference named camp_main
      const cadetsRef = collection(database, "camp_main");
      // update the reference
      const documentRef = doc(cadetsRef, camp_id);
      await updateDoc(documentRef, data);
      console.log("Data successfully sent to Firestore!");
    } catch (error) {
      console.error("Error sending data to Firestore:", error);
    }
    form1.resetFields();
  };










  const [form1] = Form.useForm();
  // add to database ****************************************
    const addcampcredit = async () => {
      const formValues = form1.getFieldsValue();
      
      try {
        // Assuming you have a Firestore reference named citiesRef
        const cadetsRef = collection(database, "camp_credit");
  
        // Data to be sent
        const data = {
          vrno: formValues.vrno||1,
          towhom: formValues.towhom||'ananthu',
          onwhataccount: formValues.onwhataccount||'Bank Account',
          // cash: formValues.cash||'0',
          // bank: formValues.bank||'0',
          ta_off: formValues.ta_off||'0',
          messing_off: formValues.messing_off||'0',
          messing_cad: formValues.messing_cad||'0',
          incidentials: formValues.incidentials||'0',
          rank_pay: formValues.rank_pay||'0',
          ta_da_civil: formValues.ta_da_civil||'0',
          pol: formValues.pol||'0',
          security_depo: formValues.security_depo||'0',
          suspense: formValues.suspense||'0',
          initials_of_off: formValues.initials_of_off||'0',
          camp_id: camp_id,
          ship_modelling: formValues.ship_modelling||'0',
          mode_of_payment: formValues.mode_of_payment||'Bank',
          day_count:camp_day,
          date: new Date().toLocaleDateString(),
          

          
        };
        const documentRef = doc(cadetsRef, camp_id+'_'+formValues.vrno);
        await setDoc(documentRef, data);
        console.log("Data successfully sent to Firestore!");
      } catch (error) {
        console.error("Error sending data to Firestore:", error);
      }
      form1.resetFields();
    };
    
  return (
    <div className="flex">
      
    <Card
      title="Camp Credit  Form"
      className="flex-1 overflow-x-hidden  my-4 mx-3 py-2 px-4"
      
    >
      <Form
        
        name="campregister"
        form={form1}
        
        scrollToFirstError
        className="flex flex-1 px-8 gap-3 justify-around"
        onFinish={addcampcredit} 
      >
        {/* <div className="bg_logo">
          <img
            src="/NCC.png"
            className="absolute inset-0 mx-auto my-auto h-2/5 opacity-10"
            draggable="false"
            alt=""
          />
        </div> */}
        <Col>
          

          <Form.Item name="vrno" label="Vr No" rules={[{ required: false}]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="towhom"
            label="To Whom Paid"
            rules={[{ required: false}]}
          >
            
            <Input />
          </Form.Item>

          <Form.Item
            name="onwhataccount"
            label="On What Account"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="cash"
            label="Cash"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bank"
            label="Bank"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            name="ta_off"
            label="TA/DA Officers/Cadets"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="messing_off"
            label="Messing Officers"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="messing_cad"
            label="Messing Cadets"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="incidentials"
            label="Incidentals"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rank_pay"
            label="Rank Pay"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          {/* ************************************** */}
          <Form.Item>
            <Button htmlType="submit" >
              Update
            </Button>
          </Form.Item>
          </Col>
          <Col>
          <Form.Item>
            <Button style={styles.powerbtn } onClick={addtomaincamp} >
             Initial Credits
            </Button>
          </Form.Item>
          <Form.Item
            name="ta_da_civil"
            label="TA/DA/Civilians"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pol"
            label="POL"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="security_depo"
            label="Security Deposit"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="suspense"
            label="Suspense"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="initials_of_off"
            label="Initials of Officer"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ship_modelling"
            label="Ship Modelling"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mode_of_payment"
            label="Mode of Payment"
            rules={[{ required: false}]}
          >
            <Input />
          </Form.Item>
          
          
          
        </Col>
        
      </Form>
    </Card>
   
    </div>
  );
};

export default CadetForm;

const styles={
  powerbtn:{
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '10px',
    marginBottom: '10px',
    position :'fixed',
    right: '70px',
    top: '10px',
  }
}