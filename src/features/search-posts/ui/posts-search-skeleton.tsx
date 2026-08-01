export function PostsSearchSkeleton() {
	return (
		<div className="animate-pulse">
			<div className="bg-muted mb-6 h-11.5 rounded-xl" />
			<div className="mb-12 flex gap-2">
				<div className="bg-muted h-8 w-16 rounded-full" />
				<div className="bg-muted h-8 w-20 rounded-full" />
				<div className="bg-muted h-8 w-24 rounded-full" />
			</div>
			<div className="bg-muted mb-12 aspect-3/1 rounded-3xl" />
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="bg-muted aspect-4/3 rounded-[1.75rem]" />
				<div className="bg-muted aspect-4/3 rounded-[1.75rem]" />
			</div>
		</div>
	)
}
