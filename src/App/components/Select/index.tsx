import { useState, MouseEvent, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import dropDownIcon from '../../../images/select/drop-down.png'; 

type Item = {
	name: string;
	value: string;
}

interface Props {
	list: Item[];
	hint: string;
	handleOnChange: (value: string) => void;
}

export function Select(props: Props) {
	const { list, hint, handleOnChange } = props;
	const { pathname } = useLocation();
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [isShowList, setIsShowList] = useState<boolean>(false);

	const toggleIsShowList: () => void = () => setIsShowList(preIsShowList => !preIsShowList)

	const handleOnClick: (
			e: MouseEvent<HTMLParagraphElement>, 
			value: Item
		) => void = (e, value) => {
		e.stopPropagation();
		toggleIsShowList();
		if (selectedValue && selectedValue === value.value) {
			return;
		}
		setSelectedValue(value.name);
		handleOnChange(value.value);
	}

	useEffect(() => {
		if (selectedValue) {
			setSelectedValue('');
		}
	}, [pathname, setSelectedValue]);

	return (
		<div className="selected-group" onClick={toggleIsShowList}>
			<p className="selected-value">
				<span>{selectedValue || hint}</span>
				<span className="drop-down">
					<img className={isShowList ? 'rotate' : ''} src={dropDownIcon} alt="drop" />
				</span>
			</p>
			{isShowList && <div className="select-list">
				{list
					.map((listItem, index) => (
						<p key={index} onClick={e => handleOnClick(e, listItem)} >{listItem.name}</p>
				))}
			</div>}
		</div>
	);
};
