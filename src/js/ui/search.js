/**
 * Initializes a search form to call back with a trimmed query string
 * @param {string|HTMLFormElement} formOrSelector
 * Form element OR selector string for search form.
 * @param {(query: string) =>void} onSearch
 * Function to call when form is submitted with current search terms.
 * @returns
 */

export function initSearch(formOrSelector, onSearch) {
	const form = typeof formOrSelector === 'string' ? document.querySelector(formOrSelector) : formOrSelector;

	if (!form) return;
	const input = form.querySelector('input[type="search"], input#search-input');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const query = input.value.trim();
		onSearch(query);
	});
}
