export async function getIp(retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {

    try {

      const response = await fetch('https://api.ipify.org?format=json')

      // Если запрос успешен, возвращаем результат
      if (response.status === 200) {
        return await response.json()
      } else {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Попытка ${i + 1} не удалась. Повтор через ${delay} мс.`);
        await new Promise(res => setTimeout(res, delay )); // Ждем перед повторной попыткой
      } else {
        console.error('Все попытки исчерпаны. Ошибка:', error);
        throw error; // Пробрасываем ошибку, если это была последняя попытка
      }
    }
  }
}