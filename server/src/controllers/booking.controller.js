const Booking = require('../models/booking.model');
const Service = require('../models/service.model');
const AppError = require('../utils/appError');

exports.create = async (req, res, next) => {
  try {
    const { provider_id, service_id, booking_date, time_slot, address, notes } = req.body;

    if (!provider_id || !service_id || !booking_date || !time_slot) {
      throw new AppError('Provider, service, date, and time slot are required.', 400);
    }

    const service = await Service.findById(service_id);
    if (!service) {
      throw new AppError('Service not found.', 404);
    }

    const booking = await Booking.create({
      customer_id: req.user.id,
      provider_id,
      service_id,
      booking_date,
      time_slot,
      address,
      notes,
      total_amount: service.price,
      status: 'pending',
    });

    res.status(201).json({ message: 'Booking created.', booking });
  } catch (error) {
    next(error);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const user = req.user;

    let bookings;
    if (user.role === 'provider') {
      const profile = await require('../models/provider.model').findByUserId(user.id);
      if (!profile) {
        throw new AppError('Provider profile not found.', 404);
      }
      bookings = await Booking.findByProviderId(profile.id);
    } else {
      bookings = await Booking.findByCustomerId(user.id);
    }

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new AppError('Booking not found.', 404);
    }
    res.json({ booking });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['completed', 'cancelled'],
      completed: [],
      cancelled: [],
    };

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      throw new AppError('Booking not found.', 404);
    }

    if (!validTransitions[booking.status]?.includes(status)) {
      throw new AppError(
        `Cannot transition from '${booking.status}' to '${status}'.`,
        400
      );
    }

    const updated = await Booking.updateStatus(req.params.id, status);
    res.json({ message: `Booking ${status}.`, booking: updated });
  } catch (error) {
    next(error);
  }
};

exports.getTimeSlots = async (req, res, next) => {
  try {
    const { provider_id, date } = req.query;
    if (!provider_id || !date) {
      throw new AppError('Provider ID and date are required.', 400);
    }

    const slots = await Booking.getTimeSlots(provider_id, date);
    res.json({ slots });
  } catch (error) {
    next(error);
  }
};
