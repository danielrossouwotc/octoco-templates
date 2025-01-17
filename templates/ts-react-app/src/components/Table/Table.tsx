import { ErrorTwoTone } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridRowsProp } from '@mui/x-data-grid';
import { TableToolbar } from './components/TableToolbar';

interface TableProps {
    rows: GridRowsProp,
    columns: GridColDef[],
    pageSizeOptions: number[],
    loading: boolean,
    refetch: () => void,
    isFetching: boolean,
    paginationModel: GridPaginationModel,
    setPaginationModel: (paginationModel: GridPaginationModel) => void,
    totalRows: number,
    onRowClick?: (row: any) => void;
    error?: boolean;
}

/**
 * Renders a table component with the provided data and options.
 *
 * @param {TableProps} props - The props for the Table component.
 * @returns {JSX.Element} The rendered Table component.
 */
export function Table({
    rows,
    columns,
    pageSizeOptions,
    loading,
    refetch,
    isFetching,
    paginationModel,
    setPaginationModel,
    totalRows,
    onRowClick,
    error,
}: TableProps) {

    return (
        <DataGrid
            density="compact"
            components={{
                Toolbar: TableToolbar,
                NoRowsOverlay: () => (
                    <Stack height='100%' alignItems='center' justifyContent='center'>
                        {error ? <ErrorTwoTone fontSize='large' color='error' /> : 'No rows'}
                    </Stack>
                ),
            }}
            componentsProps={{
                toolbar: { refetch: refetch, isFetching: isFetching },
            }}
            rows={rows}
            columns={columns}
            pagination={true}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode='server'
            pageSizeOptions={pageSizeOptions}
            checkboxSelection
            disableRowSelectionOnClick
            loading={loading || isFetching}
            rowCount={totalRows}
        />
    );
}

export default Table;