import type {
	Model,
	CompileModelOptions,
	Schema,
	InferSchemaType,
	ObtainSchemaGeneric,
	HydratedDocument
} from 'mongoose';
import { model } from 'mongoose';
import { dev } from '$app/environment';

/**
 * A wrapped version of mongoose.model that will only create a new model if it doesn't exist.
 * For the original version, see https://mongoosejs.com/docs/api.html#mongoose_Mongoose-model
 */
export function modelDevMode<TSchema extends Schema = any>(
	name: string,
	schema?: TSchema,
	collection?: string,
	options?: CompileModelOptions
): Model<
	InferSchemaType<TSchema>,
	ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
	ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
	ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
	HydratedDocument<
		InferSchemaType<TSchema>,
		ObtainSchemaGeneric<TSchema, 'TVirtuals'> & ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
		ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>
	>,
	TSchema
> &
	ObtainSchemaGeneric<TSchema, 'TStaticMethods'> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (!global[name]) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		global[name] = model<TSchema>(name, schema, collection, options);
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return global[name];
}

export default dev ? modelDevMode : model;
