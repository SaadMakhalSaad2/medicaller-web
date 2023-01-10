import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )

    const DirectPreview = () => {
        const memebers = Object
            .values(channel.state.memebers)
            .filter(({ user }) => user.id != client.userID);
        return (
            <div className='channel-preview__item single'>
                <Avatar
                    image={memebers[0].user?.image}
                    name={memebers[0].user?.fullName}
                    size={24}
                />
                <p>{memebers[0].user?.fullName}</p>
            </div>
        );
    }

    return (
        <div className={
            channel?.id === activeChannel?.id ?
                'channel-preview__wrapper__selected'
                : 'channel-preview__Wrapper'}
            onClick={() => {
                console.log(channel);
            }}
        >
            {type === 'team ' ?
                <ChannelPreview />
                : <DirectPreview />}

        </div>
    )
}

export default TeamChannelPreview