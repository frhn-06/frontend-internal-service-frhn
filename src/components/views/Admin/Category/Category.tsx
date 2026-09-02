"use client"

import { useCallback, useEffect } from "react";
import TableUi from "@/components/ui/TableUi";
import ButtonSolid from "@/components/ui/Button/ButtonSolid";
import useCategory from "./useCategory";
import { Chip } from "@heroui/react";
import { ICategory } from "@/types/category";
import listColumns from "./listColumns";

const Category = () => {
  const {
    page,
    limit,
    active,

    setUrl,

    dataCategories,
    isLoadingCategories,
    isRefetchingCategories,
    refetchCategories,
    isErrorCategories,
    errorCategories,

    handlePage,
    handleLimit,
    handleSearch,
    handleClearSearch,
    
    handleStatus
  } = useCategory();

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
      case "description" :
        return data.description ? value as React.ReactNode : "-";
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
          return (data.department as ICategory).name
        }
      case "actions" :
        return (
          <div className="flex gap-2">
            <ButtonSolid
              as="link"
              href={`/admin/Category/${data.id}`}
              size="sm" 
              className="bg-blue-500 hover:bg-blue-400"
            >
              Detail
            </ButtonSolid>
        
            {/* <DeleteCategory 
              data={data}
              refetch={refetchCategories}
              ButtonOpen={(
                <ButtonSolid
                  size="sm"
                  className="bg-red-500 hover:bg-red-400 active:hover:bg-red-600"
                >
                  Delete
                </ButtonSolid>
              )}
            /> */}

            {/* <ChangeStatus 
              data={data}
              refetch={refetchCategories}
              ButtonOpen={(
                <ButtonSolid
                  size="sm"
                  className="bg-green-500 hover:bg-green-400 active:hover:bg-green-600"
                >
                  Ubah Status ({data.isActive ? "NonActive" : "Active"})
                </ButtonSolid>
              )}
            /> */}
    
          </div>
        )
      default :
        return value as React.ReactNode
    }
  }, [refetchCategories])

  return (
    <>
      {isErrorCategories ? (
        <div>
          {errorCategories?.message}
        </div>
      ) : (
        <div className="relative min-h-10">
          <TableUi 
            renderCell={renderCell}
            data={dataCategories?.data}
            columns={listColumns}

            textEmpty="kosong"

            // isCreate
            // contentCreate={(
            //   <AddCategory refetch={refetchCategories} />
            // )}

            isSearch
            textSearch="Cari Category"
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
            totalPage={dataCategories?.pagination?.totalPage}
          /> 

          {isLoadingCategories && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}

          {isRefetchingCategories && (
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 backdrop-blur-xs rounded-2xl" />
          )}
            
        </div>

      )}
    </>

  
  )
}

export default Category;