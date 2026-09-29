import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

export function createApiRouter(apiBaseUrl: string) {
  const router = Router();

  router.get(['', '/'], (_request, response) => {
    response.json({
      apiBaseUrl,
      resources: ['users', 'teams', 'activities', 'leaderboard', 'workouts'],
    });
  });

  router.get('/health', (_request, response) => {
    response.json({ status: 'ok', apiBaseUrl });
  });

  router.get('/users/', async (_request, response) => {
    const users = await User.find().populate('team').sort({ displayName: 1 }).lean();
    response.json({ data: users, resource: 'users' });
  });

  router.get('/teams/', async (_request, response) => {
    const teams = await Team.find().sort({ name: 1 }).lean();
    response.json({ data: teams, resource: 'teams' });
  });

  router.get('/activities/', async (_request, response) => {
    const activities = await Activity.find()
      .populate('user')
      .populate('team')
      .sort({ completedAt: -1 })
      .lean();
    response.json({ data: activities, resource: 'activities' });
  });

  router.get('/leaderboard/', async (_request, response) => {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 })
      .lean();
    response.json({ data: leaderboard, resource: 'leaderboard' });
  });

  router.get('/workouts/', async (_request, response) => {
    const workouts = await Workout.find().populate('recommendedForTeam').sort({ title: 1 }).lean();
    response.json({ data: workouts, resource: 'workouts' });
  });

  return router;
}