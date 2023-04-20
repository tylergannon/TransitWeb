export type ResizableSide = 'right' | 'bottom';
export type Resizing = 'right' | 'bottom' | 'bottom-right';
export type Size = { width: number; height: number };

export const Sides = ['right' as ResizableSide, 'bottom' as ResizableSide] as const;

export interface DraggableArgs {
	readonly allow: ResizableSide[];
}

export interface DraggableEvents {
	start: Resizing;
	resize: { clientWidth: number; clientHeight: number };
	stop: void;
	visible: boolean;
}
