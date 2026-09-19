import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDestinationData {
  title: string;
  slug: string;
  tagLine: string;
  categoryBadge: string;
  region: string;
  country: string;
  heroBgUrl: string;
  cardThumbUrl: string;
  blurDataUrl: string;
  rating: number;
  orderIndex: number;
  isFeatured: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IDestination extends Document, IDestinationData {}

const DestinationSchema = new Schema<IDestination>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagLine: { type: String, required: true },
    categoryBadge: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, default: 'Bangladesh' },
    heroBgUrl: { type: String, required: true },
    cardThumbUrl: { type: String, required: true },
    blurDataUrl: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    orderIndex: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

DestinationSchema.index({ isFeatured: 1, orderIndex: 1 });

export const Destination: Model<IDestination> =
  mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
