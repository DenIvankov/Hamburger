export type Extra = {
    id: string
    name: string
    price: number
}

export const extrasByCategory: Record<string, Extra[]> = {

    "Горячие блюда": [
        { id: "extra_meat", name: "Доп. мясо", price: 80 },
        { id: "cheese", name: "Сыр", price: 40 },
        { id: "spicy", name: "Острый соус", price: 20 },
    ],

    "Кимпаб": [
        { id: "extra_kimchi", name: "Кимчи", price: 50 },
        { id: "extra_cheese", name: "Сыр", price: 40 },
        { id: "spicy_mayo", name: "Спайси майо", price: 30 },
    ],

    "Чикен": [
        { id: "extra_sauce", name: "Соус BBQ", price: 30 },
        { id: "cheese_sauce", name: "Сырный соус", price: 30 },
        { id: "extra_portion", name: "Увеличить порцию", price: 120 },
    ],

    "Супы": [
        { id: "extra_rice", name: "Рис", price: 40 },
        { id: "spicy_level", name: "Сделать острее", price: 0 },
    ],

    "Закуски": [
        { id: "cheese_sauce", name: "Сырный соус", price: 30 },
        { id: "bbq", name: "BBQ соус", price: 30 },
        { id: "sweet_sour", name: "Кисло-сладкий соус", price: 30 },
    ],

    "Корндог": [
        { id: "extra_cheese", name: "Доп. сыр", price: 40 },
        { id: "bbq", name: "BBQ соус", price: 30 },
        { id: "ketchup", name: "Кетчуп", price: 20 },
    ],

    "Бургеры": [
        { id: "extra_patty", name: "Доп. котлета", price: 120 },
        { id: "extra_cheese", name: "Доп. сыр", price: 40 },
        { id: "bacon", name: "Бекон", price: 70 },
    ],
}