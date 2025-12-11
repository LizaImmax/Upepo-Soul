'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Clock, DollarSign } from 'lucide-react';
// @ts-ignore - CSS import
import 'react-big-calendar/lib/css/react-big-calendar.css';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment);

interface SoulSession {
  id: string;
  title: string;
  description: string;
  type: string;
  scheduledDate: string;
  duration: number;
  price: number;
  capacity: number;
  _count: {
    bookings: number;
  };
}

interface CalendarEvent extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: SoulSession;
}

export default function SessionsCalendarPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SoulSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<SoulSession | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/soul-sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const events: CalendarEvent[] = sessions.map((session) => {
    const start = new Date(session.scheduledDate);
    const end = new Date(start.getTime() + session.duration * 60000);
    
    return {
      id: session.id,
      title: session.title,
      start,
      end,
      resource: session,
    };
  });

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedSession(event.resource);
  };

  const handleBookSession = async () => {
    if (!selectedSession) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'session',
          itemId: selectedSession.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast.error('Failed to start checkout');
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const spotsLeft = event.resource.capacity - event.resource._count.bookings;
    const isFull = spotsLeft <= 0;
    
    return {
      style: {
        backgroundColor: isFull ? '#9CA3AF' : '#B78CE2',
        borderRadius: '8px',
        opacity: isFull ? 0.6 : 1,
        color: 'white',
        border: 'none',
        display: 'block',
      },
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Soul Sessions Calendar
          </h1>
          <p className="text-xl text-gray-600">
            Browse and book your transformative sessions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-sand-200 p-6 shadow-lg">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>

          {/* Session Details */}
          <div className="bg-white rounded-2xl border-2 border-sand-200 p-6 shadow-lg">
            {selectedSession ? (
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                  {selectedSession.title}
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="w-5 h-5 text-orchid-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold text-gray-800">
                        {moment(selectedSession.scheduledDate).format('MMMM D, YYYY')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {moment(selectedSession.scheduledDate).format('h:mm A')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-orchid-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-800">{selectedSession.duration} minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-5 h-5 text-orchid-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-semibold text-gray-800">${selectedSession.price}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-sand-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">Type:</span> {selectedSession.type}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Spots remaining:</span>{' '}
                    {selectedSession.capacity - selectedSession._count.bookings} / {selectedSession.capacity}
                  </p>
                </div>

                <p className="text-gray-700 mb-6">{selectedSession.description}</p>

                {selectedSession.capacity - selectedSession._count.bookings > 0 ? (
                  <button
                    onClick={handleBookSession}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all"
                  >
                    Book This Session
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-full bg-gray-300 text-gray-600 font-semibold cursor-not-allowed"
                  >
                    Session Full
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a session from the calendar to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-xl border-2 border-sand-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-orchid-500" />
              <span className="text-sm text-gray-600">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-gray-400" />
              <span className="text-sm text-gray-600">Full</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
