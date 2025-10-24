import { useState } from "react";
import { deleteTodos, getTodos, completedTodo } from "../api/todoapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import AddTodo from "./AddTodo";
import { Checkbox, IconButton, Snackbar, Tooltip } from "@mui/material";

function Todolist() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data, error, isSuccess } = useQuery({
      queryKey: ["todos"],
      queryFn: getTodos,
    });

    const { mutate: toggleMutate } = useMutation({
      mutationFn: completedTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"]});
      },
      onError: (err) => {
        console.log(err);
      }
    });

    const { mutate } = useMutation(deleteTodos, {
      onSuccess: () => {
        setOpen(true);
        queryClient.invalidateQueries({ queryKey: ["todos"]});
      },
      onError: (err) => {
        console.log(err);
      },
    });

    const columns: GridColDef[] = [
      { field: "isCompleted", headerName: "Completed", width: 100,
        renderCell: (params: GridCellParams) => (
          <Checkbox checked={params.row.isCompleted}
          onClick={() => {
            toggleMutate(params.row._links.self.href)
          }}/>
        )
      },
      { field: "content", headerName: "할 일 내용", width: 400 },
      {
        field: "delete",
        headerName: "",
        width: 90,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridCellParams) => (
          <Tooltip title="Delete Car">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                if (
                  confirm(
                    `${params.row.brand}의 ${params.row.model} 자동차를 삭제하시겠습니까?`
                  )
                ) {
                  mutate(params.row._links.self.href);
                }
              }}
            >
            </IconButton>
          </Tooltip>
        ),
      },
    ];

    if (!isSuccess) {
      return <span>Loading...🕛</span>
    }

    if (error) {
      return <span>실패 !</span>
    } else {
      return (
        <>
          <AddTodo />
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._links.self.href}
          />
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="선택한 정보가 삭제되었습니다 🚓"
          />
        </>
      );

    }
}

export default Todolist