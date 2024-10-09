interface Props {
  message: string;
}
export const Error = ({ message }: Props) => {
  return (
    <div className="mt-1">
      <p className="text-red-600 font-semibold">{message}</p>
    </div>
  );
};
