import React, { useEffect, useState } from "react";

import { database } from "../../../firebase";
import {
  doc,
  collection,
  getDoc,getDocs,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";


// Generate a UUID

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

const CadetForm=({campdata,index})=>
{
  // console.log("campdata",campdata);
  // console.log("index",index);
  const [form1] = Form.useForm();
  // add to database ****************************************
  
    const addcampcd = async () => {
      const formValues = form1.getFieldsValue();
      
      try {
        // Assuming you have a Firestore reference named citiesRef
        const cadetsRef = collection(database, "cadet_in_camp");
  
        // Data to be sent
        const data = {
          
          cadet_num: formValues.cadetnum||1,
          cadet_rank: formValues.rank || 1,
          cadet_name: formValues.cadetname ||1,
          cadet_insti: formValues.institution ||1,
          cadet_act: formValues.activities ||1,
          cadet_rem: formValues.remarks ||1,
          cadet_veg: formValues.veg ||"veg",
          campid: index,
          
          
  
          
          
        };
        console.log(data);
        const documentRef = doc(cadetsRef, formValues.cadetnum);
        await setDoc(documentRef, data);
        console.log("Data successfully sent to Firestore!");
      } catch (error) {
        console.error("Error sending data to Firestore:", error);
      }
      form1.resetFields();
    };
    // ***************************************************
    const [data, setdata] = useState([]);

    async function getCamps(db = database) {
      // ////////////////////////////////
      const docRef = doc(db, "camp_main", index);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ////////////////////////////////
      return docSnap.data();
    }
    async function fetchCamps() {
      try {
        
        const campList = await getCamps();
        setdata(campList);
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    
    // get masterdata
      const [cadets, setcadets] = useState([]);
      async function getCadets(db = database) {
        const cadetsData = [];
        console.log("Hello");
        try
        {
        const querySnapshot = await getDocs(collection(db, "cadets"));
        querySnapshot.forEach((doc) => {
          const cadet = {
            id: doc.id,
            ...doc.data(),
          };
          cadetsData.push(cadet);
        });

        setcadets(cadetsData);
      } catch (error) {
        console.error("Error fetching cadets:", error);
      }
      }
      useEffect(() => {
        
          fetchCamps();
      })
      useEffect(() => {
        getCadets();
          
      }, []);
        // console.log(data);
      // console.log("===>",cadets);
      // write a search function in the list cadets
      const search_id = () => {
        console.log("searching");
        // for i in cadets
        var flag=0;
        for (var i = 0; i < campdata.length; i++) {
          console.log(campdata[i].cadet_rank);
          if (campdata[i].id == form1.getFieldValue("cadetnum")) {
            
            form1.setFieldsValue({
              cadetname: campdata[i].cadet_name,
              institution: campdata[i].cadet_insti,
              rank: campdata[i].cadet_rank,
              activities: campdata[i].cadet_act,
              remarks: campdata[i].cadet_rem,
              veg: campdata[i].cadet_veg,
              
            });
            console.log("found in camp");
            flag=1;
          }
          console.log("Not found in camp");
        }
        if(flag==0)
        {for (i = 0; i < cadets.length; i++) {
          
          if (cadets[i].id == form1.getFieldValue("cadetnum")) {
            console.log("if");
            form1.setFieldsValue({
              cadetname: cadets[i].name,
              rank: cadets[i].rank,
              institution: cadets[i].college,
            });
            console.log("found in mastere");
          }
          console.log("Not found in masterdata");
        }}
      }
      return (
    <div style={{display:"flex"}}>
    
    <Card
      title="Cadet Register Form"
      className="flex-1 overflow-x-hidden  my-4 mx-6 py-2 px-4"
    >
      <Form.Item>
            <Button onClick={search_id}  >
              Search Cadet
            </Button>
          </Form.Item>
      <Form
        
        name="cadetregister"
        form={form1}
        // initialValues={data}
        onFinish={addcampcd} 
        scrollToFirstError
        className="flex px-8 gap-2 justify-around"
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
          

          <Form.Item name="cadetnum" label="Cadet No" rules={[{ required: false }]}>
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
            name="cadetname"
            label="Cadet Name"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="institution"
            label="Institution"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" >
              Add Cadet
            </Button>
          </Form.Item>
          
          </Col>
          <Col>
          
          <Form.Item
            name="activities"
            label="Activities"
            rules={[{ required: false }]}
            
            
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="remarks"
            label="Remarks"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="veg" label="Veg/NonVeg" rules={[{ required: false }]}>
            <Select>
              <Option value="veg">Veg</Option>
              <Option value="nonveg">Non Veg</Option>
              
            </Select>
          </Form.Item>

          
          
        </Col>
      </Form>
    </Card>
    </div>
  );
};

export default CadetForm;
