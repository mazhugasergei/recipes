export function formatDateRu(date: string) {
	return new Date(date).toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})
}
