import clsx from 'clsx';
import Image from 'next/image'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: string;
  name: string;
  size?: number;
}

export const Avatar: React.FC<Props> = ({ image, name, className, size = 40, ...props }) => {
  return (
    <div className={clsx('flex items-center justify-center', className)} {...props}>
      <Image
        key={image}
        src={image}
        alt={name}
        width={size}
        height={size}
        className={`w-${size} h-${size} rounded-full`}
      />
    </div>
  )
}