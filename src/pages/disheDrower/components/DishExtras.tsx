import { Checkbox } from "@/components/ui/checkbox";

type Extra = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  categoryName: string;
  selected: string[];
  setSelected: (ids: string[]) => void;
};

const extras: Extra[] = [
  { id: "cheese", name: "Сырный лаваш", price: 20 },
  { id: "mushrooms", name: "Грибы", price: 30 },
];

function DishExtras({ selected, setSelected }: Props) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="mt-6">
      <p className="font-semibold mb-3">Дополнительно</p>

      <div className="space-y-3">
        {extras.map((extra) => {
          const checked = selected.includes(extra.id);

          return (
            <label
              key={extra.id}
              className={`
              flex items-center justify-between
              p-3 rounded-xl
              ${checked ? "bg-white" : "bg-gray-50"}
              `}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(extra.id)}
                />
                <span>{extra.name}</span>
              </div>

              <span className="text-gray-500">+{extra.price} ₽</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default DishExtras;
