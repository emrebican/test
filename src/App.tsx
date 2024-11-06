import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./App.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "antd";
import { FlexModal } from "./components/FlexModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "Emre",
      surname: "Bican",
      state: true,
      description: "desc example 1",
    },
  ]);

  /*  */
  const ActionRow = (params: any) => {
    const deleteRow = () => {
      console.log(params.node.data, "PARAMS");
      console.log(rowData, "rowData");

      // params.api.applyTransaction({ remove: [params.node.data] });

      const filteredData = rowData.filter(
        (row) => row.id !== params.node.data.id
      );
      setRowData(filteredData);
    };

    const updateRow = () => {
      setData(params.node.data);
      setIsModalOpen(true);
      console.log(params.node.data, "PARAMS");
    };

    return (
      <>
        <Button type="primary" onClick={updateRow}>
          Update
        </Button>
        <Button type="primary" danger onClick={deleteRow}>
          Delete
        </Button>
      </>
    );
  };
  /*  */

  const [columns] = useState<any>([
    { field: "name", editable: false },
    { field: "surname", editable: false },
    {
      field: "state",
      editable: false,
      cellRenderer: (params: any) => {
        return params.value ? "Active" : "Inactive";
      },
    },
    { field: "description", editable: false },
    {
      field: "actions",
      editable: false,
      cellRenderer: ({ data }) => {
        const test = () => {
          console.log(data, "DATA test");
          console.log(rowData, "ROWDATA test");

          const filteredData = rowData.filter(
            (row) => row.id !== data.id
          );
          console.log(filteredData, "filteredData");
          
          setRowData(filteredData);
        };

        return (
          <div>
            <button>update</button>
            <button onClick={test}>delete</button>
          </div>
        );
      },
    },
  ]);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: false,
    }),
    []
  );

  const rowStyle = { textAlign: "left" };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values: any) => {
    setRowData((prevRowData) => [...prevRowData, values]);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(rowData, "ROW DATA last");
  }, [rowData]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New
      </Button>
      <div className="ag-theme-quartz" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          rowStyle={rowStyle}
          pagination={false}
        />
      </div>

      <FlexModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={data}
      />
    </>
  );
}

export default App;
