interface Props {
  label: string;
}
export const InputLabel = ({ label }: Props) => {
  return (
    <label htmlFor={label} className="capitalize">
      {label}
    </label>
  );
};
