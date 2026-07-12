import { Router } from 'express';
import { eventTypes, findEventType } from '../store';

const router = Router();

router.get('/', (req, res) => {
  res.json(eventTypes);
});

router.get('/:id', (req, res) => {
  const et = findEventType(req.params.id);
  if (!et) {
    return res.status(404).json({ code: 'not_found', message: 'Event type not found' });
  }
  res.json(et);
});

export default router;
