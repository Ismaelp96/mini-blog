export const checkCancelBeforeDispatch = (action, cancelled) => {
	if (!cancelled) {
		dispatch(action);
	}
};
