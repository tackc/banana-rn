export default text => {
	const maxCharacters = 15;
	return text ? `${text.slice(0, maxCharacters)}${text.length > maxCharacters ? '...' : ''}` : '?';
};
