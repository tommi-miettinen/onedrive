import { twMerge } from "tailwind-merge";

type AvatarProps = {
  onClick?: () => void;
  displayLetter: string;
  ariaLabel?: string;
  className?: string;
};

const Avatar = ({ className, onClick, displayLetter, ariaLabel }: AvatarProps) => (
  <div
    tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "Enter" && onClick) {
        onClick();
      }
    }}
    aria-label={ariaLabel}
    onClick={onClick}
    className={twMerge(
      "text-white cursor-pointer h-[32px] w-[32px] rounded-full bg-black flex items-center justify-center hover:bg-opacity-80",
      className
    )}
  >
    {displayLetter}
  </div>
);

export default Avatar;
