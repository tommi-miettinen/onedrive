import { twMerge } from "tailwind-merge";

type AvatarProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  displayLetter: string;
  ariaLabel?: string;
  className?: string;
};

const Avatar = ({ className, onClick, displayLetter, ariaLabel }: AvatarProps) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    className={twMerge(
      "text-white cursor-pointer h-[32px] w-[32px] rounded-full bg-black flex items-center justify-center hover:bg-opacity-80",
      className
    )}
  >
    {displayLetter}
  </button>
);

export default Avatar;
