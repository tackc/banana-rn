interface ITimeLeft {
	created_at: Date;
	duration_minutes: number;
}

export default ({ created_at, duration_minutes }: ITimeLeft) => {
	const startTime = new Date(created_at);
	const now = new Date();
	const minutesElapsed = Math.round((now.getTime() - startTime.getTime()) / 1000 / 60);
	return (minutesElapsed < duration_minutes
		? duration_minutes - minutesElapsed
		: 0).toString();
};
