import React from 'react';

import { Modal } from '@nextui-org/react';

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
		<Modal>
			<Modal.Header>Confirm</Modal.Header>
			<Modal.Body>
				<p>Are you sure to delete this comment?</p>
			</Modal.Body>
			<Modal.Footer onClick={onClose}>Cancel</Modal.Footer>
			<Modal.Footer onClick={onConfirm}>Confirm</Modal.Footer>
		</Modal>
	);
};

export default ConfirmModal;
