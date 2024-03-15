import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Flex, Table, Input, Select, Popconfirm, message } from "antd";
import { useState, useEffect } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import imageUrl from "../assets/NCC.png";
import { database } from "../../firebase";
<<<<<<< HEAD
import { collection, updateDoc ,doc} from "firebase/firestore";
=======
import { collection, updateDoc, doc } from "firebase/firestore";
>>>>>>> 72975bf73fe0b41cc90787705792d26a8e91f543

function Tablegrid({ data, loading }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCamps, setSelectedCamps] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const [selectedRank, setSelectedRank] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [excadets, setexcadets] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (cadet) => {
    console.log("Edit", cadet);
    navigate(`/edit/${cadet.id}`, {
      state: { cadet },
    }); // Redirect to the edit page
  };

  const { Search } = Input;
<<<<<<< HEAD
  const to_ex_cadet =async ()=> {
    excadets.forEach(excadet => {
      try
      {

        const cadetRef = doc(database, "cadets",excadet);
        updateDoc(cadetRef, {
          ex_cadet:true
        });
        message.success("Ex Cadets Updated");
      }
      catch(e)
      {
        console.error("Error updating document:", e);
      }
    }
    );
    
  }
    
=======
  const to_ex_cadet = async () => {
    excadets.forEach((excadet) => {
      const cadetRef = doc(database, "cadets", excadet);
      updateDoc(cadetRef, {
        ex_cadet: true,
      });
    });
  };

>>>>>>> 72975bf73fe0b41cc90787705792d26a8e91f543
  const handleDelete = (id) => {
    console.log("Deleted", id);
  };

  const applyFilters = (cadetList) => {
    if (selectedCamps.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedCamps.some((camp) =>
          cadet.detailsOfCampsAttended.includes(camp)
        )
      );
    }

    if (selectedCollege.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedCollege.includes(cadet.college)
      );
    }

    if (selectedRank.length) {
      cadetList = cadetList.filter((cadet) =>
        selectedRank.includes(cadet.rank)
      );
    }

    return cadetList;
  };

  const handleCampsChange = (value) => {
    setSelectedCamps(value || []);
  };

  const handleCollegeChange = (value) => {
    setSelectedCollege(value || []);
  };

  const handleRankChange = (value) => {
    setSelectedRank(value || []);
  };

  const onSearch = (value) => setSearchText(value);

  const camps = [
    { label: "IGC RDC", value: "IGC RDC" },
    { label: "ATC", value: "ATC" },
    { label: "LC", value: "LC" },
    { label: "IGC NSC", value: "IGC NSC" },
    { label: "NSC", value: "NSC" },
  ];

  const ranks = [
    { label: "POC", value: "POC" },
    { label: "NC1", value: "NC1" },
    { label: "LC", value: "LC" },
  ];

  const colleges = [
    {
      label: "College of Engineering, Tvmp",
      value: "College of Engineering, Tvpm",
    },
    {
      label: "College of Agriculture, Vellayani",
      value: "College of Agriculture, Vellayani",
    },
    {
      label: "Mar Ivanios College, Nalanchira",
      value: "Mar Ivanios College, Nalanchira",
    },
    {
      label: "St. Xavier's College, Thumba",
      value: "St. Xavier's College, Thumba",
    },
    {
      label: "Mahatma Gandhi College, Tvpm",
      value: "Mahatma Gandhi College, Tvpm",
    },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 140,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Cadet Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "College",
      dataIndex: "college",
      key: "college",
      width: 230,
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 100,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 220,
    },
    {
      title: "Bank Account Holder's Name",
      dataIndex: "bankAccountHoldersName",
      key: "bankAccountHoldersName",
      width: 200,
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      key: "bloodGroup",
    },
    {
      title: "Bank Account Number",
      dataIndex: "bankAccountNumber",
      key: "bankAccountNumber",
      width: 250,
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      width: 100,
    },
    {
      title: "Camps Attended",
      dataIndex: "camps",
      key: "camp",
      width: 100,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "IFSC Code",
      dataIndex: "ifscCode",
      key: "ifscCode",
      width: 130,
    },
    {
      title: "Identification Mark",
      dataIndex: "identificationMark",
      key: "identificationMark",
      width: 180,
    },
    {
      title: "Mother’s Name",
      dataIndex: "motherName",
      key: "motherName",
      width: 130,
    },
    {
      title: "Date of Enrolment",
      dataIndex: "dateOfEnrolment",
      key: "dateOfEnrolment",
      width: 130,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Father's Name",
      dataIndex: "father'sName",
      key: "father'sName",
      width: 180,
    },

    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: 170,
    },
    {
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().includes(value.toLowerCase()) ||
        String(record.college).toLowerCase().includes(value.toLowerCase()) ||
        String(record.dateOfBirth)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.address).toLowerCase().includes(value.toLowerCase()) ||
        String(record.bankAccountHolderName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.bloodGroup).toLowerCase().includes(value.toLowerCase()) ||
        String(record.bankAccountNumber)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.height).toLowerCase().includes(value.toLowerCase()) ||
        String(record.camps).toLowerCase().includes(value.toLowerCase()) ||
        String(record.category).toLowerCase().includes(value.toLowerCase()) ||
        String(record.division).toLowerCase().includes(value.toLowerCase()) ||
        String(record.email).toLowerCase().includes(value.toLowerCase()) ||
        String(record.gender).toLowerCase().includes(value.toLowerCase()) ||
        String(record.ifscCode).toLowerCase().includes(value.toLowerCase()) ||
        String(record.identificationMark)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.motherName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.dateOfEnrolment)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.year).toLowerCase().includes(value.toLowerCase()) ||
        String(record.fatherName).toLowerCase().includes(value.toLowerCase()) ||
        String(record.id).toLowerCase().includes(value.toLowerCase()),
      width: 0,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Flex justify="center" gap={"middle"}>
          <Popconfirm
            title="Edit?"
            onConfirm={() => handleEdit(record)}
            okButtonProps={{
              style: {
                backgroundColor: "blue",
                color: "white",
              },
            }}
          >
            <Button>Edit</Button>
          </Popconfirm>
          <Popconfirm
            title="Download Biodata?"
            onConfirm={() => genCert(record)}
            okButtonProps={{
              style: {
                backgroundColor: "blue",
                color: "white",
              },
            }}
          >
            <Button
              icon={<DownloadOutlined />}
              style={{ backgroundColor: "#0ea5e9", color: "white" }}
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  // const genCert = (cadet) => {
  //   console.log(cadet);
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // Set font size for the heading
  //   doc.setFontSize(24);

  //   // Calculate the width of the text to center it
  //   const textWidth =
  //     (doc.getStringUnitWidth("BIODATA") * doc.internal.getFontSize()) /
  //     doc.internal.scaleFactor;
  //   const centerX = (doc.internal.pageSize.width - textWidth) / 2;

  //   // Add the heading at the calculated position
  //   doc.text("BIODATA", centerX, 20);

  //   // Reset font size for the rest of the content
  //   doc.setFontSize(12);

  //   // Define the labels and corresponding values
  //   const labels = [
  //     "Cadet ID",
  //     "Name",
  //     "Rank",
  //     "Enrollment Institute",
  //     // "Awards",
  //     // "NCC Year",
  //     // "ANO Name",
  //     "Blood Group",
  //     "Height",
  //     "Address",
  //     "Bank Acc No",
  //     "IFSC Code",
  //     "Mobile No",
  //     "Father Name",
  //     // "Certificate Qualified",
  //   ];
  //   const values = [
  //     `: ${cadet.id}`,
  //     `: ${cadet.name}`,
  //     `: ${cadet.rank}`,
  //     `: ${cadet.college}`,
  //     // `: ${cadet.awards}`,
  //     // `: ${cadet.nccYear}`,
  //     // `: ${cadet.anoName}`,
  //     `: ${cadet.bloodGroup}`,
  //     `: ${cadet.height}`,
  //     `: ${cadet.address}`,
  //     `: ${cadet.bankAccountNumber}`,
  //     `: ${cadet.ifscCode}`,
  //     `: ${cadet.mobileNo}`,
  //     `: ${cadet["father'sName"]}`,
  //     // `: ${cadet.certificateQualified}`,
  //   ];

  //   // Calculate the maximum label width
  //   const maxLabelWidth = Math.max(
  //     ...labels.map((label) => doc.getStringUnitWidth(label))
  //   );

  //   // Define the starting y position and line height
  //   let startY = 40;
  //   const lineHeight = 10;

  //   // Adjust the distance between label and value
  //   const distanceBetweenLabelAndValue = 80; // Increase this value to add more space

  //   // Loop through each label and value to print them
  //   labels.forEach((label, index) => {
  //     // Calculate x position for label and value
  //     const labelX = 15;
  //     const valueX = maxLabelWidth + distanceBetweenLabelAndValue; // Add fixed distance between label and value

  //     // Print label and value at calculated positions
  //     doc.text(label, labelX, startY);
  //     doc.text(values[index], valueX, startY);

  //     // Increment y position for the next label
  //     startY += lineHeight;
  //   });

  //   // Add a section for camps attended
  //   // const campsStartY = startY + lineHeight;
  //   // doc.text("Camps Attended", 15, campsStartY);

  //   // // Create a table for camps attended
  //   // const campsTable = {
  //   //   head: [["Camp Name", "Year", "Location"]],
  //   //   body: cadet.camps.map((camp) => [camp]),
  //   //   startY: campsStartY + lineHeight,
  //   // };

  //   // doc.autoTable(campsTable); // Use autoTable function from jspdf-autotable plugin

  //   // Add border around the entire certificate
  //   const certificateWidth = doc.internal.pageSize.width - 20; // Width of the certificate
  //   const certificateHeight = doc.internal.pageSize.height - 20; // Height of the certificate
  //   doc.rect(8, 8, certificateWidth + 2, certificateHeight, "S"); // Add border with "S" style (solid)

  //   // Fetch the image through cors-anywhere proxy
  //   // Save the PDF without the image

  //   // Add the image to the PDF
  //   // doc.addImage(imageUrl, "JPEG", 10, 10, 100, 100);
  //   doc.addImage(
  //     imageUrl,
  //     "JPEG",
  //     doc.internal.pageSize.width - 50,
  //     35,
  //     32,
  //     40
  //   );
  //   doc.save("certificate.pdf");
  // };

  const genCert = async (cadet) => {
    const img = await fetch(`${cadet.upload}`);
    const blob = await img.blob();

    console.log(blob);
    console.log(cadet);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set font size for the heading
    doc.setFontSize(24);

    // Calculate the width of the text to center it
    const textWidth =
      (doc.getStringUnitWidth("BIODATA") * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const centerX = (doc.internal.pageSize.width - textWidth) / 2;

    // Add the heading at the calculated position
    doc.text("BIODATA", centerX, 20);

    // Reset font size for the rest of the content
    doc.setFontSize(12);

    // Define the labels and corresponding values
    const labels = [
      "Cadet ID",
      "Rank",
      "Name",
      "Enrollment Institute",
      "Blood Group",
      "Height",
      "Address",
      "Father Name",
      "Mother's Name",
      "Bank Acc No",
      "IFSC Code",
      "Mobile No",
    ];
    const values = [
      `: ${cadet.id}`,
      `: ${cadet.rank}`,
      `: ${cadet.name}`,
      `: ${cadet.college}`,
      `: ${cadet.bloodGroup}`,
      `: ${cadet.height}`,
      `: ${cadet.address}`,
      `: ${cadet["father'sName"]}`,
      `: ${cadet.motherName}`,
      `: ${cadet.bankAccountNumber}`,
      `: ${cadet.ifscCode}`,
      `: ${cadet.mobileNo}`,
    ];

    // Calculate the maximum label width
    const maxLabelWidth = Math.max(
      ...labels.map((label) => doc.getStringUnitWidth(label))
    );

    // Define the starting y position and line height
    let startY = 40;
    const lineHeight = 10;

    // Adjust the distance between label and value
    const distanceBetweenLabelAndValue = 80; // Increase this value to add more space

    // Calculate the width available for the certificate
    const certificateWidth = doc.internal.pageSize.width - 20;

    // Loop through each label and value to print them
    labels.forEach((label, index) => {
      // Calculate x position for label and value
      const labelX = 15;
      const valueX = maxLabelWidth + distanceBetweenLabelAndValue; // Add fixed distance between label and value

      let valueY = startY;

      // Split address into multiple lines if necessary
      if (label === "Address") {
        doc.text(label, labelX, startY);
        const addressLines = doc.splitTextToSize(
          values[index],
          certificateWidth - valueX - 10
        );
        addressLines.forEach((line) => {
          doc.text(line, valueX, valueY);
          valueY += lineHeight;
        });
      } else {
        // Print label and value at calculated positions
        doc.text(label, labelX, startY);
        doc.text(values[index], valueX, startY);
      }

      // Increment y position for the next label
      startY = valueY + lineHeight;
    });

    // Add border around the entire certificate
    // const certificateWidth = doc.internal.pageSize.width - 20; // Width of the certificate
    const certificateHeight = doc.internal.pageSize.height - 20; // Height of the certificate
    doc.rect(8, 8, certificateWidth + 2, certificateHeight, "S"); // Add border with "S" style (solid)

    // Add the image to the PDF
    // doc.addImage(imageUrl, "JPEG", 10, 10, 100, 100);

    const imgData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    doc.addImage(imgData, "JPEG", doc.internal.pageSize.width - 50, 20, 32, 40);

    // Save the PDF
    doc.save(`${cadet.name}.pdf`);
  };

  const filterData = () => {
    let temp = applyFilters(data);
    setFilteredData(temp);
  };

  useEffect(() => {
    filterData();
  }, [data, selectedCamps, selectedCollege, selectedRank]);

  return (
    <div className="flex flex-col min-h-lvh z-0">
      <div className="flex justify-end gap-2 items-center">
<<<<<<< HEAD
        
      <Button ghost danger onClick={to_ex_cadet}>Promote</Button>
      
    
=======
        <Button ghost danger onClick={to_ex_cadet}>
          Ghost
        </Button>

>>>>>>> 72975bf73fe0b41cc90787705792d26a8e91f543
        <Select
          onSearch={onSearch}
          onChange={handleCampsChange}
          mode="multiple"
          placeholder="Filter by Campus Attended"
          allowClear
          style={{ width: "20%" }}
          options={camps}
        />
        <Select
          onChange={handleCollegeChange}
          showSearch
          allowClear
          placeholder="Search to Select"
          optionFilterProp="children"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          style={{ width: "20%" }}
          options={colleges}
        />
        <Select
          onChange={handleRankChange}
          mode="multiple"
          placeholder="Filter by Rank"
          allowClear
          style={{ width: "20%" }}
          options={ranks}
        />
        <Search
          placeholder="Input search text"
          className="self-end mr-3 py-4"
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <Table
        rowKey="id"
        
        
        
        title={() => (
          <h1
            style={{
              fontSize: "2rem",
              color: "grey",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Cadets Main Data
          </h1>
        )}
        
        columns={columns}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            setexcadets(selectedRowKeys);

            console.log(
              `selectedRowKeys: ${selectedRowKeys}`,
              "selectedRows: ",
              selectedRows
            );
          },
        }}
        dataSource={filteredData}
        scroll={{
          x: 3000,
          y: 550,
        }}
        pagination={{
          position: ["bottomRight"],
          pageSize: 14,
          showSizeChanger: false,
        }}
        size="small"
        style={{
          width: "85vw",
        }}
        loading={loading}
        showSizeChanger="false"
      />
    </div>
  );
}

export default Tablegrid;
