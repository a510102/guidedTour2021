import { useEffect } from 'react';

import { useAppDispatch, usePagination } from '../../../helpers';
import { prePage, nextPage, changeTotalPage } from '../../../store/pagination';

import preIcon from '../../../images/pagination/pre.png';
import nextIcon from '../../../images/pagination/next.png';

interface Props {
	currentTotalPage: number;
}

export function Pagination(props: Props) {
	const { currentTotalPage } = props;
	const dispatch = useAppDispatch();
	const { currentPage, totalPage } = usePagination();
	
	const handlePrePage = () => {
		dispatch(prePage());
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handleNextPage = () => {
		dispatch(nextPage());
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		if (currentTotalPage > 1) {
			dispatch(changeTotalPage({totalPage: currentTotalPage}));
		}
	}, [currentTotalPage]);

	return (
		<>
			{totalPage > 1 && (
				<div className="pagination">
					<button onClick={handlePrePage} disabled={currentPage === 1}>
						<img src={preIcon} alt="pre icon" />
					</button>
					<p className="pagination-page">{currentPage}</p>
					<button onClick={handleNextPage} disabled={currentPage === totalPage}>
						<img src={nextIcon} alt="next icon" />
					</button>
				</div>
			)}
		</>
	)
};