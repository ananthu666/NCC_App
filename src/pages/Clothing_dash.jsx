import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { doc, setDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const Clothing_form = ({ addNewTile }) => {
  const [form] = Form.useForm();
  const addNewIssueCard = (values) => {
    addNewTile(values);
    form.resetFields();
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={addNewIssueCard}
        className="clothing-form"
      >
        <Form.Item
          name="noICC"
          label={<span className="form-label">No-ICC</span>}
          rules={[{ required: true, message: "Please input the item!" }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          name="nameOfInstitution"
          label={<span className="form-label">Name Of Institution</span>}
          rules={[{ required: true, message: "Please input the item!" }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          name="no"
          label={<span className="form-label">No</span>}
          rules={[{ required: true, message: "Please input the qty auth!" }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          name="rank"
          label={<span className="form-label">Rank</span>}
          rules={[{ required: true, message: "Please select the due date!" }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item
          name="name"
          label={<span className="form-label">Name</span>}
          rules={[{ required: true, message: "Please input the qty issued!" }]}
        >
          <Input className="form-input" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Add
          </Button>
        </Form.Item>
      </Form>
      <style>{`
        .form-input {
          width: 70%;
        }
      `}</style>
    </div>
  );
};

const Clothing_dash = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const cadetsRef = collection(database, "clothing_dash");
        const querySnapshot = await getDocs(cadetsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setItems(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };
    fetchDataFromFirestore();
  }, []);

  const addNewTile = async (formValues) => {
    try {
      const cadetsRef = collection(database, "clothing_dash");
      const data = {
        noICC: formValues.noICC || "Default ICC",
        nameOfInstitution:
          formValues.nameOfInstitution || "Default Institution",
        no: formValues.no || "Default No",
        rank: formValues.rank || "Default Rank",
        name: formValues.name || "Default Name",
      };
      const documentRef = doc(cadetsRef, formValues.noICC);
      await setDoc(documentRef, data);
      console.log("Data successfully sent to Firestore!");
    } catch (error) {
      console.error("Error sending data to Firestore:", error);
    }

    setItems([formValues, ...items]);
  };

  const handleEdit = (no_ncc) => {
    navigate(`/clothing/${no_ncc}`);
  };

  return (
    <div className="container">
      <Card title="INDIVIDUAL CLOTHING ISSUE CARD" className="clothing-card">
        <Clothing_form addNewTile={addNewTile} />
        <div className="item-list">
          {items.map((item) => {
            const { no, name } = item;
            console.log(no);
            return (
              <div key={noICC} className="item">
                <h4>{name}</h4>
                <button onClick={() => handleEdit(no)} className="edit-button">
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      <style>{`
        .container {
          height: 95vh; /* Set container height to 80% of viewport height */
          overflow: auto; /* Add scrollbar when content exceeds the container height */
          margin: 0px auto; /* Center the container horizontally */
          max-width: 1000px; /* Set a maximum width for the container */
          padding: 0px; /* Add some padding within the container */
          border: 1px solid #ccc; /* Add a border for better visual separation */
          border-radius: 8px; /* Add rounded corners */
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
        }

        .clothing-card {
          width: 100%; /* Make the card take up the full width of the container */
          margin: 0; /* Remove any margin from the card */
          height: 95vh;
        }

        .item-list {
          margin-top: 24px;
        }

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          max-width: 800px;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .edit-button {
          background-color: #1890ff;
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Clothing_dash;
