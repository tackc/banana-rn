export default text => {
	const maxCharacters = 10;
	return text ? `${text.slice(0, maxCharacters)}${text.length > maxCharacters ? '...' : ''}` : '?';
};
