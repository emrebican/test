import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Flex } from "antd";
import { RowModel } from "../models/Row.model";

export const AgGrid: React.FC<{
  rowData: RowModel[];
  onDeleteRow: (id: number) => void;
  onUpdateRow: (data: RowModel) => void;
}> = ({ rowData, onDeleteRow, onUpdateRow }) => {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: false,
    }),
    []
  );

  const rowStyle = { textAlign: "left" };

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
        return (
          <Flex align="center" wrap gap={4} style={{ height: "100%" }}>
            <Button
              //   id={`update-button-${data.id.toString()}`}
              data-testid={`update-button-${data.id.toString()}`}
              type="primary"
              onClick={() => onUpdateRow(data)}
            >
              update
            </Button>
            <Button
              //   id={`delete-button-${data.id.toString()}`}
              data-testid={`delete-button-${data.id.toString()}`}
              type="primary"
              danger
              onClick={() => onDeleteRow(data.id)}
            >
              delete
            </Button>
          </Flex>
        );
      },
    },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        defaultColDef={defaultColDef}
        rowStyle={rowStyle}
        pagination={false}
      />
    </div>
  );
};
