const RU_TO_LAT: Record<string, string> = {
	а: "a",
	б: "b",
	в: "v",
	г: "g",
	д: "d",
	е: "e",
	ё: "yo",
	ж: "zh",
	з: "z",
	и: "i",
	й: "y",
	к: "k",
	л: "l",
	м: "m",
	н: "n",
	о: "o",
	п: "p",
	р: "r",
	с: "s",
	т: "t",
	у: "u",
	ф: "f",
	х: "h",
	ц: "ts",
	ч: "ch",
	ш: "sh",
	щ: "sch",
	ъ: "",
	ы: "y",
	ь: "",
	э: "e",
	ю: "yu",
	я: "ya",
}

export function transliterate(str: string): string {
	return str
		.toLowerCase()
		.split("")
		.map((char) => RU_TO_LAT[char] ?? char)
		.join("")
}

export function slugify(str: string): string {
	return transliterate(str)
		.replace(/[^a-z0-9\s-]/g, "") // strip anything not letters/numbers/space/dash
		.trim()
		.replace(/\s+/g, "-") // spaces → dashes
		.replace(/-+/g, "-") // collapse repeated dashes
}
