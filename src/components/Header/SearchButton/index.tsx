import { BiSearchAlt } from 'react-icons/bi';

import { Button } from '@nextui-org/react';

type props = {
	onClick?: () => void;
};
const SearchButton = ({ onClick }: props) => {
	return (
		<Button type='submit' auto onPress={onClick}>
			<BiSearchAlt></BiSearchAlt>
		</Button>
	);
};

export default SearchButton;
