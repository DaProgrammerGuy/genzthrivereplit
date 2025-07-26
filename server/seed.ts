// server/seed.ts - Simple working version
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load environment variables first
dotenv.config();

// Check if DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  console.log('Make sure your .env file exists and contains DATABASE_URL');
  process.exit(1);
}

console.log('✅ DATABASE_URL loaded successfully');

const sql = neon(process.env.DATABASE_URL);

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create table only if it doesn't exist (don't drop existing data)
    await sql`
      CREATE TABLE IF NOT EXISTS income_streams (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        stream_type VARCHAR(255) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT false,
        monthly_revenue INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create index only if it doesn't exist
    await sql`CREATE INDEX IF NOT EXISTS idx_income_streams_user_id ON income_streams (user_id)`;

    // Check if demo data already exists
    const existingData = await sql`SELECT COUNT(*) as count FROM income_streams WHERE user_id = 'demo_user'`;
    
    if (existingData[0].count === 0) {
      console.log('No demo data found, inserting...');
      // Insert demo data only if it doesn't exist
      await sql`
        INSERT INTO income_streams (user_id, stream_type, is_active, monthly_revenue) VALUES
        ('demo_user', 'freelancing', false, 0),
        ('demo_user', 'micro-saas', false, 0),
        ('demo_user', 'content-creation', false, 0),
        ('demo_user', 'consulting', false, 0)
      `;
      console.log('✅ Demo data inserted successfully!');
    } else {
      console.log('✅ Demo data already exists, skipping insert');
    }

    // Verify data
    const result = await sql`SELECT * FROM income_streams WHERE user_id = 'demo_user'`;
    console.log(`✅ Database verified: ${result.length} records for demo_user`);
    
    return result;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// If running this file directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}