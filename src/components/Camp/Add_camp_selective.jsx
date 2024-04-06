import React, { useContext, useEffect, useState } from "react";
import { Table, Input ,Button} from 'antd';
import DataContext from "../../context/data/DataContext";
import {writeBatch,doc} from "firebase/firestore";
import { database } from "../../../firebase";
const Add_cadet_to_camp = ({index}) => {
  const context = useContext(DataContext);
  const { cadets, setCadets } = context;
  const [filterData, setFilterData] = useState([]);
  const [selectedCadets, setSelectedCadets] = useState([]);
  
  const add_to_camp = async() => {
    var list=[];
    console.log("index",index);
      selectedCadets.map((cadet) => {
        const data = {
          cadet_num: cadet.id ,
          cadet_rank: cadet.rank ?? 'Unknown',
          cadet_name: cadet.name ?? 'Unknown',
          cadet_insti: cadet.college ?? 'Unknown',
          cadet_act: "",
          cadet_rem: "",
          cadet_veg: "Non Veg",
          campid: index??"Index not found",
        };
       list.push(data);
      });
      
      
      const batch = writeBatch(database);
    try {
        list.forEach((data) => {
          console.log(data);
            const cadetDocRef = doc(database, "cadet_in_camp",data.cadet_num);
            batch.set(cadetDocRef, data);
        });
        await batch.commit();
    } catch (e) {
        console.log(e);
    }
  };
  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );

      setSelectedCadets(selectedRows);

      console.log("selected cadets : ", selectedRows.length);
    },
  };

  const selectCol = [
    {
      title:'Sl No',
      dataIndex:'id',
      render:(text, record, index) => index + 1,
      fixed:'left',
      width:50
    },
    {
      title: "Cadet ID",
      dataIndex: "id",
      key: "cadetid",
    },
    {
      title: "Cadet Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cadet Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "College",
      dataIndex: "college",
      key: "college",
    },
  ];
  const [data, setDatas] = useState([]);

 
  const onSearch = (value, _e, info) => {
    const filter = cadets.filter((cadet) =>
      cadet.college.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      setFilterData([]);
    } else setFilterData(filter);
    console.log("filteredData : ", filterData);
  };



  useEffect(() => {
    console.log("Selected cadets: ", selectedCadets);
  }, [selectedCadets]);

  return (
    <div>
      <div style={{ display: "flex", width: "100%"  }} className="justify-between">
        <Button  className="items-left bg-blue-500 text-white ml-2" onClick={add_to_camp}>add to camp</Button>
        <Input.Search onSearch={onSearch} placeholder="Search" style={{ width: "40%" ,paddingBottom:"10px"}} />
      </div>

      <Table
      rowKey="id"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={selectCol}
        pagination={false}
        scroll={{ x: 10, y: 240 }}
        dataSource={filterData}
        
        className="flex-1 mx-2 self-center justify-center"
      />
    </div>
  );
};

export default Add_cadet_to_camp;

const styles=
{
  addbtn:{
    backgroundColor:"#1890ff",
    color:"white",
    borderRadius:"5px",
    marginBottom:"10px",
    
  }

}