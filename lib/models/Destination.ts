import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDestinationCoordinates {
  lat: number;
  lng: number;
}

export interface ICuratedExpedition {
  title: string;
  duration: string;
  priceStarting: string;
  features: string[];
}

export interface IDestination {
  _id?: string;
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
  description: string;
  highlights: string[];
  bestSeason: string;
  coordinates: IDestinationCoordinates;
  curatedExpedition?: ICuratedExpedition;
}

export interface IDestinationDocument extends Omit<IDestination, '_id'>, Document {}

const DestinationSchema = new Schema<IDestinationDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    tagLine: { type: String, required: true },
    categoryBadge: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, default: 'Bangladesh' },
    heroBgUrl: { type: String, required: true },
    cardThumbUrl: { type: String, required: true },
    blurDataUrl: { type: String, default: '' },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    orderIndex: { type: Number, required: true, index: true },
    isFeatured: { type: Boolean, default: true, index: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    bestSeason: { type: String, default: 'October – March' },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    curatedExpedition: {
      title: { type: String },
      duration: { type: String },
      priceStarting: { type: String },
      features: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model across Next.js HMR
const Destination: Model<IDestinationDocument> =
  (mongoose.models.Destination as Model<IDestinationDocument>) ||
  mongoose.model<IDestinationDocument>('Destination', DestinationSchema);

export { Destination };
export default Destination;
