import { useEffect, useState, Fragment } from "react";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import "./App.css";

import { AgGrid } from "./components/AgGrid";
import { FlexModal } from "./components/FlexModal";
import { RowModel } from "./models/Row.model";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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

  useEffect(() => {
    console.log(rowData, "ROW DATA last");
  }, [rowData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
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

  // row functions
  const onDeleteRow = (id: number) => {
    setRowData((prev) => prev.filter((row) => row.id !== id));
  };

  const onUpdateRow = (data: RowModel) => {
    setUpdatedData(data);
    setIsModalOpen(true);
  };

  return (
    <Fragment>
      <Flex gap="middle" align="left" vertical>
        <Title level={2}>AG Grid</Title>
        <Button
          color="default"
          variant="solid"
          id="modal-btn"
          onClick={showModal}
        >
          Add New
        </Button>

        <AgGrid
          rowData={rowData}
          onDeleteRow={onDeleteRow}
          onUpdateRow={onUpdateRow}
        />
      </Flex>
      <FlexModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        data={updatedData}
        handleUpdate={handleUpdate}
      />
    </Fragment>
  );
}

export default App;
