import Image from 'next/image';
import { Text } from '../Text';

interface UserListItemProps {
  className?: string;
  userName: string;
  userImageSrc?: string;
  isAuthor: boolean;
  onAccept?(): void;
  onReject?(): void;
}

export function UserListItem({
  className,
  userName,
  userImageSrc,
  isAuthor = false,
  onAccept,
  onReject,
}: UserListItemProps): React.ReactElement {
  return (
    <div className={`rounded-2 bg-main-200 flex items-center gap-2 p-4 ${className}`}>
      <Image
        src={userImageSrc ?? '/DefaultProfile.png'}
        alt="user-profile-image"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="flex w-full items-center justify-between">
        <Text>{userName}</Text>
        {isAuthor && (
          <div className="flex gap-2">
            <Text
              size={'caption3'}
              weight={'medium'}
              onClick={onAccept}
              className="bg-mint-500 rounded-1 cursor-pointer px-1.5 py-1"
            >
              수락
            </Text>
            <Text
              size={'caption3'}
              weight={'medium'}
              onClick={onReject}
              className="rounded-1 cursor-pointer bg-red-400 px-1.5 py-1"
            >
              거절
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
