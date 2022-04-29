export default function Book({
  name,
  author,
  onDelete,
}: {
  name: string;
  author: string;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="c-book">
      <h2 className="c-book__name">{name}</h2>
      <span className="c-book__author">{author}</span>
      <button className="c-book__delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
