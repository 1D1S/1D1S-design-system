import { Text } from '../Text';
import { Logo } from '../icons/Logo';

export function PageWatermark(): React.ReactElement {
  return (
    <div className="flex items-end gap-2">
      <Logo width={24} height={40} className="text-gray-300" />
      <Text size="body1" weight="bold" className="my-2.5 text-gray-300">
        1D1S
      </Text>
    </div>
  );
}
