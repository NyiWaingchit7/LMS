interface Props {
  label: string;
}
export const InputLabel = ({ label }: Props) => {
  return (
    <label htmlFor={label} className="block capitalize font-medium mb-2">
      {label}
    </label>
  );
};
