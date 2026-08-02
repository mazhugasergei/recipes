import Script from "next/script"

const PAGE_ID = "19689704"

export function YandexAdsScript() {
	return (
		<>
			{/* Yandex Ads (РСЯ) autoplacement */}
			<Script src="https://yandex.ru/ads/system/context.js" strategy="afterInteractive" async />
			<Script
				data-page-id={PAGE_ID}
				src="https://yandex.ru/ads/system/ap-loader.js"
				strategy="afterInteractive"
				async
			/>
		</>
	)
}
