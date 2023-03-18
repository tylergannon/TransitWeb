export type ActionCallbacks<T = void> = {
	destroy: () => void;
	update?: (val: T) => void;
};

export type NodeAction<NodeT extends HTMLElement = HTMLFormElement, UpdateT = any> = (
	node: NodeT
) => ActionCallbacks<UpdateT>;

export const actionChain = <NodeT extends HTMLElement = HTMLFormElement>(
	node: NodeT,
	actions: NodeAction<NodeT>[]
) => {
	const destroy = actions.map((a) => a(node).destroy);
	return { destroy: () => destroy.map((a) => a()) };
};
