

export function getRestaurantStatus(schedule?: any[]) {
    if (!schedule || schedule.length === 0) {
        return { isOpen: false, text: "Закрыто" };
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const yesterday = (currentDay + 6) % 7;

    for (const s of schedule) {
        const [openH, openM] = s.open_time.split(":").map(Number);
        const [closeH, closeM] = s.close_time.split(":").map(Number);

        const openMinutes = openH * 60 + openM;
        const closeMinutes = closeH * 60 + closeM;

        const worksToday = s.day_numbers.includes(currentDay);
        const workedYesterday = s.day_numbers.includes(yesterday);

        // 🔥 Обычный режим (08:00 - 20:00)
        if (openMinutes < closeMinutes) {
            if (worksToday && currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
                return {
                    isOpen: true,
                    text: `Открыто до ${s.close_time.slice(0, 5)}`,
                };
            }
        }

        // 🔥 Через полночь (22:00 - 02:00)
        if (openMinutes > closeMinutes) {
            // часть до полуночи
            if (worksToday && currentMinutes >= openMinutes) {
                return {
                    isOpen: true,
                    text: `Открыто до ${s.close_time.slice(0, 5)}`,
                };
            }

            // часть после полуночи
            if (workedYesterday && currentMinutes < closeMinutes) {
                return {
                    isOpen: true,
                    text: `Открыто до ${s.close_time.slice(0, 5)}`,
                };
            }
        }
    }

    // если не открыто — ищем ближайшее открытие
    const todaySchedule = schedule.find((s) =>
        s.day_numbers.includes(currentDay)
    );

    if (todaySchedule) {
        return {
            isOpen: false,
            text: `Откроется в ${todaySchedule.open_time.slice(0, 5)}`,
        };
    }

    return { isOpen: false, text: "Сегодня закрыто" };
}