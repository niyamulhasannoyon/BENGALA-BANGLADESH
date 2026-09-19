import mongoose from 'mongoose';
import { Destination } from '../lib/models/Destination';
import { BANGLADESH_DESTINATIONS } from '../lib/data/bangladeshDestinations';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bengala';

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);

  console.log('Clearing existing featured destinations...');
  await Destination.deleteMany({});

  console.log(`Seeding ${BANGLADESH_DESTINATIONS.length} Bangladesh luxury showcase destinations...`);
  for (const item of BANGLADESH_DESTINATIONS) {
    const { _id: _ignored, ...cleanData } = item;
    await Destination.create(cleanData);
    console.log(`✓ Created: ${item.title} (${item.categoryBadge})`);
  }

  console.log('All Bangladesh showcase destinations seeded successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
