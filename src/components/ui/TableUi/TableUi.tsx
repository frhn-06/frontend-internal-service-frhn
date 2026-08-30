"use client"
import { EmptyState, Table } from "@heroui/react"
import { ChangeEvent, useMemo } from "react";
import InputSearch from "../InputSearch";
import Limit from "../Limit";
import PaginationUi from "../Pagination";

interface TypeProps {
  renderCell: (
    data: Record<string, unknown>, 
    column: {id: string; label: string}
  ) => React.ReactNode;
  columns: {id: string; label: string}[];
  data: Record<string, unknown>[];

  textEmpty: string;

  isCreate?: boolean;
  contentCreate?: React.ReactNode;

  isSearch?: boolean
  textSearch?: string;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;

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

    isCreate,
    contentCreate,

    isSearch,
    textSearch,
    onSearch,
    onClearSearch,

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
      <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
        <span className="text-sm text-muted">
          {textEmpty}
        </span>
      </EmptyState>
    )
  }

  const topContent = useMemo(() => {
    if(isCreate || isSearch) {
      return (
        <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4">
          {isCreate && contentCreate}

          {isSearch && (
            <InputSearch 
              onSearch={onSearch}
              onClearSearch={onClearSearch}
              textSearch={textSearch}
      />
          )}
        </div>
      )
    }
  }, [onSearch, onClearSearch]);

  
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
  },[currentLimit, currentPage, totalPage])


  return (
    <div>
      {topContent}

      <Table className="min-h-40">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="min-w-[600px]">
            <Table.Header>
              {columns.map((column) => (
                <Table.Column key={column.id} isRowHeader>
                  {column.label}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {data?.length < 1 ? 
                renderEmpty() : 
                data?.map((dat) => (
                  <Table.Row key={`${dat.id}`}>
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