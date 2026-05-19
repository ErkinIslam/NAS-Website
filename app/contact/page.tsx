'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Clock, Instagram, Facebook,
  CheckCircle2, Send, Calendar, ChevronRight,
  MessageSquare, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/shared/PageHero';

const services = [
  'Travel & Flight Booking',
  'Vehicle Shipping',
  'Box / Cargo Shipping',
  'Visa Application',
  'ESTA Application',
  'E-Albania Application',
  'Apostille Services',
  'Document Translation',
  'Immigration Petition',
  'Green Card Renewal',
  'NVC / DS-260',
  'Other',
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [contactSent, setContactSent] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', time: '', notes: '',
  });
  const [bookingSent, setBookingSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSent(true);
  };

  return (
    <>
      <PageHero
        label="Contact Us"
        title="Get in Touch With Our Team"
        subtitle="We're here to help with all your travel, shipping, and documentation needs. Reach out by phone, email, or visit our Brooklyn office."
        breadcrumbs={[{ label: 'Contact' }]}
        size="md"
      />

      {/* ─── CONTACT INFO STRIP ─────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon:  Phone,
                title: 'Call Us',
                lines: ['347-935-0935', '718-749-9641'],
                href:  'tel:3479350935',
              },
              {
                icon:  Mail,
                title: 'Email Us',
                lines: ['info@nycalb.com'],
                href:  'mailto:info@nycalb.com',
              },
              {
                icon:  MapPin,
                title: 'Visit Us',
                lines: ['6802 15th Ave', 'Brooklyn, NY'],
                href:  'https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY',
              },
              {
                icon:  Clock,
                title: 'Office Hours',
                lines: ['Mon–Sat: 9 AM – 7 PM', 'Sun: By Appointment'],
                href:  undefined,
              },
            ].map(({ icon: Icon, title, lines, href }) => (
              <a
                key={title}
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-start gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 group transition-all duration-200 ${href ? 'hover:shadow-md hover:border-brand-red/30 cursor-pointer' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${href ? 'bg-red-50 group-hover:bg-brand-red' : 'bg-red-50'}`}>
                  <Icon className={`w-5 h-5 transition-colors ${href ? 'text-brand-red group-hover:text-white' : 'text-brand-red'}`} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm mb-1">{title}</p>
                  {lines.map(line => (
                    <p key={line} className="text-slate-500 text-sm">{line}</p>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT FORM + MAP ─────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                Send Us a Message
              </div>
              <h2 className="section-title mb-4">How Can We Help You?</h2>
              <p className="text-slate-500 mb-8">
                Fill out the form and a member of our team will respond within the same business day.
              </p>

              <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
                {contactSent ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">Message Received!</h3>
                    <p className="text-slate-500 mb-5">We'll get back to you within the same business day.</p>
                    <Button onClick={() => setContactSent(false)} variant="outline" size="md">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="c-name">Full Name *</Label>
                        <Input id="c-name" placeholder="Your name" required
                          value={contactForm.name}
                          onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="c-phone">Phone *</Label>
                        <Input id="c-phone" type="tel" placeholder="(347) 000-0000" required
                          value={contactForm.phone}
                          onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email">Email</Label>
                      <Input id="c-email" type="email" placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-service">Service of Interest</Label>
                      <select id="c-service"
                        className="form-input appearance-none"
                        value={contactForm.service}
                        onChange={e => setContactForm(f => ({ ...f, service: e.target.value }))}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-message">Message *</Label>
                      <Textarea id="c-message" placeholder="Tell us how we can help you..." required
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} />
                    </div>
                    <Button type="submit" size="lg" variant="default" className="w-full">
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>

              {/* Social */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-slate-400 text-sm">Follow us:</span>
                <a href="https://www.instagram.com/nycalbservices/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-red transition-colors">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://www.facebook.com/NYCALBSERVICES" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-red transition-colors">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </div>
            </div>

            {/* Map */}
            <div id="map" className="flex flex-col gap-6">
              <div>
                <div className="section-label">
                  <span className="w-6 h-0.5 bg-brand-red" />
                  Our Location
                </div>
                <h2 className="section-title mb-2">6802 15th Ave, Brooklyn</h2>
                <p className="text-slate-500 mb-5">We're conveniently located in the heart of Brooklyn, easily accessible by car or public transportation.</p>
              </div>

              <div className="map-container rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-1 min-h-[320px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.684!2d-74.0059!3d40.6189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24414e9b4f921%3A0x0!2s6802+15th+Ave%2C+Brooklyn%2C+NY+11228!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '320px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NYC Alb Services Office"
                />
              </div>

              <a
                href="https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Get Directions in Google Maps
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── APPOINTMENT BOOKING ────────────────────────── */}
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                Appointments
              </div>
              <h2 className="section-title mb-4">Schedule a Consultation</h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Book a one-on-one consultation with our team. Whether you need help with shipping, documents, travel, or apostille — we'll guide you through the process in detail.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Clock,        text: 'Consultations are 30–60 minutes' },
                  { icon: MessageSquare, text: 'In-person or over the phone' },
                  { icon: CheckCircle2, text: 'Free initial consultation' },
                  { icon: Calendar,     text: 'Mon–Sat, 9 AM – 6 PM' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand-red" />
                    </div>
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-navy-900 rounded-xl p-6 text-white">
                <p className="font-semibold text-sm mb-2">Prefer to Book by Phone?</p>
                <a href="tel:3479350935" className="text-brand-red font-bold text-xl hover:text-red-400 transition-colors block mb-1">
                  347-935-0935
                </a>
                <a href="tel:7187499641" className="text-brand-red font-bold text-xl hover:text-red-400 transition-colors block">
                  718-749-9641
                </a>
                <p className="text-slate-400 text-xs mt-2">Available Mon–Sat, 9 AM – 7 PM</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
              {bookingSent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Appointment Requested!</h3>
                  <p className="text-slate-500 mb-2">We'll confirm your appointment within 24 hours.</p>
                  <p className="text-slate-400 text-sm mb-5">You'll receive a confirmation call or email.</p>
                  <Button onClick={() => setBookingSent(false)} variant="outline" size="md">
                    Request Another Appointment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar className="w-5 h-5 text-brand-red" />
                    <h3 className="font-bold text-navy-900 text-lg">Book an Appointment</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="b-name">Full Name *</Label>
                      <Input id="b-name" placeholder="Your name" required
                        value={bookingForm.name}
                        onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="b-phone">Phone *</Label>
                      <Input id="b-phone" type="tel" placeholder="(347) 000-0000" required
                        value={bookingForm.phone}
                        onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="b-email">Email</Label>
                    <Input id="b-email" type="email" placeholder="you@example.com"
                      value={bookingForm.email}
                      onChange={e => setBookingForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="b-service">Service *</Label>
                    <select id="b-service" required className="form-input appearance-none"
                      value={bookingForm.service}
                      onChange={e => setBookingForm(f => ({ ...f, service: e.target.value }))}>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="b-date">Preferred Date *</Label>
                      <Input id="b-date" type="date" required
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingForm.date}
                        onChange={e => setBookingForm(f => ({ ...f, date: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="b-time">Preferred Time *</Label>
                      <select id="b-time" required className="form-input appearance-none"
                        value={bookingForm.time}
                        onChange={e => setBookingForm(f => ({ ...f, time: e.target.value }))}>
                        <option value="">Select time...</option>
                        {timeSlots.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="b-notes">Additional Notes</Label>
                    <Textarea id="b-notes" placeholder="Anything we should know before your appointment..."
                      value={bookingForm.notes}
                      onChange={e => setBookingForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Button type="submit" size="lg" variant="default" className="w-full">
                    <Calendar className="w-4 h-4" />
                    Request Appointment
                  </Button>
                  <p className="text-xs text-slate-400 text-center">
                    We'll confirm your appointment within 24 hours by phone or email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
