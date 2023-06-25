import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


interface UserAvatarProps {
  username: string; 
  src: string; 
}

const UserAvatar: FC<UserAvatarProps> = ({ username, src }) => {
  return <Avatar>
    <AvatarImage src={src} />
    <AvatarFallback>
        {username[0]}
    </AvatarFallback>
  </Avatar>
}

export default UserAvatar