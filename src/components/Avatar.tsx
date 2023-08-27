import clsx from 'clsx';
import Image from 'next/image'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: string;
  name: string;
  size?: number;
  online?: boolean
}

export const Avatar: React.FC<Props> = ({
  image,
  name,
  className,
  online = false,
  size = 40,
  ...props
}) => {
  return (
    <div className={clsx('relative flex items-center justify-center', className)} {...props}>
      <Image
        key={image}
        src={image}
        alt={name}
        width={size}
        height={size}
        className={`w-${size} h-${size} rounded-full`}
      />
      {online && (
        <span
          className='absolute h-2 w-2 rounded-full bg-green-400 bottom-0 right-0'
        />
      )}
    </div>
  )
}