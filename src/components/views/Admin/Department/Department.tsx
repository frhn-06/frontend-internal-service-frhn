"use client"

import { useCallback, useEffect } from "react";
import useDepartment from "./useDepartment";
import TableUi from "@/components/ui/TableUi";
import listColumns from "./listColumns";
import Convert from "@/utils/convert.";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import AddDepartment from "./AddDepartment";
import DeleteDepartment from "./DeleteDepartment";

const Department = () => {
  const {
    page,
    limit,

    setUrl,

    dataDepartments,
    isLoadingDepartments,
    isRefetchingDepartments,
    refetchDepartments,
    isErrorDepartments,
    errorDepartments,

    handlePage,
    handleLimit,
    handleSearch,
    handleClearSearch
  } = useDepartment();

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback((
    data: Record<string, unknown>, 
    column: {
      label: string;
      id: string;
    }) => {

    const value = data[column.id as keyof typeof data];

    switch(column.id) {
      case "createdAt" :
        return Convert.dateToLocal(`${value}`)
      case "actions" :
        return (
          <div className="flex gap-2">
            <ButtonSolid
              as="link"
              href={`/admin/department/${data.id}`}
              size="sm" 
              className="bg-blue-500 hover:bg-blue-400"
            >
              Detail
            </ButtonSolid>
        
            <DeleteDepartment 
              data={data}
              refetch={refetchDepartments}
              ButtonOpen={(
                <ButtonSolid
                  size="sm"
                  className="bg-red-500 hover:bg-red-400 active:hover:bg-red-600"
                >
                  Delete
                </ButtonSolid>
              )}
            />
    
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchDepartments])

  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorDepartments ? (
        <div>
          {errorDepartments?.message}
        </div>
      ) : (
        <div className="relative min-h-10">
          <TableUi 
            renderCell={renderCell}
            data={dataDepartments?.data}
            totalData={dataDepartments?.data}
            columns={listColumns}

            isKeterangan

            textEmpty="kosong"

            isCreate
            contentCreate={(
              <AddDepartment refetch={refetchDepartments} />
            )}

            isSearch
            textSearch="Cari Department"
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}

            isLimit
            handleLimit={handleLimit}
            currentLimit={`${limit}`}

            isPagination
            currentPage={Number(page)}
            handlePagination={handlePage}
            totalPage={dataDepartments?.pagination?.totalPage}
          /> 

          {isLoadingDepartments && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}

          {isRefetchingDepartments && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </div>

  
  )
}

export default Department;