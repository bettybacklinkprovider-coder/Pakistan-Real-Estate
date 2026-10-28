import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  ArrowUpRight,
  SlidersHorizontal,
  Check,
  X,
  Compass,
  Sparkles,
  Scale,
  Building2,
  ChevronRight,
  Clock,
  Lock,
  Calculator,
  Layers,
  MapPin,
  Phone,
  Navigation,
  Bookmark,
  Smartphone,
  Share2,
  Star,
  ThumbsUp,
  MessageSquarePlus,
  Copy,
  Camera,
  Maximize2,
  Plus
} from 'lucide-react';
import {
  PROPERTIES,
  AGENCY_INFO,
  AGENCY_GALLERY_PHOTOS,
  INITIAL_REVIEWS,
  NEARBY_COMPETITORS,
  ADVISORY_CAPABILITIES,
  PropertyListing,
  PropertyCategory,
  ClientReview,
  AgencyGalleryPhoto
} from './data/properties';

export default function App() {
  // Filtering & Search State
  const [selectedCategory, setSelectedCategory] = useState<'All' | PropertyCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPriceCrore, setMaxPriceCrore] = useState<number>(12);
  const [directMandateOnly, setDirectMandateOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'sqft-desc'>('featured');
  const [photoFilter, setPhotoFilter] = useState<'All' | 'Exterior' | 'By owner'>('All');

  // Interactive Photos & Videos Gallery State
  const [galleryPhotos, setGalleryPhotos] = useState<AgencyGalleryPhoto[]>(AGENCY_GALLERY_PHOTOS);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<AgencyGalleryPhoto | null>(null);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState<boolean>(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState<string>('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Exterior' | 'By owner'>('Exterior');
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(
    '/assets/aistudio/unnamed_2f9b1b0e.jpg'
  );

  // Hero Active Image Switcher (allows toggling between the 5 uploaded images right in the hero)
  const [activeHeroImageIndex, setActiveHeroImageIndex] = useState<number>(0);

  // Agency Quick Action States (Directions, Save, Send to Phone, Share, Copy Plus Code)
  const [isSavedAgency, setIsSavedAgency] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string>('');
  const [isSendToPhoneOpen, setIsSendToPhoneOpen] = useState<boolean>(false);
  const [phoneRecipient, setPhoneRecipient] = useState<string>('');
  const [phoneSentSuccess, setPhoneSentSuccess] = useState<boolean>(false);

  // Reviews State
  const [reviews, setReviews] = useState<ClientReview[]>(INITIAL_REVIEWS);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [reviewSort, setReviewSort] = useState<'relevant' | 'newest'>('relevant');
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState<boolean>(false);
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [newReviewerRole, setNewReviewerRole] = useState<string>('Pak Arab Society Buyer');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewFormError, setReviewFormError] = useState<string>('');

  // Active Property Dossier Modal State
  const [activeDossier, setActiveDossier] = useState<PropertyListing | null>(null);
  const [dossierTab, setDossierTab] = useState<'architecture' | 'floorplan' | 'valuation'>('architecture');

  // Valuation Calculator State inside Dossier
  const [downPaymentPct, setDownPaymentPct] = useState<number>(40);
  const [interestRate, setInterestRate] = useState<number>(14.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(15);

  // Comparison Drawer State
  const [compareIds, setCompareIds] = useState<string[]>([
    'pak-arab-f1-signature-villa',
    '16-f1-commercial-plaza'
  ]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Private Viewing Scheduler Modal (Tier 3 Glass Modal)
  const [isSchedulerOpen, setIsSchedulerOpen] = useState<boolean>(false);
  const [schedulerPropertyId, setSchedulerPropertyId] = useState<string>(PROPERTIES[0].id);
  const [selectedDateDay, setSelectedDateDay] = useState<number>(14);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    '18:00 · Evening Office & Site Inspection (16-F1 Commercial)'
  );
  const [arrivalProtocol, setArrivalProtocol] = useState<'office' | 'ferozepur' | 'whatsapp'>('office');
  const [ndaAccepted, setNdaAccepted] = useState<boolean>(true);
  const [registryReady, setRegistryReady] = useState<boolean>(true);
  const [viewerName, setViewerName] = useState<string>('');
  const [viewerPhone, setViewerPhone] = useState<string>('');
  const [schedulerSubmitted, setSchedulerSubmitted] = useState<boolean>(false);
  const [schedulerError, setSchedulerError] = useState<string>('');

  // Private Desk Lead Capture State
  const [deskName, setDeskName] = useState('');
  const [deskEmail, setDeskEmail] = useState('');
  const [deskPhone, setDeskPhone] = useState('');
  const [deskMandateType, setDeskMandateType] = useState<'buy' | 'sell' | 'commercial'>('buy');
  const [deskCapitalBand, setDeskCapitalBand] = useState('PKR 3 Crore – 6 Crore');
  const [deskNotes, setDeskNotes] = useState('');
  const [deskNdaChecked, setDeskNdaChecked] = useState(true);
  const [deskError, setDeskError] = useState('');
  const [deskSubmitted, setDeskSubmitted] = useState(false);

  // Broken image fallback tracking
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const heroProperty = PROPERTIES[0];
  const currentHeroPhoto = galleryPhotos[activeHeroImageIndex] || galleryPhotos[0];

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => {
      setActionToast((prev) => (prev === msg ? '' : prev));
    }, 3500);
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    triggerToast(`${label} copied: ${text}`);
  };

  const filteredGalleryPhotos = useMemo(() => {
    if (photoFilter === 'All') return galleryPhotos;
    return galleryPhotos.filter((item) => item.category === photoFilter);
  }, [galleryPhotos, photoFilter]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((prop) => {
      if (selectedCategory !== 'All' && prop.category !== selectedCategory) return false;
      if (photoFilter !== 'All' && prop.photoCategory !== photoFilter) return false;
      if (directMandateOnly && prop.status !== 'DIRECT MANDATE') return false;
      if (prop.price > maxPriceCrore) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(q);
        const matchLocation = prop.location.toLowerCase().includes(q);
        const matchArchitect = prop.architect.toLowerCase().includes(q);
        if (!matchTitle && !matchLocation && !matchArchitect) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'sqft-desc') return b.sqFt - a.sqFt;
      return 0;
    });
  }, [selectedCategory, photoFilter, searchQuery, maxPriceCrore, directMandateOnly, sortBy]);

  const sortedReviews = useMemo(() => {
    const list = [...reviews];
    if (reviewSort === 'newest') {
      list.sort((a, b) => a.monthsAgoNumeric - b.monthsAgoNumeric);
    }
    return showAllReviews ? list : list.slice(0, 3);
  }, [reviews, reviewSort, showAllReviews]);

  const comparedProperties = useMemo(
    () => PROPERTIES.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const toggleReviewLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim()) return;
    const added: AgencyGalleryPhoto = {
      id: `photo-${Date.now()}`,
      src: selectedPresetImage,
      title: newPhotoTitle.trim(),
      subtitle: '16-F1 Commercial · Pak Arab F1 Phase-2, Lahore',
      category: newPhotoCategory,
      dateAdded: 'Just added'
    };
    setGalleryPhotos((prev) => [added, ...prev]);
    setNewPhotoTitle('');
    setIsAddPhotoOpen(false);
    triggerToast('Photo added to Pakistan Real Estate gallery.');
  };

  const handleWriteReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim()) {
      setReviewFormError('Please enter your full name.');
      return;
    }
    if (!newReviewComment.trim()) {
      setReviewFormError('Please share your experience with Pakistan Real Estate.');
      return;
    }
    const created: ClientReview = {
      id: `rev-${Date.now()}`,
      author: newReviewerName.trim(),
      badge: newReviewerRole.trim() || 'Verified Client',
      stats: '1 review · Pak Arab Society',
      timeAgo: 'Just now',
      monthsAgoNumeric: 0,
      rating: newReviewRating,
      title: 'Verified Client Feedback',
      comment: newReviewComment.trim(),
      likes: 1
    };
    setReviews((prev) => [created, ...prev]);
    setNewReviewerName('');
    setNewReviewComment('');
    setReviewFormError('');
    setIsWriteReviewOpen(false);
    setShowAllReviews(true);
    triggerToast('Thank you! Your 5-star review has been added to Pakistan Real Estate.');
  };

  const openViewingScheduler = (propertyId?: string) => {
    if (propertyId) {
      setSchedulerPropertyId(propertyId);
    }
    setSchedulerSubmitted(false);
    setSchedulerError('');
    setIsSchedulerOpen(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewerName.trim()) {
      setSchedulerError('Please provide your name for the site visit appointment.');
      return;
    }
    if (!viewerPhone.trim() || viewerPhone.trim().length < 7) {
      setSchedulerError('Please enter a valid mobile or WhatsApp number (e.g., 0303-5427423).');
      return;
    }
    setSchedulerError('');
    setSchedulerSubmitted(true);
  };

  const handleDeskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deskName.trim()) {
      setDeskError('Please enter your full name.');
      return;
    }
    if (!deskPhone.trim() && !deskEmail.trim()) {
      setDeskError('Please provide either a phone number or email address.');
      return;
    }
    setDeskError('');
    setDeskSubmitted(true);
  };

  // Calculate monthly acquisition carrying cost in PKR
  const valuationBreakdown = useMemo(() => {
    const target = activeDossier || heroProperty;
    const totalPkr = target.price * 10000000; // Crore to PKR
    const principalLoan = totalPkr * (1 - downPaymentPct / 100);
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    const monthlyMortgage =
      monthlyRate > 0
        ? (principalLoan * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
        : principalLoan / totalPayments;
    const monthlyTax = target.annualPropertyTax / 12;
    const monthlyMaintenance = target.annualMaintenance / 12;
    return {
      downPaymentCrore: (target.price * (downPaymentPct / 100)).toFixed(2),
      principalCrore: (target.price * (1 - downPaymentPct / 100)).toFixed(2),
      monthlyMortgage: Math.round(monthlyMortgage),
      monthlyTax: Math.round(monthlyTax),
      monthlyMaintenance: Math.round(monthlyMaintenance),
      totalMonthlyCarry: Math.round(monthlyMortgage + monthlyTax + monthlyMaintenance)
    };
  }, [activeDossier, heroProperty, downPaymentPct, interestRate, loanTermYears]);

  const calendarDays = [
    { day: 10, label: 'Thu', available: true },
    { day: 11, label: 'Fri', available: true },
    { day: 12, label: 'Sat', available: true },
    { day: 13, label: 'Sun', available: true },
    { day: 14, label: 'Mon', available: true },
    { day: 15, label: 'Tue', available: true },
    { day: 16, label: 'Wed', available: true },
    { day: 17, label: 'Thu', available: true },
    { day: 18, label: 'Fri', available: true },
    { day: 19, label: 'Sat', available: true },
    { day: 20, label: 'Sun', available: true },
    { day: 21, label: 'Mon', available: true },
    { day: 22, label: 'Tue', available: true },
    { day: 23, label: 'Wed', available: true }
  ];

  return (
    <div className="min-h-screen nocturne-ambient-bg text-white flex flex-col selection:bg-[#C8102E] selection:text-white">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 glass-tier-1">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-2xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C8102E]"
          >
            Pakistan Real Estate
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A9B2C9]">
            <a
              href="#overview"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#C8102E] whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#photos"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#C8102E] whitespace-nowrap shrink-0"
            >
              Photos
            </a>
            <a
              href="#residences"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#C8102E] whitespace-nowrap shrink-0"
            >
              Properties
            </a>
            <a
              href="#reviews"
              className="hover:text-white transition-colors py-1 border-b-2 border-transparent hover:border-[#C8102E] whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openViewingScheduler(heroProperty.id)}
              className="btn-crimson px-5 py-2.5 text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 cursor-pointer"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING TOAST FEEDBACK FOR MAPS ACTIONS */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-tier-3 px-5 py-3.5 rounded-xl text-xs font-semibold text-white flex items-center gap-3 border border-[#C8102E]/50">
          <Check className="w-4 h-4 text-[#C8102E] shrink-0" />
          <span>{actionToast}</span>
        </div>
      )}

      <main id="top" className="flex-1">
        {/* SECTION 1: HERO AGENCY SHOWCASE & UPLOADED GALLERY CAROUSEL */}
        <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 pt-10 lg:pt-14 pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Editorial Column (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between py-1">
              <div className="space-y-5">
                {/* Unboxed quiet metadata line - zero pill discipline */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#A9B2C9]">
                  <span className="text-[#C8102E]">{AGENCY_INFO.rating} ★ ({reviews.length} REVIEWS)</span>
                  <span aria-hidden="true">·</span>
                  <span>{AGENCY_INFO.founded}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-white">{AGENCY_INFO.hours}</span>
                </div>

                <div className="space-y-2">
                  <p className="font-display text-2xl sm:text-3xl text-[#C8102E] font-medium" dir="rtl">
                    {AGENCY_INFO.urduName}
                  </p>
                  <h1
                    className="font-display text-4xl sm:text-5xl lg:text-[52px] font-semibold text-white leading-[1.12] tracking-[-0.02em]"
                    style={{ textWrap: 'balance' }}
                  >
                    Board of Pakistan Real Estate · Lahore.
                  </h1>
                </div>

                <p className="text-[#A9B2C9] text-base leading-relaxed max-w-[62ch]">
                  Headquartered at <strong className="text-white font-semibold">{AGENCY_INFO.address}</strong>. Trusted 24-hour real estate agency specializing in residential villas, commercial plazas, and verified plot registries along Main Ferozepur Road, Lahore.
                </p>

                {/* Direct Contact & Plus Code Bar */}
                <div className="pt-2 space-y-2 text-xs text-[#A9B2C9]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
                    <span className="text-white">{AGENCY_INFO.address}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={`tel:${AGENCY_INFO.phoneTel}`}
                      className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#C8102E] transition-colors tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>{AGENCY_INFO.phone}</span>
                    </a>
                    <span aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(AGENCY_INFO.plusCode, 'Plus Code')}
                      className="inline-flex items-center gap-1.5 text-[#A9B2C9] hover:text-white transition-colors cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#C8102E]" />
                      <span>{AGENCY_INFO.plusCode}</span>
                      <Copy className="w-3 h-3 opacity-70" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Featured Office & Property Highlights */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src={AGENCY_INFO.officeExteriorUrduImage}
                    alt="پاکستان اسٹیٹ Office Exterior"
                    onClick={() => setActiveLightboxPhoto(galleryPhotos[1])}
                    className="w-20 h-16 rounded-xl object-cover border border-white/15 shrink-0 cursor-pointer hover:border-[#C8102E] transition-colors"
                  />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                      Verified Office Storefront · 16-F1 Commercial
                    </p>
                    <h2 className="font-display text-lg sm:text-xl text-white mt-0.5">
                      پاکستان اسٹیٹ · Pak Arab F1 Phase-2
                    </h2>
                    <p className="text-xs text-[#A9B2C9] mt-0.5">
                      Click any thumbnail on the right to inspect office &amp; property photos
                    </p>
                  </div>
                </div>

                {/* Spec Strip partitioned by micro-borders */}
                <div className="grid grid-cols-3 border-y border-white/[0.08] py-3 text-left">
                  <div className="pr-4 border-r border-white/[0.08]">
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-[#A9B2C9]">
                      Established
                    </span>
                    <span className="text-base font-semibold text-white tabular-nums">
                      Since 2013
                    </span>
                  </div>
                  <div className="px-4 border-r border-white/[0.08]">
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-[#A9B2C9]">
                      Google Rating
                    </span>
                    <span className="text-base font-semibold text-white tabular-nums">
                      5.0 ★ (5 Reviews)
                    </span>
                  </div>
                  <div className="pl-4">
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-[#A9B2C9]">
                      Office Status
                    </span>
                    <span className="text-base font-semibold text-white tabular-nums">
                      Open 24 Hours
                    </span>
                  </div>
                </div>

                {/* Primary CTA + Direct Call Action */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => openViewingScheduler(heroProperty.id)}
                    className="btn-crimson px-6 py-3.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Book Office Visit (16-F1)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${AGENCY_INFO.phoneTel}`}
                    className="btn-secondary-glass px-5 py-3.5 text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4 text-[#C8102E]" />
                    <span>Call {AGENCY_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Hero Showcase featuring all 5 uploaded photos (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative rounded-[28px] overflow-hidden border border-white/10 bg-[#111A3A] min-h-[380px] lg:min-h-[470px] flex-1 flex flex-col justify-end group">
                <img
                  src={currentHeroPhoto.src}
                  alt={currentHeroPhoto.title}
                  onClick={() => setActiveLightboxPhoto(currentHeroPhoto)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] cursor-pointer"
                />

                {/* Measured contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/35 to-transparent pointer-events-none" />

                {/* Top Right Fullscreen Lightbox Trigger */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={() => setActiveLightboxPhoto(currentHeroPhoto)}
                    className="px-3.5 py-2 rounded-xl bg-[#0A1128]/80 border border-white/15 text-xs font-semibold text-white flex items-center gap-2 hover:border-[#C8102E] transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>Enlarge Photo</span>
                  </button>
                </div>

                {/* Bottom Overlay Metadata Bar */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#A9B2C9]">
                      <span className="text-[#C8102E] font-bold uppercase tracking-wider">
                        {currentHeroPhoto.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{currentHeroPhoto.subtitle}</span>
                    </div>
                    <p className="font-display text-xl sm:text-2xl text-white">
                      {currentHeroPhoto.title}
                    </p>
                  </div>

                  <a
                    href="#photos"
                    className="self-start sm:self-auto text-xs font-semibold text-white hover:text-[#C8102E] transition-colors border-b border-[#C8102E] pb-1 whitespace-nowrap shrink-0"
                  >
                    View All {galleryPhotos.length} Photos →
                  </a>
                </div>
              </div>

              {/* 5-Thumbnail Interactive Strip of the User's Uploaded Photos */}
              <div className="grid grid-cols-5 gap-3">
                {galleryPhotos.slice(0, 5).map((item, idx) => {
                  const isActive = activeHeroImageIndex === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveHeroImageIndex(idx)}
                      className={`relative rounded-2xl overflow-hidden aspect-[16/10] border transition-all cursor-pointer group ${
                        isActive
                          ? 'border-[#C8102E] ring-2 ring-[#C8102E]/40 scale-[1.02]'
                          : 'border-white/10 opacity-75 hover:opacity-100 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-semibold text-white truncate text-left">
                        {item.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GOOGLE MAPS OVERVIEW & INTERACTIVE ACTION BAR SECTION */}
          <div id="overview" className="mt-12 glass-tier-2 rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#A9B2C9]">
                  <span className="text-white font-bold">{AGENCY_INFO.name}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-display text-sm text-[#C8102E]" dir="rtl">
                    {AGENCY_INFO.urduName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Google Business Profile Overview</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-white">
                  {AGENCY_INFO.address}
                </h2>
              </div>

              {/* Interactive Google Maps Action Buttons: Directions, Save, Nearby, Send to phone, Share */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    AGENCY_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-crimson px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const next = !isSavedAgency;
                    setIsSavedAgency(next);
                    triggerToast(
                      next
                        ? 'Pakistan Real Estate (16-F1 Commercial) saved to your shortlist.'
                        : 'Removed from saved places.'
                    );
                  }}
                  className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSavedAgency
                      ? 'bg-[#C8102E]/20 border-[#C8102E] text-white'
                      : 'btn-secondary-glass'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>{isSavedAgency ? 'Saved' : 'Save'}</span>
                </button>

                <a
                  href="#nearby-agencies"
                  className="btn-secondary-glass px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Compass className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Nearby</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setPhoneSentSuccess(false);
                    setIsSendToPhoneOpen(true);
                  }}
                  className="btn-secondary-glass px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Send to phone</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
                      `${AGENCY_INFO.name} (${AGENCY_INFO.urduName}) — ${AGENCY_INFO.address} · Tel: ${AGENCY_INFO.phone} · Plus Code: ${AGENCY_INFO.plusCode}`,
                      'Agency details'
                    )
                  }
                  className="btn-secondary-glass px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* 4-Column Agency Key Metadata Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="sm:border-r border-white/[0.08] sm:pr-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                  Verified Google Rating
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-display text-3xl font-semibold text-white tabular-nums">
                    5.0
                  </span>
                  <div className="flex items-center text-[#C8102E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8102E]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#A9B2C9] mt-1">
                  Based on {reviews.length} verified client reviews
                </p>
              </div>

              <div className="lg:border-r border-white/[0.08] lg:pr-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                  Office Operating Hours
                </p>
                <p className="font-display text-3xl font-semibold text-white mt-2">
                  Open 24 Hours
                </p>
                <p className="text-xs text-[#A9B2C9] mt-1">
                  7 days a week · 16-F1 Commercial Phase-2
                </p>
              </div>

              <div className="sm:border-r border-white/[0.08] sm:pr-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                  Direct Contact &amp; WhatsApp
                </p>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-white tabular-nums mt-2">
                  +92 303 5427423
                </p>
                <p className="text-xs text-[#A9B2C9] mt-1">
                  Instant plot &amp; house valuation desk
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                  Plus Code &amp; Postal Zone
                </p>
                <p className="font-display text-2xl sm:text-3xl font-semibold text-white tabular-nums mt-2">
                  C8FR+G8 Lahore
                </p>
                <p className="text-xs text-[#A9B2C9] mt-1">
                  Pak Arab Housing Society, Lahore 54100
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PHOTOS & VIDEOS GALLERY (All · Exterior · By owner) */}
        <section id="photos" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 lg:py-20 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                Photos &amp; Videos · 16-F1 Commercial Pak Arab Phase-2
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-white mt-2">
                Office Exterior, Signboard &amp; Owner Gallery
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Filter Tabs: All | Exterior | By owner */}
              <div className="flex items-center gap-1 p-1 bg-[#111A3A] rounded-xl border border-white/10">
                {(['All', 'Exterior', 'By owner'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setPhotoFilter(tab)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      photoFilter === tab
                        ? 'bg-[#C8102E] text-white'
                        : 'text-[#A9B2C9] hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsAddPhotoOpen(true)}
                className="btn-secondary-glass px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Add photos &amp; videos</span>
              </button>
            </div>
          </div>

          {/* Bento Photo Grid showcasing the uploaded images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGalleryPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxPhoto(photo)}
                className={`listing-card-interactive rounded-[24px] overflow-hidden cursor-pointer group flex flex-col justify-between ${
                  index === 0 && photoFilter === 'All' ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A1128]">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111A3A] via-transparent to-black/25" />

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-lg bg-[#0A1128]/80 border border-white/15 text-[11px] font-semibold text-white flex items-center gap-1.5">
                      <Camera className="w-3 h-3 text-[#C8102E]" />
                      <span>{photo.category}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                      <span className="text-[#C8102E]">{photo.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{photo.dateAdded}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-white mt-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#A9B2C9] mt-0.5">{photo.subtitle}</p>
                  </div>

                  <Maximize2 className="w-4 h-4 text-[#A9B2C9] group-hover:text-white shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: PAK ARAB SOCIETY & LAHORE PROPERTY LISTINGS */}
        <section id="residences" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 lg:py-24 border-t border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                16-F1 Commercial · Pak Arab F1 Phase-2 Portfolio
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium text-white leading-tight mt-2">
                Active Property Mandates
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive Comparison Drawer Button */}
              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                className="btn-secondary-glass px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Scale className="w-4 h-4 text-[#C8102E]" />
                <span>Compare Properties ({compareIds.length}/3)</span>
              </button>
            </div>
          </div>

          {/* Interactive Search & Architectural Filter Console */}
          <div className="glass-tier-2 rounded-[24px] p-5 sm:p-6 mb-12 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Field */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-[#A9B2C9] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search F1 Phase-2, 16-F1 Commercial, 10 Marla, 1 Kanal..."
                  aria-label="Search Pak Arab Society properties"
                  className="input-nocturne w-full pl-11 pr-9 py-3 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9B2C9] hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Price Ceiling Slider */}
              <div className="md:col-span-4 px-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#A9B2C9] font-medium">Budget Ceiling (PKR)</span>
                  <span className="text-white font-semibold tabular-nums">
                    Up to PKR {maxPriceCrore.toFixed(1)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={12}
                  step={0.5}
                  value={maxPriceCrore}
                  onChange={(e) => setMaxPriceCrore(Number(e.target.value))}
                  aria-label="Maximum price ceiling in Crore PKR"
                  className="w-full accent-[#C8102E] cursor-pointer h-1.5 bg-[#0A1128] rounded-lg"
                />
              </div>

              {/* Sort Selector */}
              <div className="md:col-span-3">
                <label htmlFor="sort-select" className="sr-only">
                  Sort Portfolio
                </label>
                <div className="relative">
                  <SlidersHorizontal className="w-4 h-4 text-[#A9B2C9] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="input-nocturne w-full pl-10 pr-4 py-3 text-sm appearance-none cursor-pointer bg-[#0A1128]"
                  >
                    <option value="featured">Featured F1 Phase-2</option>
                    <option value="price-desc">Price: Highest First</option>
                    <option value="price-asc">Price: Lowest First</option>
                    <option value="sqft-desc">Area: Largest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom Filter Bar: Segmented Category Controls + Custom 20px Checkbox */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Interactive Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0A1128]/80 rounded-xl border border-white/[0.06]">
                {(['All', 'Residential Villa', 'Commercial', 'Penthouse', 'Plot & Registry'] as const).map(
                  (cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#C8102E] text-white shadow-sm'
                            : 'text-[#A9B2C9] hover:text-white'
                        }`}
                      >
                        {cat === 'All' ? 'All Categories' : cat}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Custom 20px Square Glass Checkbox for Direct Mandates */}
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={directMandateOnly}
                    onClick={() => setDirectMandateOnly(!directMandateOnly)}
                    className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors cursor-pointer ${
                      directMandateOnly
                        ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                        : 'bg-white/[0.03] border border-white/20 text-transparent hover:border-white/40'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <span className="text-xs font-medium text-[#A9B2C9] hover:text-white transition-colors">
                    Direct Owner Keys at 16-F1 Office Only
                  </span>
                </label>

                <span className="text-xs text-[#A9B2C9] tabular-nums hidden sm:inline">
                  Showing {filteredProperties.length} of {PROPERTIES.length} listings
                </span>
              </div>
            </div>
          </div>

          {/* Listing Cards Grid */}
          {filteredProperties.length === 0 ? (
            <div className="glass-tier-2 rounded-[24px] p-12 text-center max-w-xl mx-auto my-8 space-y-4">
              <Compass className="w-10 h-10 text-[#C8102E] mx-auto opacity-80" />
              <h3 className="font-display text-2xl text-white">
                No Listings Match Your Current Filter
              </h3>
              <p className="text-sm text-[#A9B2C9]">
                Reset the filter criteria or call +92 303 5427423 for fresh 5 Marla, 10 Marla, and Commercial inventory in Pak Arab Housing Society.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setPhotoFilter('All');
                  setSearchQuery('');
                  setMaxPriceCrore(12);
                  setDirectMandateOnly(false);
                }}
                className="btn-secondary-glass px-5 py-2.5 text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map((property) => {
                const isSelectedForCompare = compareIds.includes(property.id);

                return (
                  <article
                    key={property.id}
                    className="listing-card-interactive rounded-[24px] overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Edge-masked Top Architectural Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A1128]">
                        {!failedImages[property.id] ? (
                          <img
                            src={property.image}
                            alt={`${property.title} in ${property.location}`}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [property.id]: true }))
                            }
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#111A3A] to-[#0A1128] flex flex-col items-center justify-center p-6 text-center">
                            <Building2 className="w-8 h-8 text-[#C8102E] mb-2" />
                            <span className="font-display text-base text-white">
                              {property.title}
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#111A3A] via-transparent to-black/30" />

                        {/* Compare Checkbox Toggle in Top Right */}
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            type="button"
                            onClick={() => toggleCompare(property.id)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 backdrop-blur-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                              isSelectedForCompare
                                ? 'bg-[#C8102E] text-white border border-[#C8102E]'
                                : 'bg-[#0A1128]/75 text-white border border-white/15 hover:bg-[#0A1128]'
                            }`}
                          >
                            {isSelectedForCompare ? (
                              <>
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Comparing</span>
                              </>
                            ) : (
                              <>
                                <Scale className="w-3 h-3" />
                                <span>Compare</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Price Valuation Overlay at bottom-left of image */}
                        <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between">
                          <span className="font-display text-2xl font-semibold text-white tabular-nums drop-shadow">
                            {property.priceFormatted}
                          </span>
                          <span className="text-xs text-[#A9B2C9] tabular-nums">
                            Photo: {property.photoCategory}
                          </span>
                        </div>
                      </div>

                      {/* Card Body Content */}
                      <div className="p-6 space-y-4">
                        {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                          <span className="text-[#C8102E]">{property.status}</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{property.coordinates}</span>
                        </div>

                        <div>
                          <h3 className="font-display text-[22px] font-semibold text-white leading-snug">
                            {property.title}
                          </h3>
                          <p className="text-xs text-[#A9B2C9] mt-1">
                            {property.location}
                          </p>
                        </div>

                        <p className="text-sm text-[#A9B2C9] line-clamp-2 leading-relaxed">
                          {property.summary}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Spec Strip & Actions */}
                    <div className="px-6 pb-6 space-y-4">
                      {/* Horizontal Spec Strip partitioned by micro-borders */}
                      <div className="grid grid-cols-3 border-y border-white/[0.08] py-3 text-xs">
                        <div className="pr-3 border-r border-white/[0.08]">
                          <span className="text-[#A9B2C9] block text-[10px] uppercase tracking-wider">
                            Bedrooms
                          </span>
                          <span className="text-white font-semibold tabular-nums">
                            {property.beds > 0 ? `${property.beds} Suites` : 'Commercial'}
                          </span>
                        </div>
                        <div className="px-3 border-r border-white/[0.08]">
                          <span className="text-[#A9B2C9] block text-[10px] uppercase tracking-wider">
                            Plot / Size
                          </span>
                          <span className="text-white font-semibold tabular-nums truncate block">
                            {property.acreage.split('(')[0]}
                          </span>
                        </div>
                        <div className="pl-3">
                          <span className="text-[#A9B2C9] block text-[10px] uppercase tracking-wider">
                            Covered Area
                          </span>
                          <span className="text-white font-semibold tabular-nums">
                            {property.sqFt.toLocaleString()} Sq Ft
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDossier(property);
                            setDossierTab('architecture');
                          }}
                          className="btn-secondary-glass flex-1 py-2.5 px-4 text-xs font-semibold text-center whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Inspect Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openViewingScheduler(property.id)}
                          className="btn-crimson py-2.5 px-4 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* SECTION 4: GOOGLE REVIEWS SUMMARY, CLIENT REVIEWS & "PEOPLE ALSO SEARCH FOR" */}
        <section id="reviews" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 lg:py-24 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: 5.0 Review Summary & Distribution (4 cols) */}
            <div className="lg:col-span-4 glass-tier-2 rounded-[24px] p-8 space-y-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  Google Review Summary
                </p>
                <h2 className="font-display text-3xl text-white mt-1">
                  Client Trust &amp; Ratings
                </h2>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-white/[0.08]">
                <div>
                  <span className="font-display text-5xl font-semibold text-white tabular-nums">
                    5.0
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[#C8102E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#C8102E]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#A9B2C9] tabular-nums">
                    {reviews.length} verified Google reviews
                  </p>
                </div>
              </div>

              {/* Rating Bars 5 to 1 */}
              <div className="space-y-2.5 text-xs">
                {[
                  { star: 5, pct: '100%' },
                  { star: 4, pct: '0%' },
                  { star: 3, pct: '0%' },
                  { star: 2, pct: '0%' },
                  { star: 1, pct: '0%' }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3">
                    <span className="w-3 text-white font-semibold tabular-nums">{row.star}</span>
                    <div className="flex-1 h-2 rounded-full bg-[#0A1128] overflow-hidden border border-white/[0.06]">
                      <div
                        className="h-full bg-[#C8102E] rounded-full"
                        style={{ width: row.pct }}
                      />
                    </div>
                    <span className="w-9 text-right text-[#A9B2C9] tabular-nums">{row.pct}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(true)}
                className="btn-crimson w-full py-3 px-5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a review</span>
              </button>
            </div>

            {/* Right Column: Verified Client Reviews List (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white">
                    Verified Reviews ({reviews.length})
                  </h3>
                  <p className="text-xs text-[#A9B2C9] mt-0.5">
                    Real feedback from Pak Arab Housing Society &amp; Ferozepur Road clients
                  </p>
                </div>

                {/* Sort Reviews Control */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#A9B2C9]">Sort:</span>
                  <div className="flex items-center gap-1 p-1 bg-[#111A3A] rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setReviewSort('relevant')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                        reviewSort === 'relevant'
                          ? 'bg-[#C8102E] text-white'
                          : 'text-[#A9B2C9] hover:text-white'
                      }`}
                    >
                      Most Relevant
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewSort('newest')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ${
                        reviewSort === 'newest'
                          ? 'bg-[#C8102E] text-white'
                          : 'text-[#A9B2C9] hover:text-white'
                      }`}
                    >
                      Newest
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {sortedReviews.map((rev) => {
                  const isLiked = !!likedReviews[rev.id];
                  const likeCount = rev.likes + (isLiked ? 1 : 0);

                  return (
                    <div
                      key={rev.id}
                      className="glass-tier-2 rounded-[24px] p-6 sm:p-8 space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display text-xl text-white font-semibold">
                            {rev.author}
                          </h4>
                          {/* Unboxed metadata line */}
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#A9B2C9] mt-0.5">
                            <span className="text-[#C8102E] font-semibold">{rev.badge}</span>
                            <span aria-hidden="true">·</span>
                            <span>{rev.stats}</span>
                            <span aria-hidden="true">·</span>
                            <span>{rev.timeAgo}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#C8102E]">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-[#C8102E]" />
                          ))}
                        </div>
                      </div>

                      <p className="text-white text-base leading-relaxed">
                        “{rev.comment}”
                      </p>

                      <div className="pt-3 border-t border-white/[0.08] flex items-center gap-6 text-xs text-[#A9B2C9]">
                        <button
                          type="button"
                          onClick={() => toggleReviewLike(rev.id)}
                          className={`inline-flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                            isLiked ? 'text-[#C8102E]' : 'hover:text-white'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Like ({likeCount})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(
                              `"${rev.comment}" — ${rev.author} on Pakistan Real Estate`,
                              'Review'
                            )
                          }
                          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {reviews.length > 3 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="btn-secondary-glass px-5 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    {showAllReviews
                      ? 'Show Fewer Reviews'
                      : `More reviews (${reviews.length - 3})`}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* PEOPLE ALSO SEARCH FOR / FEROZEPUR ROAD MARKET COMPARISON */}
          <div id="nearby-agencies" className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                People Also Search For · Pak Arab Society &amp; Ferozepur Road
              </p>
              <h3 className="font-display text-2xl sm:text-3xl text-white mt-1">
                Lahore Real Estate Agency Benchmark Directory
              </h3>
            </div>

            <div className="overflow-x-auto glass-tier-2 rounded-[24px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                    <th className="py-4 px-6">Agency Name</th>
                    <th className="py-4 px-6">Classification</th>
                    <th className="py-4 px-6">Sector / Corridor</th>
                    <th className="py-4 px-6 text-right">Google Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-sm">
                  {NEARBY_COMPETITORS.map((agency, idx) => (
                    <tr
                      key={agency.name}
                      className={idx === 0 ? 'bg-[#C8102E]/10' : 'hover:bg-white/[0.02]'}
                    >
                      <td className="py-4 px-6 font-semibold text-white">
                        {agency.name}
                      </td>
                      <td className="py-4 px-6 text-xs text-[#A9B2C9]">{agency.type}</td>
                      <td className="py-4 px-6 text-xs text-[#A9B2C9]">{agency.locationNote}</td>
                      <td className="py-4 px-6 text-right font-semibold text-white tabular-nums">
                        <span className="text-[#C8102E]">★ {agency.rating}</span>{' '}
                        <span className="text-xs text-[#A9B2C9]">({agency.reviews})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: ADVISORY CAPABILITIES */}
        <section id="advisory" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 lg:py-24 border-t border-white/[0.08]">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
              Why Clients Choose Pakistan Real Estate
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium text-white leading-tight mt-2"
              style={{ textWrap: 'balance' }}
            >
              24-Hour Dealership &amp; Verified Documentation at 16-F1 Commercial.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {ADVISORY_CAPABILITIES.map((cap) => (
              <div
                key={cap.index}
                className={`${cap.spanClass} glass-tier-2 rounded-[24px] p-8 sm:p-10 flex flex-col justify-between space-y-8`}
              >
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-semibold text-[#C8102E] tabular-nums">
                      {cap.index}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                      {cap.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-white font-medium">
                    {cap.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#A9B2C9] leading-relaxed max-w-[68ch]">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.08em] text-[#A9B2C9]">
                    {cap.metricLabel}
                  </span>
                  <span className="font-display text-xl text-white font-semibold tabular-nums">
                    {cap.metricValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: ABOUT & 24-HOUR INQUIRY DESK */}
        <section id="private-desk" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-16 py-16 lg:py-24 border-t border-white/[0.08]">
          <div className="glass-tier-2 rounded-[28px] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                About · Pakistan Real Estate (پاکستان ریئل اسٹیٹ)
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl text-white font-medium leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Visit 16-F1 Commercial or Request a Property Valuation.
              </h2>

              {/* Embedded Official Board Emblem Image */}
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={AGENCY_INFO.boardBannerImage}
                  alt="Board of Pakistan Real Estate — Founded 2013"
                  className="w-full h-44 object-cover"
                />
              </div>

              <p className="text-sm sm:text-base text-[#A9B2C9] leading-relaxed">
                Whether you are buying a family house in Pak Arab Housing Society Phase-2, investing in an F1 Commercial plot, or selling your property on Ferozepur Road Lahore, our office is open 24 hours.
              </p>

              <div className="pt-4 border-t border-white/[0.08] space-y-4 text-sm text-[#A9B2C9]">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C8102E] font-bold">
                    Head Office Address
                  </span>
                  <span className="text-white font-medium mt-0.5 block">
                    {AGENCY_INFO.address}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Operating Hours</span>
                  <span className="text-white font-medium">{AGENCY_INFO.hours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Direct Phone / WhatsApp</span>
                  <a
                    href={`tel:${AGENCY_INFO.phoneTel}`}
                    className="text-white font-semibold hover:text-[#C8102E] tabular-nums"
                  >
                    {AGENCY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Google Plus Code</span>
                  <span className="text-white font-medium tabular-nums">
                    {AGENCY_INFO.plusCode}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              {deskSubmitted ? (
                <div className="p-8 sm:p-10 rounded-[20px] bg-[#0A1128]/90 border border-[#C8102E]/40 space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-[#C8102E]/20 border border-[#C8102E] flex items-center justify-center text-white">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-white">
                    Inquiry Received at 16-F1 Commercial Desk
                  </h3>
                  <p className="text-sm text-[#A9B2C9] leading-relaxed">
                    MashaAllah, thank you <span className="text-white font-semibold">{deskName}</span>. Our senior advisor at{' '}
                    <span className="text-white">Pakistan Real Estate (پاکستان ریئل اسٹیٹ)</span> will contact you shortly regarding your{' '}
                    <span className="text-white">{deskCapitalBand}</span> requirement in Pak Arab Housing Society. For urgent assistance, call{' '}
                    <span className="text-white font-semibold">{AGENCY_INFO.phone}</span> (Open 24 Hours).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDeskSubmitted(false);
                      setDeskName('');
                      setDeskEmail('');
                      setDeskPhone('');
                      setDeskNotes('');
                    }}
                    className="btn-secondary-glass px-5 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDeskSubmit} className="space-y-5" noValidate>
                  {/* Mandate Type Segmented Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2">
                      Service Requirement
                    </label>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-[#0A1128]/90 rounded-xl border border-white/[0.08]">
                      {(
                        [
                          { id: 'buy', label: 'Buy House / Plot' },
                          { id: 'sell', label: 'Sell My Property' },
                          { id: 'commercial', label: '16-F1 Commercial' }
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setDeskMandateType(tab.id)}
                          className={`py-2.5 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 truncate cursor-pointer ${
                            deskMandateType === tab.id
                              ? 'bg-[#C8102E] text-white'
                              : 'text-[#A9B2C9] hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="desk-name"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                      >
                        Your Full Name *
                      </label>
                      <input
                        id="desk-name"
                        type="text"
                        required
                        value={deskName}
                        onChange={(e) => setDeskName(e.target.value)}
                        placeholder="e.g., Muhammad Nasir"
                        className="input-nocturne w-full px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="desk-phone"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                      >
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        id="desk-phone"
                        type="tel"
                        required
                        value={deskPhone}
                        onChange={(e) => setDeskPhone(e.target.value)}
                        placeholder="+92 303 5427423"
                        className="input-nocturne w-full px-4 py-3 text-sm tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="desk-email"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                      >
                        Email Address (Optional)
                      </label>
                      <input
                        id="desk-email"
                        type="email"
                        value={deskEmail}
                        onChange={(e) => setDeskEmail(e.target.value)}
                        placeholder="client@example.com"
                        className="input-nocturne w-full px-4 py-3 text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="desk-capital"
                        className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                      >
                        Budget / Valuation Range
                      </label>
                      <select
                        id="desk-capital"
                        value={deskCapitalBand}
                        onChange={(e) => setDeskCapitalBand(e.target.value)}
                        className="input-nocturne w-full px-4 py-3 text-sm bg-[#0A1128] cursor-pointer"
                      >
                        <option value="PKR 1.5 Crore – 3 Crore (5 Marla)">
                          PKR 1.5 Crore – 3 Crore (5 Marla)
                        </option>
                        <option value="PKR 3 Crore – 6 Crore (10 Marla)">
                          PKR 3 Crore – 6 Crore (10 Marla)
                        </option>
                        <option value="PKR 6 Crore – 10 Crore (1 Kanal)">
                          PKR 6 Crore – 10 Crore (1 Kanal)
                        </option>
                        <option value="PKR 10 Crore+ (F1 Commercial Plaza)">
                          PKR 10 Crore+ (F1 Commercial Plaza)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="desk-notes"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                    >
                      Block &amp; Property Details
                    </label>
                    <textarea
                      id="desk-notes"
                      rows={3}
                      value={deskNotes}
                      onChange={(e) => setDeskNotes(e.target.value)}
                      placeholder="Specify block preference (e.g., F1 Phase-2, Commercial, Corner House, or Plot Registry Check)..."
                      className="input-nocturne w-full px-4 py-3 text-sm"
                    />
                  </div>

                  {/* Custom 20px Checkbox */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={deskNdaChecked}
                      onClick={() => setDeskNdaChecked(!deskNdaChecked)}
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                        deskNdaChecked
                          ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                          : 'bg-white/[0.03] border border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="text-xs text-[#A9B2C9]">
                      Request direct WhatsApp location pin &amp; verified plot/house documents from 16-F1 Commercial office.
                    </span>
                  </div>

                  {deskError && (
                    <p className="text-xs font-medium text-[#ffb4ab] bg-[#93000a]/40 border border-[#ffb4ab]/30 rounded-lg px-4 py-2.5">
                      {deskError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-crimson w-full sm:w-auto px-8 py-3.5 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Send Inquiry to Pakistan Real Estate
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-white/[0.08] py-12 px-5 md:px-8 lg:px-16 text-xs text-[#A9B2C9]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-semibold text-white">
                Pakistan Real Estate
              </span>
              <span className="font-display text-base text-[#C8102E]" dir="rtl">
                پاکستان ریئل اسٹیٹ
              </span>
            </div>
            <p>
              {AGENCY_INFO.address} · {AGENCY_INFO.plusCode} · {AGENCY_INFO.phone} ({AGENCY_INFO.hours})
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#overview" className="hover:text-white transition-colors">
              Overview
            </a>
            <a href="#photos" className="hover:text-white transition-colors">
              Photos ({galleryPhotos.length})
            </a>
            <a href="#residences" className="hover:text-white transition-colors">
              Properties
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews (5.0 ★)
            </a>
            <button
              type="button"
              onClick={() => openViewingScheduler(heroProperty.id)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL FOR UPLOADED PHOTOS */}
      {activeLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-tier-3 rounded-[24px] max-w-4xl w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  {activeLightboxPhoto.category} · {activeLightboxPhoto.dateAdded}
                </span>
                <h3 className="font-display text-xl text-white mt-0.5">
                  {activeLightboxPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxPhoto(null)}
                className="btn-secondary-glass p-2 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-[#0A1128] max-h-[72vh] flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.title}
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>
            <div className="px-6 py-4 flex items-center justify-between text-xs text-[#A9B2C9]">
              <span>{activeLightboxPhoto.subtitle}</span>
              <span>{AGENCY_INFO.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PHOTOS & VIDEOS */}
      {isAddPhotoOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-tier-3 rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  Google Business Profile Media
                </p>
                <h3 className="font-display text-2xl text-white mt-0.5">
                  Add Photos &amp; Videos
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPhotoOpen(false)}
                className="btn-secondary-glass p-2 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#A9B2C9] mb-1.5">
                  Select Uploaded Asset
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {AGENCY_GALLERY_PHOTOS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPresetImage(p.src)}
                      className={`rounded-xl overflow-hidden aspect-square border cursor-pointer ${
                        selectedPresetImage === p.src
                          ? 'border-[#C8102E] ring-2 ring-[#C8102E]'
                          : 'border-white/10 opacity-65'
                      }`}
                    >
                      <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A9B2C9] mb-1.5">
                  Photo Caption / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  placeholder="e.g., 16-F1 Commercial Front View"
                  className="input-nocturne w-full px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A9B2C9] mb-1.5">
                  Photo Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Exterior', 'By owner'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewPhotoCategory(cat)}
                      className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer ${
                        newPhotoCategory === cat
                          ? 'bg-[#C8102E] border-[#C8102E] text-white'
                          : 'bg-[#0A1128] border-white/10 text-[#A9B2C9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPhotoOpen(false)}
                  className="btn-secondary-glass px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-5 py-2 text-xs font-semibold cursor-pointer"
                >
                  Publish to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SEND TO PHONE */}
      {isSendToPhoneOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-tier-3 rounded-[24px] max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-white">
                Send Location to Phone
              </h3>
              <button
                type="button"
                onClick={() => setIsSendToPhoneOpen(false)}
                className="btn-secondary-glass p-2 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1128]/80 border border-white/10 text-xs space-y-1.5 text-[#A9B2C9]">
              <p className="text-white font-semibold">
                {AGENCY_INFO.name} ({AGENCY_INFO.urduName})
              </p>
              <p>{AGENCY_INFO.address}</p>
              <p className="text-[#C8102E] font-semibold">
                Plus Code: {AGENCY_INFO.plusCode} · Tel: {AGENCY_INFO.phone}
              </p>
            </div>

            {phoneSentSuccess ? (
              <div className="space-y-4">
                <p className="text-xs text-white bg-[#C8102E]/20 border border-[#C8102E] rounded-xl p-4">
                  Location pin and contact card dispatched to <strong>{phoneRecipient}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSendToPhoneOpen(false)}
                  className="btn-crimson w-full py-2.5 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!phoneRecipient.trim()) return;
                  setPhoneSentSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-[#A9B2C9] mb-1.5">
                    Enter Mobile / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneRecipient}
                    onChange={(e) => setPhoneRecipient(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="input-nocturne w-full px-4 py-2.5 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-crimson w-full py-3 text-xs font-semibold cursor-pointer"
                >
                  Send Maps Pin &amp; Contact
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: WRITE A GOOGLE REVIEW */}
      {isWriteReviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="glass-tier-3 rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  {AGENCY_INFO.name} · {AGENCY_INFO.urduName}
                </p>
                <h3 className="font-display text-2xl text-white mt-0.5">
                  Write a Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="btn-secondary-glass p-2 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleWriteReviewSubmit} className="space-y-4" noValidate>
              <div>
                <span className="block text-xs text-[#A9B2C9] mb-2">Your Rating</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1.5 rounded-lg bg-[#0A1128] border border-white/10 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newReviewRating
                            ? 'text-[#C8102E] fill-[#C8102E]'
                            : 'text-[#A9B2C9]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A9B2C9] mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={newReviewerName}
                    onChange={(e) => setNewReviewerName(e.target.value)}
                    placeholder="e.g., Ahmad Raza"
                    className="input-nocturne w-full px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A9B2C9] mb-1">Role / Guide Badge</label>
                  <input
                    type="text"
                    value={newReviewerRole}
                    onChange={(e) => setNewReviewerRole(e.target.value)}
                    placeholder="Local Guide / Buyer"
                    className="input-nocturne w-full px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A9B2C9] mb-1">Your Review *</label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience dealing with Pakistan Real Estate at 16-F1 Commercial, Pak Arab Phase-2..."
                  className="input-nocturne w-full px-3.5 py-2.5 text-sm"
                />
              </div>

              {reviewFormError && (
                <p className="text-xs text-[#ffb4ab]">{reviewFormError}</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWriteReviewOpen(false)}
                  className="btn-secondary-glass px-4 py-2 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-crimson px-5 py-2 text-xs font-semibold cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: ARCHITECTURAL DOSSIER, FLOOR PLAN & VALUATION CALCULATOR */}
      {activeDossier && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
        >
          <div className="glass-tier-3 rounded-[28px] max-w-5xl w-full overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Top Modal Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0A1128]/60">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                  <span className="text-[#C8102E]">{activeDossier.status}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeDossier.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{activeDossier.coordinates}</span>
                </div>
                <h2 id="dossier-modal-title" className="font-display text-2xl sm:text-3xl text-white mt-0.5">
                  {activeDossier.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveDossier(null)}
                aria-label="Close Architectural Dossier"
                className="btn-secondary-glass p-2.5 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Dossier Sub-Navigation Tabs */}
            <div className="px-6 sm:px-8 py-3 border-b border-white/[0.08] bg-[#0A1128]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDossierTab('architecture')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dossierTab === 'architecture'
                      ? 'bg-[#C8102E] text-white'
                      : 'text-[#A9B2C9] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Property Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDossierTab('floorplan')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dossierTab === 'floorplan'
                      ? 'bg-[#C8102E] text-white'
                      : 'text-[#A9B2C9] hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Floor Plan &amp; Materials</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDossierTab('valuation')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dossierTab === 'valuation'
                      ? 'bg-[#C8102E] text-white'
                      : 'text-[#A9B2C9] hover:text-white'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>PKR Installment / Finance Calculator</span>
                </button>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs text-[#A9B2C9] mr-2">Demand:</span>
                <span className="font-display text-lg font-semibold text-white tabular-nums">
                  {activeDossier.priceFormatted}
                </span>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {dossierTab === 'architecture' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-[20px] overflow-hidden border border-white/10 aspect-[16/10] bg-[#0A1128]">
                      <img
                        src={activeDossier.image}
                        alt={activeDossier.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-xl text-white">
                        Architectural &amp; Registry Narrative
                      </h3>
                      <p className="text-sm text-[#A9B2C9] leading-relaxed">
                        {activeDossier.architecturalNarrative}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-6 rounded-[20px] bg-[#0A1128]/70 border border-white/[0.08] space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                        Pakistan Real Estate Verification Ledger
                      </h4>

                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between py-2 border-b border-white/[0.06]">
                          <span className="text-[#A9B2C9]">Representing Agency</span>
                          <span className="text-white font-semibold">Pakistan Real Estate (16-F1)</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.06]">
                          <span className="text-[#A9B2C9]">Direct Contact</span>
                          <span className="text-white font-semibold tabular-nums">{AGENCY_INFO.phone}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.06]">
                          <span className="text-[#A9B2C9]">Covered Area</span>
                          <span className="text-white font-semibold tabular-nums">
                            {activeDossier.sqFt.toLocaleString()} Sq Ft
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.06]">
                          <span className="text-[#A9B2C9]">Plot Dimension</span>
                          <span className="text-white font-semibold tabular-nums">{activeDossier.acreage}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/[0.06]">
                          <span className="text-[#A9B2C9]">Security Protocol</span>
                          <span className="text-white font-semibold">{activeDossier.securityProtocol}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-[#A9B2C9]">Solar &amp; Glazing</span>
                          <span className="text-white font-semibold">{activeDossier.solarAcousticRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-[20px] bg-[#0A1128]/70 border border-white/[0.08] space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                        Key Society &amp; Property Features
                      </h4>
                      <ul className="space-y-2 text-xs text-white">
                        {activeDossier.PrivateAmenities.map((amenity) => (
                          <li key={amenity} className="flex items-start gap-2">
                            <ChevronRight className="w-3.5 h-3.5 text-[#C8102E] shrink-0 mt-0.5" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {dossierTab === 'floorplan' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-2xl text-white">
                      Spatial Schedule &amp; Construction Materials
                    </h3>
                    <p className="text-xs text-[#A9B2C9] mt-1">
                      Verified room dimensions and A+ finishing specifications.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-[20px] border border-white/[0.08]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#0A1128]/80 text-[11px] font-bold uppercase tracking-[0.12em] text-[#A9B2C9]">
                          <th className="py-3.5 px-5">Room / Hall</th>
                          <th className="py-3.5 px-5">Floor Level</th>
                          <th className="py-3.5 px-5">Dimensions</th>
                          <th className="py-3.5 px-5">Net Area</th>
                          <th className="py-3.5 px-5">Specification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06] text-sm">
                        {activeDossier.rooms.map((room) => (
                          <tr key={room.name} className="hover:bg-white/[0.02]">
                            <td className="py-4 px-5 font-semibold text-white">{room.name}</td>
                            <td className="py-4 px-5 text-[#A9B2C9] text-xs">{room.level}</td>
                            <td className="py-4 px-5 text-white tabular-nums font-mono text-xs">
                              {room.dimensions}
                            </td>
                            <td className="py-4 px-5 text-white tabular-nums font-semibold">
                              {room.sqFt.toLocaleString()} sq ft
                            </td>
                            <td className="py-4 px-5 text-[#A9B2C9] text-xs">{room.materialNote}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-6 rounded-[20px] bg-[#0A1128]/70 border border-white/[0.08]">
                    <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#C8102E] mb-3">
                      Construction &amp; Finishing Materials
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
                      {activeDossier.materials.map((mat) => (
                        <div key={mat} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          {mat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {dossierTab === 'valuation' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6 space-y-6 p-6 rounded-[20px] bg-[#0A1128]/70 border border-white/[0.08]">
                    <h3 className="font-display text-xl text-white">
                      Islamic House Finance &amp; Payment Structure
                    </h3>
                    <p className="text-xs text-[#A9B2C9]">
                      Estimate down payment (Token + Bayana) and monthly bank diminishing musharakah installment in PKR.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#A9B2C9]">Down Payment ({downPaymentPct}%)</span>
                          <span className="text-white font-semibold tabular-nums">
                            PKR {valuationBreakdown.downPaymentCrore} Crore
                          </span>
                        </div>
                        <input
                          type="range"
                          min={20}
                          max={100}
                          step={5}
                          value={downPaymentPct}
                          onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                          className="w-full accent-[#C8102E] cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#A9B2C9]">Annual Profit Rate</span>
                          <span className="text-white font-semibold tabular-nums">
                            {interestRate.toFixed(2)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={22}
                          step={0.5}
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full accent-[#C8102E] cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="block text-xs text-[#A9B2C9] mb-2">Tenure Years</span>
                        <div className="grid grid-cols-3 gap-2">
                          {[5, 10, 15].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setLoanTermYears(yr)}
                              className={`py-2 rounded-lg text-xs font-semibold tabular-nums cursor-pointer ${
                                loanTermYears === yr
                                  ? 'bg-[#C8102E] text-white'
                                  : 'bg-white/[0.04] text-[#A9B2C9] hover:text-white'
                              }`}
                            >
                              {yr} Years
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-6 rounded-[20px] bg-[#0A1128]/90 border border-white/10 space-y-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                        Estimated Monthly Payment (PKR)
                      </span>
                      <p className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums mt-1">
                        PKR {valuationBreakdown.totalMonthlyCarry.toLocaleString()}{' '}
                        <span className="text-sm font-sans font-normal text-[#A9B2C9]">/ month</span>
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs">
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#A9B2C9]">Financed Amount</span>
                        <span className="text-white font-semibold tabular-nums">
                          PKR {valuationBreakdown.principalCrore} Crore
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#A9B2C9]">Monthly Bank Installment</span>
                        <span className="text-white font-semibold tabular-nums">
                          PKR {valuationBreakdown.monthlyMortgage.toLocaleString()} / mo
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-[#A9B2C9]">Pak Arab Society Security &amp; Maintenance</span>
                        <span className="text-white font-semibold tabular-nums">
                          PKR {valuationBreakdown.monthlyMaintenance.toLocaleString()} / mo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0A1128]/80 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#A9B2C9]">
                Office: <span className="text-white">16-F1 Commercial, Pak Arab F1 Phase-2, Lahore</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeDossier.id;
                    setActiveDossier(null);
                    openViewingScheduler(id);
                  }}
                  className="btn-crimson px-6 py-2.5 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Schedule Site Visit at 16-F1 Commercial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SIDE-BY-SIDE COMPARISON MATRIX */}
      {isCompareOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
        >
          <div className="glass-tier-3 rounded-[28px] max-w-5xl w-full overflow-hidden my-auto">
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  Pakistan Real Estate · Property Matrix
                </p>
                <h2 id="compare-modal-title" className="font-display text-2xl text-white mt-0.5">
                  Side-by-Side Property Comparison
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareOpen(false)}
                aria-label="Close comparison modal"
                className="btn-secondary-glass p-2.5 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-x-auto">
              {comparedProperties.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <p className="text-sm text-[#A9B2C9]">
                    Select up to 3 properties using the &ldquo;Compare&rdquo; button on any card.
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-4 text-xs uppercase tracking-[0.1em] text-[#A9B2C9] w-48">
                        Specification
                      </th>
                      {comparedProperties.map((prop) => (
                        <th key={prop.id} className="py-4 px-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-display text-lg text-white">{prop.title}</p>
                              <p className="text-xs text-[#A9B2C9] font-normal">{prop.location}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleCompare(prop.id)}
                              className="text-xs text-[#A9B2C9] hover:text-white cursor-pointer"
                              title="Remove from comparison"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] text-xs">
                    <tr>
                      <td className="py-3.5 px-4 text-[#A9B2C9] font-medium">Demand Valuation</td>
                      {comparedProperties.map((prop) => (
                        <td key={prop.id} className="py-3.5 px-4 font-display text-base font-semibold text-white tabular-nums">
                          {prop.priceFormatted}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-[#A9B2C9] font-medium">Plot / Size</td>
                      {comparedProperties.map((prop) => (
                        <td key={prop.id} className="py-3.5 px-4 text-white tabular-nums">
                          {prop.acreage}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-[#A9B2C9] font-medium">Covered Area</td>
                      {comparedProperties.map((prop) => (
                        <td key={prop.id} className="py-3.5 px-4 text-white tabular-nums">
                          {prop.sqFt.toLocaleString()} Sq Ft
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 text-[#A9B2C9] font-medium">Solar &amp; Infrastructure</td>
                      {comparedProperties.map((prop) => (
                        <td key={prop.id} className="py-3.5 px-4 text-[#A9B2C9]">
                          {prop.solarAcousticRating}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PRIVATE VIEWING SCHEDULER (TIER 3 GLASS MODAL WITH INTERACTIVE CRIMSON CALENDAR) */}
      {isSchedulerOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#060d24]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="scheduler-modal-title"
        >
          <div
            className="glass-tier-3 rounded-[28px] max-w-2xl w-full overflow-hidden my-auto relative"
            style={{
              backgroundImage:
                'radial-gradient(circle at 85% 15%, rgba(200, 16, 46, 0.14) 0%, transparent 55%)'
            }}
          >
            <div className="px-6 sm:px-8 py-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C8102E]">
                  {AGENCY_INFO.name} · Open 24 Hours · {AGENCY_INFO.phone}
                </p>
                <h2 id="scheduler-modal-title" className="font-display text-2xl sm:text-3xl text-white mt-0.5">
                  Schedule Office &amp; Site Visit
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSchedulerOpen(false)}
                aria-label="Close scheduler modal"
                className="btn-secondary-glass p-2.5 text-[#A9B2C9] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {schedulerSubmitted ? (
              <div className="p-8 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shadow-lg">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-white">
                    Site Visit Confirmed at 16-F1 Commercial
                  </h3>
                  <p className="text-sm text-[#A9B2C9] leading-relaxed">
                    Your visit for{' '}
                    <span className="text-white font-semibold">
                      {PROPERTIES.find((p) => p.id === schedulerPropertyId)?.title}
                    </span>{' '}
                    is scheduled for <span className="text-white font-semibold">November {selectedDateDay}, 2026</span> at{' '}
                    <span className="text-white font-semibold">{selectedTimeSlot}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0A1128]/80 border border-white/10 text-xs space-y-2 text-[#A9B2C9]">
                  <div className="flex justify-between">
                    <span>Visitor Name:</span>
                    <span className="text-white font-semibold">{viewerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meeting Point:</span>
                    <span className="text-white font-semibold">
                      16-F1 Commercial, Pak Arab F1 Phase-2, Lahore
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Agency Phone (24/7):</span>
                    <span className="text-white font-semibold tabular-nums">{AGENCY_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsSchedulerOpen(false)}
                    className="btn-crimson px-6 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    Return to Pakistan Real Estate
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
                {/* Residence Selector */}
                <div>
                  <label
                    htmlFor="scheduler-estate"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2"
                  >
                    Select Property or Plot
                  </label>
                  <select
                    id="scheduler-estate"
                    value={schedulerPropertyId}
                    onChange={(e) => setSchedulerPropertyId(e.target.value)}
                    className="input-nocturne w-full px-4 py-3 text-sm bg-[#0A1128] cursor-pointer"
                  >
                    {PROPERTIES.map((prop) => (
                      <option key={prop.id} value={prop.id}>
                        {prop.title} — {prop.priceFormatted}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interactive Crimson Calendar Date Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9]">
                      Select Visit Date · Open 24 Hours
                    </span>
                    <span className="text-xs text-[#C8102E] font-semibold">
                      7 Days a Week Availability
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((d) => {
                      const isSelected = selectedDateDay === d.day;
                      return (
                        <button
                          key={d.day}
                          type="button"
                          onClick={() => setSelectedDateDay(d.day)}
                          className={`py-2.5 rounded-xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C8102E] border-[#C8102E] text-white shadow-[0_4px_20px_rgba(200,16,46,0.45)]'
                              : 'bg-[#0A1128]/60 border-white/10 text-white hover:border-white/30'
                          }`}
                        >
                          <span className="text-[10px] uppercase text-[#A9B2C9]">{d.label}</span>
                          <span className="text-sm font-semibold tabular-nums mt-0.5">{d.day}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Viewing Slot & Meeting Point */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2">
                      Preferred Time Window
                    </label>
                    <div className="space-y-2">
                      {[
                        '18:00 · Evening Office & Site Inspection (16-F1 Commercial)',
                        '21:30 · Late Night 24/7 Investor Meeting'
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-medium flex items-center gap-2 border transition-colors cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-[#C8102E]/20 border-[#C8102E] text-white'
                              : 'bg-[#0A1128]/60 border-white/10 text-[#A9B2C9] hover:text-white'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
                          <span className="truncate">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-2">
                      Meeting Preference
                    </label>
                    <div className="space-y-2">
                      {(
                        [
                          { id: 'office', label: '16-F1 Commercial Office (Phase-2)' },
                          { id: 'ferozepur', label: 'Pak Arab Society Main Gate Pickup' },
                          { id: 'whatsapp', label: 'Live WhatsApp Video Tour (+92 303 5427423)' }
                        ] as const
                      ).map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setArrivalProtocol(mode.id)}
                          className={`w-full px-3.5 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2 border transition-colors cursor-pointer ${
                            arrivalProtocol === mode.id
                              ? 'bg-[#C8102E]/20 border-[#C8102E] text-white'
                              : 'bg-[#0A1128]/60 border-white/10 text-[#A9B2C9] hover:text-white'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
                          <span className="truncate">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visitor Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="viewer-name"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="viewer-name"
                      type="text"
                      required
                      value={viewerName}
                      onChange={(e) => setViewerName(e.target.value)}
                      placeholder="Your Full Name"
                      className="input-nocturne w-full px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="viewer-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#A9B2C9] mb-1.5"
                    >
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      id="viewer-phone"
                      type="tel"
                      required
                      value={viewerPhone}
                      onChange={(e) => setViewerPhone(e.target.value)}
                      placeholder="0303-5427423"
                      className="input-nocturne w-full px-4 py-2.5 text-sm tabular-nums"
                    />
                  </div>
                </div>

                {/* Custom 20px Checkboxes */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={ndaAccepted}
                      onClick={() => setNdaAccepted(!ndaAccepted)}
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                        ndaAccepted
                          ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                          : 'bg-white/[0.03] border border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="text-xs text-[#A9B2C9]">
                      Prepare original plot/house registry &amp; society transfer file for inspection during visit.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={registryReady}
                      onClick={() => setRegistryReady(!registryReady)}
                      className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                        registryReady
                          ? 'bg-[#C8102E] border border-[#C8102E] text-white'
                          : 'bg-white/[0.03] border border-white/20 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="text-xs text-[#A9B2C9]">
                      Arrange direct meeting with property owner at 16-F1 Commercial office.
                    </span>
                  </div>
                </div>

                {schedulerError && (
                  <p className="text-xs font-medium text-[#ffb4ab] bg-[#93000a]/40 border border-[#ffb4ab]/30 rounded-lg px-4 py-2.5">
                    {schedulerError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSchedulerOpen(false)}
                    className="btn-secondary-glass px-5 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-crimson px-6 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Confirm Appointment</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
