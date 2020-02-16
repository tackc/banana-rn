export default (time: Date) => {
	// console.log((new Date().getTime() - time.getTime()) / 1000);
	if (!time) { return 0; }
	return (new Date().getTime() - time.getTime()) / 1000;
};
