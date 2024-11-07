import { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./App.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "antd";
import { FlexModal } from "./components/FlexModal";
import { RowModel } from "./models/Row.model";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<any>(null);
  // ROW DATA
  const [rowData, setRowData] = useState<RowModel[]>([
    {
      id: 1,
      name: "Emre",
      surname: "Bican",
      state: true,
      description: "desc example 1",
    },
  ]);

  // COLUMN DEFINITIONS
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
      cellRenderer: ({ data }: any) => {
        const deleteRow = () => {
          setRowData((prev) => prev.filter((row) => row.id !== data.id));
        };

        const updateRow = () => {
          console.log(data, "CELL DATA");

          setUpdatedData(data);
          setIsModalOpen(true);
        };

        return (
          <div>
            <Button type="primary" onClick={updateRow}>
              update
            </Button>
            <Button type="primary" danger onClick={deleteRow}>
              delete
            </Button>
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

  useEffect(() => {
    console.log(rowData, "ROW DATA last");
  }, [rowData]);

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

  const handleUpdate = (values: any) => {
    setUpdatedData(null);
    setRowData((prev) =>
      prev.map((row) => (row.id === values.id ? values : row))
    );
    setIsModalOpen(false);
  };

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
        data={updatedData}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default App;
