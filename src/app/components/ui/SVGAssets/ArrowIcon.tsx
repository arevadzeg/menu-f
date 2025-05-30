interface ArrowIconProps {
  className?: string;
}

const ArrowIcon = ({ className = '' }: ArrowIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7 12"
    >
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <polyline points="6 1 1 6 6 11"></polyline>
        </g>
      </g>
    </svg>
  );
};

export default ArrowIcon;
