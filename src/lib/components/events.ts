export type Evt<
	EVENT extends UIEvent = MouseEvent,
	EL extends HTMLElement = HTMLElement
> = EVENT & { currentTarget: EventTarget & EL };

export type Focus<T extends HTMLElement = HTMLElement> = FocusEvent & {
	currentTarget: EventTarget & T;
};

export type Click<T extends HTMLElement = HTMLElement> = MouseEvent & {
	currentTarget: EventTarget & T;
};

export type TouchEventArg<T extends HTMLElement = HTMLElement> = TouchEvent & {
	currentTarget: EventTarget & T;
};

export type ClickHandler<E extends HTMLElement = HTMLElement, T = unknown> = (
	this: T,
	event: Click<E>
) => void;

export type MouseEventListener<E extends HTMLElement = HTMLElement, T = Window> = (
	this: T,
	event: MouseEvent
) => void;
