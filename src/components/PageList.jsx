import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../store/page-slice';

import styled from 'styled-components';

function PageList() {
  const dispatch = useDispatch();

  const totalPageNumber = useSelector((state) => state.page.totalPageNumber);
  const currentPage = useSelector((state) => state.page.currentPage);

  const pageArray = [...new Array(totalPageNumber)];

  const renderPagination = () => {
    return (
      <>
        {pageArray.map((v, i) => (
          <PageButton key={i + 1} onClick={() => dispatch(setCurrentPage(i + 1))} active={currentPage === i + 1}>
            {i + 1}
          </PageButton>
        ))}
      </>
    );
  };

  return <PagenationContainer>{renderPagination()}</PagenationContainer>;
}

const PagenationContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const PageButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) =>
    active &&
    `
      background: gray;
      color: #fff;
  `}
  margin-right: 3px;
`;

export default PageList;
