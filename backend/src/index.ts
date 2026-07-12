import express from 'express';
import cors from 'cors';
import eventTypesAdmin from './routes/eventTypes';
import bookingsRouter from './routes/bookings';
import availabilityRouter from './routes/availability';
import publicEventTypes from './routes/publicEventTypes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/event-types', publicEventTypes);
app.use('/availability', availabilityRouter);
app.use('/bookings', bookingsRouter);

// Admin routes
app.use('/admin/event-types', eventTypesAdmin);
app.use('/admin/bookings', bookingsRouter); // тот же роутер для GET /admin/bookings

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
