'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type SearchBook = {
	id: string;
	title: string;
	author: string;
	subTitle?: string;
	imageLink?: string;
};

export default function BookSearch() {
	const [query, setQuery] = useState('');
	const [books, setBooks] = useState<SearchBook[]>([]);
	const [isFocused, setIsFocused] = useState(false);
	const [hasLoadedBooks, setHasLoadedBooks] = useState(false);
	const [loadError, setLoadError] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const normalizedQuery = query.trim().toLowerCase();
	const shouldLoadBooks = normalizedQuery.length > 0;

	useEffect(() => () => {
		if (searchTimer.current) clearTimeout(searchTimer.current);
	}, []);

	function handleQueryChange(value: string) {
		setQuery(value);
		if (searchTimer.current) clearTimeout(searchTimer.current);

		if (!value.trim()) {
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		searchTimer.current = setTimeout(() => setIsSearching(false), 250);
	}

	useEffect(() => {
		if (!shouldLoadBooks || hasLoadedBooks) return;

		let isCurrent = true;

		const loadBooks = async () => {
			const startedAt = Date.now();

			try {
				const response = await fetch('/api/books', { signal: AbortSignal.timeout(10000) });
				if (!response.ok) throw new Error('Could not load books');
				const results = await response.json() as SearchBook[];
				if (isCurrent) setBooks(results);
			} catch {
				if (isCurrent) setLoadError(true);
			}

			const remainingLoadingTime = 250 - (Date.now() - startedAt);
			if (remainingLoadingTime > 0) {
				await new Promise((resolve) => window.setTimeout(resolve, remainingLoadingTime));
			}

			if (isCurrent) setHasLoadedBooks(true);
		};

		void loadBooks();

		return () => {
			isCurrent = false;
		};
	}, [hasLoadedBooks, shouldLoadBooks]);

	const results = normalizedQuery
		? books
				.filter((book) =>
					`${book.title} ${book.author} ${book.subTitle ?? ''}`
						.toLowerCase()
						.includes(normalizedQuery),
				)
				.slice(0, 6)
		: [];
	const isLoadingBooks = isFocused && shouldLoadBooks && (!hasLoadedBooks || isSearching) && !loadError;
	const showResults = isFocused && normalizedQuery.length > 0;

	return (
		<form
			action="/search"
			method="get"
			role="search"
			autoComplete="off"
			onFocus={() => setIsFocused(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
					setIsFocused(false);
				}
			}}
			className="relative h-10 max-w-[340px] flex-1 md:max-w-none"
		>
			<input
				type="search"
				name="q"
				value={query}
				onChange={(event) => handleQueryChange(event.target.value)}
				onFocus={() => setIsFocused(true)}
				autoComplete="off"
				role="combobox"
				aria-autocomplete="list"
				aria-label="Search for books"
				aria-controls="book-search-results"
				aria-expanded={showResults}
				placeholder="Search for books"
				className="absolute right-0 h-10 w-full rounded-lg border-2 border-[#e1e7ea] bg-[#f1f6f4] px-4 pr-12 text-[#042330] outline-none"
			/>
			<button
				type="submit"
				aria-label="Search"
				className="absolute right-2 top-1/2 flex h-6 -translate-y-1/2 items-center border-l-2 border-[#e1e7ea] pl-2 text-[#03314b]"
			>
				<FaMagnifyingGlass className="h-6 w-6" aria-hidden="true" />
			</button>

			{showResults && (
				<div
					id="book-search-results"
					role="listbox"
					aria-label="Matching books"
					className={`absolute left-0 top-full z-50 mt-1 max-h-[min(72vh,560px)] w-[calc(100vw-2rem)] max-w-[440px] overflow-y-auto border border-[#e1e7ea] bg-white shadow-lg md:left-auto md:right-0 md:w-[440px] ${results.length > 0 ? 'min-h-[220px]' : ''}`}
				>
					{isLoadingBooks ? (
						<div role="status" aria-label="Loading book suggestions">
							{Array.from({ length: 2 }, (_, index) => (
								<div
									key={index}
									aria-hidden="true"
									className="flex min-h-32 animate-pulse items-center gap-4 border-b border-[#e1e7ea] p-4 last:border-b-0"
								>
									<div className="h-20 w-16 shrink-0 bg-[#e8edef]" />
									<div className="min-w-0 flex-1 space-y-3">
										<div className="h-5 w-4/5 rounded-sm bg-[#e8edef]" />
										<div className="h-4 w-2/5 rounded-sm bg-[#eef1f2]" />
										<div className="h-4 w-full rounded-sm bg-[#eef1f2]" />
									</div>
								</div>
							))}
							<span className="sr-only">Loading book suggestions.</span>
						</div>
					) : loadError ? (
						<p className="p-4 text-sm text-[#78858a]">Books could not be loaded. Try again later.</p>
					) : results.length > 0 ? (
						results.map((book) => (
							<Link
								key={book.id}
								href={`/book/${book.id}`}
								role="option"
								aria-selected="false"
								onClick={() => {
									setIsFocused(false);
									setQuery('');
								}}
								className="flex min-h-32 items-center gap-4 border-b border-[#e1e7ea] p-4 last:border-b-0 hover:bg-[#f7faf9]"
							>
								{book.imageLink && (
									<img src={book.imageLink} alt="" className="h-20 w-16 shrink-0 object-cover" />
								)}
								<span className="min-w-0">
									<span className="block truncate text-base font-semibold text-[#032b41]">{book.title}</span>
									<span className="block truncate text-sm text-[#78858a]">{book.author}</span>
									{book.subTitle && (
										<span className="mt-1 block truncate text-xs text-[#78858a]">{book.subTitle}</span>
									)}
								</span>
							</Link>
						))
					) : (
						<p className="p-3 text-md text-black">No books found</p>
					)}
				</div>
			)}
		</form>
	);
}
