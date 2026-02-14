import Image from "next/image";
import { cn } from "../../lib/utils";
import { Check, Close, Person } from "../Icons";
import { Text } from "../Text";

export interface UserListItemProps {
  className?: string;
  userName: string;
  userImageSrc?: string;
  timeLabel?: string;
  isAuthor: boolean;
  onAccept?(): void;
  onReject?(): void;
}

export function UserListItem({
  className,
  userName,
  userImageSrc,
  timeLabel,
  isAuthor = false,
  onAccept,
  onReject,
}: UserListItemProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex h-[50px] items-center justify-between gap-3 rounded-3 border border-gray-200 bg-white px-3",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
          {userImageSrc ? (
            <Image
              src={userImageSrc}
              alt={`${userName} profile`}
              fill
              className="object-cover"
            />
          ) : (
            <Person className="h-4.5 w-4.5 text-gray-500" />
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <Text
            size="body2"
            weight="bold"
            className="line-clamp-1 text-gray-900"
          >
            {userName}
          </Text>
          {timeLabel ? (
            <Text size="caption2" weight="regular" className="text-gray-600">
              {timeLabel}
            </Text>
          ) : null}
        </div>
      </div>

      {isAuthor ? (
        <div className="flex shrink-0 items-center gap-2">
          <>
            <button
              type="button"
              aria-label="수락"
              onClick={onAccept}
              className="inline-flex h-9 w-9 items-center justify-center rounded-2 bg-main-200 text-main-800 transition-colors hover:bg-main-300"
            >
              <Check className="h-4.5 w-4.5" strokeWidth={2.6} />
            </button>

            <button
              type="button"
              aria-label="거절"
              onClick={onReject}
              className="inline-flex h-9 w-9 items-center justify-center rounded-2 bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <Close className="h-4.5 w-4.5" strokeWidth={2.4} />
            </button>
          </>
        </div>
      ) : null}
    </div>
  );
}
