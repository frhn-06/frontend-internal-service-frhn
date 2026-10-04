"use client"
import { EmptyState, Table } from "@heroui/react"
import { ChangeEvent, useMemo } from "react";
import InputSearch from "../InputSearch";
import Limit from "../Limit";
import PaginationUi from "../Pagination";
import SelectUi from "../SelectUi";

interface TypeProps {
  renderCell: (
    data: Record<string, unknown>, 
    column: {id: string; label: string}
  ) => React.ReactNode;
  columns: {id: string; label: string}[];
  data: Record<string, unknown>[];

  textEmpty: string;

  ariaLabel?: string;

  isCreate?: boolean;
  contentCreate?: React.ReactNode;

  isSearch?: boolean
  textSearch?: string;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;

  isStatus?: boolean;
  onChangeStatus?: (value: string) => void;
  currentStatus?: string;
  listStatus?: {id: string; label: string}[]

  isPriority?: boolean;
  onChangePriority?: (value: string) => void;
  currentPriority?: string;
  listPriority?: {id: string; label: string}[];

  isLimit?: boolean;
  currentLimit?: string;
  handleLimit?: (value: string)=>void;

  isPagination?: boolean
  currentPage?: number;
  handlePagination?: (e: number) => void;
  totalPage?: number;
}

const TableUi = (props: TypeProps) => {
  const {
    renderCell,
    data,
    columns,

    textEmpty,

    ariaLabel = "table",

    isCreate,
    contentCreate,

    isSearch,
    textSearch,
    onSearch,
    onClearSearch,

    isStatus,
    onChangeStatus,
    currentStatus,
    listStatus,

    isPriority,
    onChangePriority,
    currentPriority,
    listPriority,

    isLimit,
    currentLimit,
    handleLimit,

    isPagination,
    currentPage,
    handlePagination,
    totalPage
  } = props;

  const renderEmpty = () => {
    return (
      <EmptyState className="flex h-20 w-full flex-col items-center justify-center gap-4 text-center">
        <span className="text-sm text-white">
          {textEmpty}
        </span>
      </EmptyState>
    )
  }

  const topContent = useMemo(() => {
    if(isCreate || isSearch || isStatus || isPriority) {
      return (
        <div>
          <div className="mb-4 gap-4">
            {isCreate && contentCreate}

          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start mb-4 gap-4">
            {isSearch && (
              <InputSearch 
                onSearch={onSearch}
                onClearSearch={onClearSearch}
                textSearch={textSearch}
              />
            )}

            {isStatus && (
              <SelectUi
                currentSelect={currentStatus}
                handleSelect={onChangeStatus}
                listSelect={listStatus}
                label="Status"
              />
            )}

            {isPriority && (
              <SelectUi 
                currentSelect={currentPriority}
                handleSelect={onChangePriority}
                listSelect={listPriority}
                label="Prioritas"
              />
            )}
          </div>
        </div>
      )
    }
  }, [onSearch, onClearSearch, onChangeStatus]);

  
  const bottomContent = useMemo(() => {
    if(isLimit || isPagination) {
      return (
        <div className="flex flex-col lg:flex-row justify-center items-center mt-4 gap-4">
          {isLimit && (
            <Limit 
              currentLimit={`${currentLimit}`}
              handleLimit={handleLimit}
            />
          )}

          {isPagination && totalPage && (
            <PaginationUi
              handlePagination={handlePagination}
              currentPage={currentPage}
              totalPage={totalPage}
            />
          )}
        </div>
      )
    }
  },[handleLimit, handlePagination])


  return (
    <div>
      {topContent}

      <Table className="min-h-10 bg-background-element border">
        <Table.ScrollContainer>
          <Table.Content aria-label={ariaLabel} className="min-w-[600px]">
            <Table.Header className="bg-background-element">
              {columns.map((column) => (
                <Table.Column key={column.id} isRowHeader className="text-white">
                  {column.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body 
              renderEmptyState={() => renderEmpty()}
            >
              { 
                data?.map((dat) => (
                  <Table.Row key={`${dat.id}`} className="hover:bg-gray-200">
                    {columns.map((column) => (
                      <Table.Cell key={column.id}>
                        {renderCell(dat, column)}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>


      {bottomContent}
    </div>
  )
}

export default TableUi;