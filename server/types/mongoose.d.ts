// import mongoose, { Types, LeanDocument, FilterQuery, QueryOptions } from 'mongoose'

// type IncludeMatchingProperties<T, V> = Pick<
// T,
// { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]
// >

// mongoose.Query.prototype.typedPopulate = function (options: any): any {
//   return this.populate(options)
// }

// export type PopulatedField<DocType> = DocType extends any[] ? ID[] | DocType[] : ID | DocType

// type ID = Types.ObjectId

// type PopulateOptionsTs<
// DocType,
// T extends PopulateProps<DocType> = PopulateProps<DocType>
// > = {
//   [K in keyof T]: {
//     path: K
//     match?: K extends keyof DocType ? FilterQuery<ExtractDocType<DocType[K]>> : never
//     /** optional query options like sort, limit, etc */
//     options?: QueryOptions
//     /**
//      * If true Mongoose will always set `path` to an array, if false Mongoose will
//      * always set `path` to a document. Inferred from schema by default.
//      */
//     justOne?: boolean
//     select?: K extends keyof DocType ? Array<keyof LeanDocument<ExtractDocType<DocType[K]>>> : never
//     populate?: K extends keyof DocType ? Array<PopulateOptionsTs<ExtractDocType<DocType[K]>>> : never
//     /** transform function to call on every populated doc */
//     transform?: (doc: any, id: any) => any
//   }
// }[keyof T]

// type ExtractDocType<T, U = Exclude<T, ID[] | ID> > = U extends any[] ? U[number] : U

// type PopulateProps<DocType> = IncludeMatchingProperties<Omit<DocType, '_id' | 'id' | '__v'>, (ID | mongoose.Document) | (ID[] | mongoose.Document[])>

// declare module 'mongoose' {

//   interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
//     typedPopulate: <P extends Array<PopulateOptionsTs<DocType>>>(options: P) => Query<Populated<DocType, PopulateFlattenPairs<P[number], DocType>> | null, DocType, THelpers, RawDocType>
//   }
// }

// type Populated<DocType, P> = {
//   [K in keyof DocType]: [K, DocType] extends P ? Populated<ExtractDocType<DocType[K]>, P> : DocType[K]
// }

// type PopulateFlattenPairs<T extends PopulateOptionsTs<DocType>, DocType> = {
//   [K in keyof T]: K extends 'path'
//     ? [T[K], DocType] : K extends 'populate'
//         ? T[K] extends PopulateOptionsTs<ExtractDocType<DocType[T['path']]>>
//         // @ts-expect-error
//           ? PopulateFlattenPairs<T[K], ExtractDocType<DocType[T['path']]>> : never : never
// }[keyof T]
