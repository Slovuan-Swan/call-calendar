import { Router } from 'express';
import { eventTypes, addEventType, findEventType, updateEventType, deleteEventType } from '../store';
import { EventType, ErrorResponse } from '../types';

const router = Router();

router.get('/', (req, res) => {
  res.json(eventTypes);
});

router.post('/', (req, res) => {
  const { id, title, description, durationMinutes } = req.body;
  if (!id || !title || !description || durationMinutes === undefined) {
    return res.status(400).json({ code: 'validation_error', message: 'Missing required fields' });
  }
  if (findEventType(id)) {
    return res.status(400).json({ code: 'validation_error', message: 'Event type with this id already exists' });
  }
  const newEvent: EventType = { id, title, description, durationMinutes };
  addEventType(newEvent);
  res.status(200).json(newEvent);
});

router.get('/:id', (req, res) => {
  const et = findEventType(req.params.id);
  if (!et) {
    return res.status(404).json({ code: 'not_found', message: 'Event type not found' });
  }
  res.json(et);
});

router.patch('/:id', (req, res) => {
  const et = findEventType(req.params.id);
  if (!et) {
    return res.status(404).json({ code: 'not_found', message: 'Event type not found' });
  }
  const { title, description, durationMinutes } = req.body;
  const updated = updateEventType(req.params.id, { title, description, durationMinutes });
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const deleted = deleteEventType(req.params.id);
  if (!deleted) {
    return res.status(404).json({ code: 'not_found', message: 'Event type not found' });
  }
  res.status(204).send();
});

export default router;
