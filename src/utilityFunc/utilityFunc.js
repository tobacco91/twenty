export function toArray(data) {
	return [].slice.call(data)
}
export function random() {
    return Date.now() + Math.random()
}