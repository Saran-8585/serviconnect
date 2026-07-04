import { useState, useEffect } from 'react';
import { useToast } from '../ui/Toast/Toast';
import { bookings as bookingsApi } from '../../lib/api';
import Modal from '../ui/Modal/Modal';
import Button from '../ui/Button/Button';
import Input from '../ui/Input/Input';
import styles from './BookingModal.module.css';

export default function BookingModal({ provider, service, onClose }) {
  const toast = useToast();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (date) {
      setSlotsLoading(true);
      setTimeSlot('');
      bookingsApi.getSlots({ provider_id: provider.id, date })
        .then((res) => {
          setAvailableSlots(res.data.slots);
          setSlotsLoading(false);
        })
        .catch(() => {
          setAvailableSlots([]);
          setSlotsLoading(false);
        });
    }
  }, [date, provider.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !timeSlot) return;

    setSubmitting(true);
    try {
      await bookingsApi.create({
        provider_id: provider.id,
        service_id: service.id,
        booking_date: date,
        time_slot: timeSlot,
        address,
        notes,
      });
      toast('Booking confirmed!', 'success');
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      toast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = today;

  return (
    <Modal open onClose={onClose} title={`Book: ${service.name}`} size="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.serviceSummary}>
          <span className={styles.providerName}>{provider.business_name}</span>
          <span className={styles.servicePrice}>Rs. {service.price}</span>
        </div>

        <Input
          label="Select Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={minDate}
          required
        />

        {date && (
          <div className={styles.field}>
            <label className={styles.label}>Time Slot</label>
            {slotsLoading ? (
              <p className={styles.loadingText}>Loading available slots...</p>
            ) : availableSlots.length === 0 ? (
              <p className={styles.noSlots}>No slots available for this date.</p>
            ) : (
              <div className={styles.slots}>
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`${styles.slot} ${timeSlot === slot ? styles.slotActive : ''}`}
                    onClick={() => setTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <Input
          label="Service Address"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Input
          label="Notes (optional)"
          placeholder="Any special instructions?"
          textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className={styles.footer}>
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button
            type="submit"
            disabled={!date || !timeSlot || submitting}
            loading={submitting}
          >
            Confirm Booking
          </Button>
        </div>
      </form>
    </Modal>
  );
}
