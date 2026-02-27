export function RestaurantsSection() {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">Доставка из ресторанов</h3>

      <div className="space-y-3">
        {[1, 2, 3].map((id) => (
          <div key={id} className="bg-white rounded-xl p-4 shadow-sm">
            🍕 Restaurant #{id}
          </div>
        ))}
      </div>
    </div>
  );
}
