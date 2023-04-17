export type Click<T extends HTMLElement = HTMLElement> = MouseEvent & {
	currentTarget: EventTarget & T;
};
