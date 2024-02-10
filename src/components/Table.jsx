import React, { useState } from "react";
import { Table } from "antd";
import { Input, Space } from "antd";

function Tablegrid() {
  const { Search } = Input;
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.name).toLowerCase().includes(value.toLowerCase()) ||
        String(record.age).toLowerCase().includes(value.toLowerCase()) ||
        String(record.address).toLowerCase().includes(value.toLowerCase()) ||
        String(record.gender).toLowerCase().includes(value.toLowerCase()) ||
        String(record.university).toLowerCase().includes(value.toLowerCase()) ||
        String(record.major).toLowerCase().includes(value.toLowerCase()) ||
        String(record.volunteerArea)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        String(record.email).toLowerCase().includes(value.toLowerCase()) ||
        String(record.phone).toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Age",
      width: 80,
      dataIndex: "age",
      key: "age",
      fixed: "left",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "Volunteer Area",
      dataIndex: "volunteerArea",
      key: "volunteerArea",
    },
    {
      title: "Contact Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Doe",
      age: 25,
      gender: "Male",
      university: "Stanford",
      major: "Computer Science",
      volunteerArea: "Animal Shelter",
      email: "john.doe@email.com",
      phone: "123-456-7890",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 30,
      gender: "Female",
      university: "Harvard",
      major: "Business Administration",
      volunteerArea: "Food Bank",
      email: "jane.smith@email.com",
      phone: "456-789-0123",
    },
    {
      key: "3",
      name: "Alex Johnson",
      age: 22,
      gender: "Male",
      university: "MIT",
      major: "Electrical Engineering",
      volunteerArea: "Homeless Shelter",
      email: "alex.johnson@email.com",
      phone: "789-012-3456",
    },
    {
      key: "4",
      name: "Sarah Brown",
      age: 28,
      gender: "Female",
      university: "UCLA",
      major: "Psychology",
      volunteerArea: "Community Center",
      email: "sarah.brown@email.com",
      phone: "012-345-6789",
    },
    {
      key: "5",
      name: "Michael Lee",
      age: 26,
      gender: "Male",
      university: "UC Berkeley",
      major: "Environmental Science",
      volunteerArea: "Park Cleanup",
      email: "michael.lee@email.com",
      phone: "345-678-9012",
    },
    {
      key: "6",
      name: "Emily Davis",
      age: 24,
      gender: "Female",
      university: "Columbia",
      major: "Journalism",
      volunteerArea: "Elderly Care",
      email: "emily.davis@email.com",
      phone: "678-901-2345",
    },
    {
      key: "7",
      name: "Daniel Wilson",
      age: 29,
      gender: "Male",
      university: "NYU",
      major: "History",
      volunteerArea: "Literacy Program",
      email: "daniel.wilson@email.com",
      phone: "901-234-5678",
    },
    {
      key: "8",
      name: "Olivia Martinez",
      age: 27,
      gender: "Female",
      university: "Oxford",
      major: "Law",
      volunteerArea: "Legal Aid",
      email: "olivia.martinez@email.com",
      phone: "234-567-8901",
    },
    {
      key: "9",
      name: "Ethan Garcia",
      age: 23,
      gender: "Male",
      university: "Cambridge",
      major: "Physics",
      volunteerArea: "Science Education",
      email: "ethan.garcia@email.com",
      phone: "567-890-1234",
    },
    {
      key: "10",
      name: "Chloe Rodriguez",
      age: 31,
      gender: "Female",
      university: "Yale",
      major: "Medicine",
      volunteerArea: "Health Clinic",
      email: "chloe.rodriguez@email.com",
      phone: "890-123-4567",
    },
    {
      key: "11",
      name: "William Baker",
      age: 29,
      gender: "Male",
      university: "Princeton",
      major: "Economics",
      volunteerArea: "Mentorship Program",
      email: "william.baker@email.com",
      phone: "901-234-5678",
    },
    {
      key: "12",
      name: "Sophia Garcia",
      age: 26,
      gender: "Female",
      university: "Brown",
      major: "Political Science",
      volunteerArea: "Human Rights Advocacy",
      email: "sophia.garcia@email.com",
      phone: "345-678-9012",
    },
    {
      key: "13",
      name: "Matthew Wright",
      age: 24,
      gender: "Male",
      university: "Duke",
      major: "Public Policy",
      volunteerArea: "Community Garden",
      email: "matthew.wright@email.com",
      phone: "789-012-3456",
    },
    {
      key: "14",
      name: "Ava Foster",
      age: 27,
      gender: "Female",
      university: "Cornell",
      major: "Biology",
      volunteerArea: "Wildlife Conservation",
      email: "ava.foster@email.com",
      phone: "123-456-7890",
    },
    {
      key: "15",
      name: "David Ramirez",
      age: 25,
      gender: "Male",
      university: "Michigan",
      major: "Mechanical Engineering",
      volunteerArea: "STEM Education",
      email: "david.ramirez@email.com",
      phone: "567-890-1234",
    },
    {
      key: "16",
      name: "Sofia Nguyen",
      age: 23,
      gender: "Female",
      university: "UCLA",
      major: "Computer Engineering",
      volunteerArea: "Tech Literacy Program",
      email: "sofia.nguyen@email.com",
      phone: "901-234-5678",
    },
    {
      key: "17",
      name: "Daniel Kim",
      age: 28,
      gender: "Male",
      university: "Stanford",
      major: "Mathematics",
      volunteerArea: "Tutoring Program",
      email: "daniel.kim@email.com",
      phone: "345-678-9012",
    },
    {
      key: "18",
      name: "Mia Patel",
      age: 26,
      gender: "Female",
      university: "MIT",
      major: "Chemistry",
      volunteerArea: "Science Fair Judging",
      email: "mia.patel@email.com",
      phone: "789-012-3456",
    },
    {
      key: "19",
      name: "Oliver Smith",
      age: 30,
      gender: "Male",
      university: "Harvard",
      major: "Sociology",
      volunteerArea: "Community Outreach",
      email: "oliver.smith@email.com",
      phone: "123-456-7890",
    },
    {
      key: "20",
      name: "Ella Johnson",
      age: 29,
      gender: "Female",
      university: "Yale",
      major: "Literature",
      volunteerArea: "Library Program",
      email: "ella.johnson@email.com",
      phone: "456-789-0123",
    },
  ];

  const onSearch = (value) => setSearchText(value);
  return (
    <div className="flex flex-col justify-center gap-3">
      <Search
        placeholder="input search text"
        className="self-end mr-4"
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={onSearch}
        style={{
          width: 200,
        }}
      />
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1300,
        }}
        pagination={{
          pageSize: 9, // Set the number of rows per page to 8
        }}
        size="middle"
      />
    </div>
  );
}

export default Tablegrid;
