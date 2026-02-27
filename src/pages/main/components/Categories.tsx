const items = [
  { name: "Рестораны", icon: "🍔" },
  { name: "Продукты", icon: "🛒" },
  { name: "Объявления", icon: "👜" },
  { name: "Камеры", icon: "📷" },
];

export function Categories() {
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {item.icon}
            </div>

            <span className="text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
