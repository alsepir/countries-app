import { Pagination as MUPagination, Box, Typography } from '@material-ui/core';
import { ReactComponent as PaginationIcon } from '../../assets/images/pagination.svg';
import './Pagination.scss';

interface PaginationItemProps {
  page: number;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

function PaginationItem({ page, count, isActive, onClick }: PaginationItemProps) {
  return (
    <Box
      className={`pagination-item ${isActive && 'pagination-item_active'}`}
      sx={{ marginRight: page < count ? '10px' : 0, }}
      onClick={onClick}
    >
      <PaginationIcon className={'pagination-item__icon'} />
      <Box className={'pagination-item__label'}>
        <Typography>{page}</Typography>
      </Box>
    </Box>
  );
}

interface Props {
  count: number;
  active: number;
  onChange: (page: number) => void;
}

export default function Pagination({ count, active, onChange }: Props) {
  return (
    <MUPagination
      count={count}
      hideNextButton={true}
      hidePrevButton={true}
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          page={item.page}
          isActive={item.page === active}
          count={count}
          onClick={() => onChange(item.page)}
        />
      )}
    />
  );
}