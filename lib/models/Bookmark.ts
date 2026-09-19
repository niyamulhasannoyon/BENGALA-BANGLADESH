import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBookmark {
  _id?: string;
  userId: string;
  destinationId: Types.ObjectId | string;
  createdAt?: Date;
}

export interface IBookmarkDocument extends Omit<IBookmark, '_id'>, Document {
  destinationId: Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: { type: String, required: true, index: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

// Compound unique index ensuring a user cannot bookmark the same destination twice
BookmarkSchema.index({ userId: 1, destinationId: 1 }, { unique: true });

const Bookmark: Model<IBookmarkDocument> =
  (mongoose.models.Bookmark as Model<IBookmarkDocument>) ||
  mongoose.model<IBookmarkDocument>('Bookmark', BookmarkSchema);

export { Bookmark };
export default Bookmark;
