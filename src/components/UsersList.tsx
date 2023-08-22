
import { ChannelList, ChannelListMessengerProps, useChatContext } from 'stream-chat-react'
import { LoggedUser, User } from '../types'
import { ChannelOptions, ChannelSort } from 'stream-chat'
import { useState } from 'react';
import { UserPreview } from './UserPreview';

interface Props {
    user: LoggedUser;
    contacts: User[]
    addedUsers: User[]
    onUserAdd: (user: User) => () => void
    onUserRemove: (user: User) => () => void
}

const options: ChannelOptions = { state: true, presence: true, limit: 10 };
const sort: ChannelSort = { last_message_at: -1 };

const UserListHeader: React.FC<ChannelListMessengerProps> = ({
    setChannels,
    error,
    LoadingErrorIndicator,
    LoadingIndicator,
    loadedChannels,
    loading,
}) => {
    const [users, setUsers] = useState([]);
    const [listEmpty, setListEmpty] = useState(false);
    const { channel: activeChannel, client } = useChatContext();

    /*     useEffect(() => {
            const getUsers = async () => {
                if (loading) return;
    
                try {
                    const response = await client.queryUsers(
                        { id: { $ne: client.userID } },
                        { id: 1 },
                        { limit: 8 }
                    );
    
                    if (response.users.length) {
                        setUsers(response.users);
                    } else {
                        setListEmpty(true);
                    }
                } catch (error) {
                    console.log(error)
                }
                setLoading(false);
            }
    
            if (client) getUsers()
        }, []); */

    console.log(loadedChannels)

    return (
        <div className='flex items-center justify-between p-4 border-b border-gray-500'>
            <div className='text-gray-400 font-bold text-lg'>Users</div>

            <div className='text-gray-400 font-bold text-lg'>
                {loadedChannels?.map((channel) => {
                    const members = Object.values(channel.state.members).filter(({ user }) => !!user);
                    return members.map((member) => {
                        return (
                            <div key={channel.id} className='flex items-center justify-between p-4 border-b border-gray-500'>
                                <div className='text-gray-400 font-bold text-lg'>{member.user?.name}</div>
                            </div>
                        )
                    })

                })}
            </div>
        </div>
    )
}



export const UsersList: React.FC<Props> = ({
    user,
    contacts,
    addedUsers,
    onUserAdd,
    onUserRemove,
}) => {
    return (
        <div className='flex-col bg-whatsappBgDeep h-full'>
            <ChannelList
                filters={{
                    members: {
                        $in: [user.id]
                    }
                }}
                sort={sort}
                options={options}
                Preview={(props) => <UserPreview contacts={contacts} {...props} />}
            />
        </div>
    )
}