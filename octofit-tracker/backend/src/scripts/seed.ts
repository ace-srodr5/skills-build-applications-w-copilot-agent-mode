import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'OctoSprinters',
        mascot: 'Lightning Octopus',
        coach: 'Maya Chen',
        memberGoal: 'Build speed and consistency with weekly cardio challenges.',
      },
      {
        name: 'Core Krakens',
        mascot: 'Iron Kraken',
        coach: 'Jordan Ellis',
        memberGoal: 'Improve strength, mobility, and injury resistance.',
      },
      {
        name: 'Flex Tides',
        mascot: 'Tidal Wave',
        coach: 'Priya Raman',
        memberGoal: 'Balance active recovery with endurance-focused training.',
      },
    ]);

    const users = await User.insertMany([
      {
        username: 'alexrunner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
        role: 'athlete',
        team: teams[0].id,
      },
      {
        username: 'samstrength',
        email: 'sam.strength@example.com',
        displayName: 'Sam Patel',
        role: 'athlete',
        team: teams[1].id,
      },
      {
        username: 'coachmaya',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        role: 'coach',
        team: teams[0].id,
      },
      {
        username: 'taylorflow',
        email: 'taylor.flow@example.com',
        displayName: 'Taylor Brooks',
        role: 'athlete',
        team: teams[2].id,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0].id,
        team: teams[0].id,
        activityType: 'Run',
        durationMinutes: 42,
        distanceKm: 8.1,
        caloriesBurned: 610,
        completedAt: new Date('2026-09-25T13:30:00Z'),
      },
      {
        user: users[1].id,
        team: teams[1].id,
        activityType: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 480,
        completedAt: new Date('2026-09-26T18:00:00Z'),
      },
      {
        user: users[3].id,
        team: teams[2].id,
        activityType: 'Cycling',
        durationMinutes: 64,
        distanceKm: 24.6,
        caloriesBurned: 720,
        completedAt: new Date('2026-09-27T15:15:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0].id, team: teams[0].id, rank: 1, points: 1840, weeklyStreak: 7 },
      { user: users[3].id, team: teams[2].id, rank: 2, points: 1715, weeklyStreak: 5 },
      { user: users[1].id, team: teams[1].id, rank: 3, points: 1650, weeklyStreak: 4 },
      { user: users[2].id, team: teams[0].id, rank: 4, points: 1420, weeklyStreak: 6 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Tentacle Run',
        focus: 'Cardio endurance',
        difficulty: 'intermediate',
        durationMinutes: 45,
        exercises: ['10-minute warmup jog', '4 x 6-minute tempo intervals', 'Cooldown walk'],
        recommendedForTeam: teams[0].id,
      },
      {
        title: 'Kraken Core Circuit',
        focus: 'Core strength',
        difficulty: 'advanced',
        durationMinutes: 35,
        exercises: ['Plank reaches', 'Kettlebell deadlifts', 'Hollow holds', 'Medicine ball slams'],
        recommendedForTeam: teams[1].id,
      },
      {
        title: 'Tide Pool Recovery Flow',
        focus: 'Mobility and recovery',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring flossing', 'Box breathing'],
        recommendedForTeam: teams[2].id,
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
