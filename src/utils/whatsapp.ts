const whatsappNumber = "3123946614";

export const createWhatsAppMessage = (pizzaName: string, price: string) => {
  const message = `¡Hola! Me interesa ordenar una pizza *${pizzaName}* (${price}). ¿Podrían ayudarme con el pedido?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const generalWhatsAppMessage = () => {
  const message = "¡Hola! Me gustaría hacer un pedido de pizza. ¿Podrían ayudarme?";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const createFoodMenuMessage = () => {
  const message = "¡Hola! Me interesa ver el menú completo de comidas disponibles. ¿Podrían enviarme las opciones y precios de sus platos? 🍽️";
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};