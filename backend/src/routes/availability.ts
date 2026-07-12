import { Router } from 'express';
import { generateAvailableSlots } from '../availability';

const router = Router();

router.get('/', (req, res) => {
  const { eventTypeId, from, to } = req.query;
  if (!eventTypeId) {
    return res.status(400).json({ code: 'validation_error', message: 'eventTypeId is required' });
  }
  const slots = generateAvailableSlots(
    eventTypeId as string,
    from as string | undefined,
    to as string | undefined
  );
  res.json(slots);
});

export default router;
