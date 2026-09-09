"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import listColumns from "./listColumns";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import { Chip } from "@heroui/react";
import useEmployee from "./useEmployee";
import ChangeStatus from "./ChangeStatus";
import { listStatus } from "@/configs/tableConfig";

const Employee = () => {
  const {
    page,
    limit,
    active,

    setUrl,

    dataEmployees,
    isLoadingEmployees,
    isRefetchingEmployees,
    refetchEmployees,
    isErrorEmployees,
    errorEmployees,

    handlePage,
    handleLimit,
    handleSearch,
    handleClearSearch,
    
    handleStatus
  } = useEmployee();

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
      case "isActive" : 
        return (
          <Chip color={data.isActive ? "accent" : "warning"}>
            {data.isActive ? "Active" : "NonActive"}
          </Chip>
        )
      case "actions" :
        return (
          <div className="flex gap-2">

            <ChangeStatus 
              data={data}
              refetch={refetchEmployees}
              ButtonOpen={(
                <ButtonSolid
                  size="sm"
                  className="bg-green-500 hover:bg-green-400 active:hover:bg-green-600"
                >
                  Change Status ({data.isActive ? "NonActive" : "Active"})
                </ButtonSolid>
              )}
            />
    
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchEmployees])

  return (
    <div className="px-2 py-6 lg:px-6 lg:py-12">
      {isErrorEmployees ? (
        <div>
          {errorEmployees?.message}
        </div>
      ) : (
        <div className="relative min-h-10">
          <TableUi 
            renderCell={renderCell}
            data={dataEmployees?.data}
            columns={listColumns}

            textEmpty="kosong"

            isSearch
            textSearch="Cari Employee"
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}

            isLimit
            handleLimit={handleLimit}
            currentLimit={`${limit}`}

            isStatus
            onChangeStatus={handleStatus}
            currentStatus={`${active}` || "all"}
            listStatus={listStatus}

            isPagination
            currentPage={Number(page)}
            handlePagination={handlePage}
            totalPage={dataEmployees?.pagination?.totalPage}
          /> 

          {isLoadingEmployees && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}

          {isRefetchingEmployees && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </div>

  
  )
}

export default Employee;