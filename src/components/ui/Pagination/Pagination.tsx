import { Pagination } from "@heroui/react";


interface TypeProps {
  handlePagination?: (e:number) => void;
  currentPage?: number;
  totalPage?: number;
}
const PaginationUi = (props: TypeProps) => {
  const {
    handlePagination,
    currentPage,
    totalPage
  } = props;

  return (
    <Pagination className="justify-center">
      <Pagination.Content className="gap-1 rounded-xl bg-default p-1">
        <Pagination.Item>
          <Pagination.Previous
            className= "text-muted hover:bg-surface hover:text-foreground"
            onPress={() => handlePagination?.(Number(currentPage) - 1)}
            isDisabled={Number(currentPage) <= 1}
          >
            <Pagination.PreviousIcon />
          </Pagination.Previous>
        </Pagination.Item>

        {Array.from({length: Number(totalPage)})?.map((_, i) => (
          <Pagination.Item key={i + 1}>
            <Pagination.Link
              className={
                i + 1 === Number(currentPage) ? 
                "bg-accent text-accent-foreground hover:bg-accent-hover" : 
                "text-muted hover:bg-surface hover:text-foreground"
              }
              isActive={i + 1 === Number(currentPage)}
              onPress={() => handlePagination?.(i + 1)}
            >
              {i + 1}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        <Pagination.Item>
          <Pagination.Next
            className="text-muted hover:bg-surface hover:text-foreground"
            onPress={() => handlePagination?.(Number(currentPage) + 1)}
            isDisabled={Number(currentPage) >= Number(totalPage)}
          >
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  )
}

export default PaginationUi;