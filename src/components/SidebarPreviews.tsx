import { ChannelList } from 'stream-chat-react'
import { LoggedUser} from '../types'
import { ChannelOptions, ChannelSort } from 'stream-chat'
import { ConversationPreview } from './ConversationPreview';
import { EmptyConversations } from './EmptyConversations';

interface Props {
    user: LoggedUser;
}

const options: ChannelOptions = { state: true, presence: true, limit: 100, watch: true };
const sort: ChannelSort = { last_message_at: -1 };

export const SidebarPreviews: React.FC<Props> = ({
    user,
}) => {
    return (
        <div className='flex-col bg-whatsappBgDeep h-full'>
            <ChannelList
                filters={{
                    members: {
                        $in: [user.id],
                    },
                }}
                sort={sort}
                options={options}
                showChannelSearch
                EmptyStateIndicator={EmptyConversations}
                Preview={(props) => (
                    <ConversationPreview
                        key={props.key}
                        {...props}
                    />
                )}
            />
        </div>
    )
}