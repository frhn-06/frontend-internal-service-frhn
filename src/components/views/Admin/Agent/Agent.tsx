"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import listColumns from "./listColumns";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import useAgent from "./useAgent";
import { Chip } from "@heroui/react";
import AddAgent from "./AddAgent";
import { IAgent } from "@/types/agent";

const Agent = () => {
  const {
    page,
    limit,
    active,

    setUrl,

    dataAgents,
    isLoadingAgents,
    isRefetchingAgents,
    refetchAgents,
    isErrorAgents,
    errorAgents,

    handlePage,
    handleLimit,
    handleSearch,
    handleClearSearch,
    
    handleStatus
  } = useAgent();

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
      case "departmentId" :
        if(data.departmentId === null) {
          return "Kosong"
        } else {
          return (data.department as IAgent).name
        }
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
        
            {/* <DeleteDepartment 
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
            /> */}
    
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchAgents])

  return (
    <>
      {isErrorAgents ? (
        <div>
          {errorAgents?.message}
        </div>
      ) : (
        <div className="relative min-h-10">
          <TableUi 
            renderCell={renderCell}
            data={dataAgents?.data}
            columns={listColumns}

            textEmpty="kosong"

            isCreate
            contentCreate={(
              <AddAgent refetch={refetchAgents} />
            )}

            isSearch
            textSearch="Cari Agent"
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}

            isLimit
            handleLimit={handleLimit}
            currentLimit={`${limit}`}

            isStatus
            onChangeStatus={handleStatus}
            currentStatus={`${active}`}

            isPagination
            currentPage={Number(page)}
            handlePagination={handlePage}
            totalPage={dataAgents?.pagination?.totalPage}
          /> 

          {isLoadingAgents && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}

          {isRefetchingAgents && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </>

  
  )
}

export default Agent;