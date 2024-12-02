import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";


type ContestInfo = {
  id: string;
  title: string;
  state: string;
  startTime: string;
  endTime: string;
};

export default function CustomizedDataGrid({ rows }: { rows: ContestInfo[] }) {
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Title', flex: 1 },
      {
        field: 'type',
        headerName: 'Type',
        flex: 1,
        valueGetter: (params: any) => (params?.row?.state.includes('manual') ? 'manual' : 'automatic'),
      },
      {
        field: 'state',
        headerName: 'State',
        flex: 1,
        valueGetter: (params: any) => params?.row?.state,
      },
      {
        field: 'startTime',
        headerName: 'Start Time',
        flex: 1,
        valueFormatter: (params: any) =>
          dayjs(params.value).format('ddd, MMM D, YYYY h:mm A'),
      },
      {
        field: 'endTime',
        headerName: 'End Time',
        flex: 1,
        valueFormatter: (params: any) =>
          dayjs(params.value).format('ddd, MMM D, YYYY h:mm A'),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <div>
            <button onClick={() => handleEdit(params.row)}>Edit</button>
            <button onClick={() => handleDelete(params.row)}>Delete</button>
          </div>
        ),
      },
    ];
  
    const handleEdit = (row: ContestInfo) => {
      alert(`Editing contest: ${row.title}`);
    };
  
    const handleDelete = (row: ContestInfo) => {
      alert(`Deleting contest: ${row.title}`);
    };
  
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns}  />
      </div>
    );
  }
