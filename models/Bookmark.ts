import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmark extends Document {
  userId: string;
  destinationId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: String, required: true, index: true },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

BookmarkSchema.index({ userId: 1, destinationId: 1 }, { unique: true });

export const Bookmark: Model<IBookmark> =
  mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
