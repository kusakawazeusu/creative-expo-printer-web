import { X } from "lucide-react";

function Item({ item = {}, onDelete }) {
  return (
    <div className="flex justify-between items-center border-b-2 last:border-none border-primary text-primary py-6">
      <p className="text-4xl font-bold">{item.name}</p>
      <button>
        <X className="w-12 h-12" onClick={() => onDelete(item.id)} />
      </button>
    </div>
  );
}

export default Item;
