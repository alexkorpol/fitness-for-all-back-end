const express = require('express');

const router = express.Router();

const {
  validation,
  ctrlWrapper,
  emptyBody,
  isValidid,
  auth
} = require('../../middlewares');
const {
  contactJoiSchema,
  favoriteJoiSchema,
} = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactJoiSchema);

router.get(
  '/',
  auth,
  ctrlWrapper(ctrl.listContacts));

router.get(
  '/:id',
  auth,
  isValidid,
  ctrlWrapper(ctrl.getById));

router.post(
  '/',
  auth,
  emptyBody,
  validateMiddleware,
  ctrlWrapper(ctrl.addContact)
);

router.put(
  '/:id',
  auth,
  emptyBody,
  isValidid,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:id/favorite',
  auth,
  isValidid,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete('/:id', isValidid, ctrlWrapper(ctrl.removeContact));

module.exports = router;
