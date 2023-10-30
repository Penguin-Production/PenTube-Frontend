import { useState, useEffect } from 'react';

import ChannelApi from '../../utils/apis/channel.api';
import { CHANNEL_TYPE } from '../../utils/dto/channel.type';

export default function ListChannel() {
	const [listChannel, setListChannel] = useState<CHANNEL_TYPE[]>([]);

	useEffect(() => {
		ChannelApi.getListChannel().then((res) => {
			setListChannel(res.data);
		});
	}, []);

	return (
		<div>
			<p>Your channel list</p>
			<div className='flex gap-5'>
				{listChannel.reverse().map((channel, index) => (
					<div
						key={index}
						className='rounded-lg w-10 h-10'
						style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
					>
						<img src={channel.imageUrl} alt={channel.name} />
						<p>{channel.name}</p>
						<p>{channel.subscriber?.length ?? 0} subscribers</p>
					</div>
				))}
			</div>
		</div>
	);
}
