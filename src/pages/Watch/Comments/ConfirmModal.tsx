import React from 'react';

import { Button, Grid, Modal, Text } from '@nextui-org/react';

const ConfirmModal = ({
	open,
	onClose,
	onConfirm,
}: {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}) => {
	return (
		<Modal open={open}>
			<Modal.Header>
				<Text h4>Confirm</Text>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure to delete this comment?</p>
			</Modal.Body>
			<Modal.Footer>
				<Grid.Container gap={1} wrap='nowrap' justify='center'>
					<Grid>
						<Button onClick={() => onClose()} bordered color='default' size={'sm'}>
							Cancel
						</Button>
					</Grid>
					<Grid>
						<Button onClick={() => onConfirm()} color='error' size={'sm'}>
							Confirm
						</Button>
					</Grid>
				</Grid.Container>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmModal;
