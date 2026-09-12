import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

export interface HomeHeroProps {
  /**
   * Path to the hero banner image, served from /public.
   * Swap the file at this path (or pass a different one) any time —
   * no other code needs to change.
   */
  imageSrc?: string;
  /** Descriptive alt text for the banner image. */
  imageAlt?: string;
  /**
   * Path to the hero banner video, served from /public.
   * If the file is missing or fails to load, the component simply
   * keeps showing the image — it never breaks the hero.
   */
  videoSrc?: string;
  /** How long the image shows before crossfading into the video (ms). */
  videoDelayMs?: number;
  heading?: string;
  subheading?: string;
  /** Where "SHOP NOW" should take the visitor. */
  shopNowLink?: string;
  /** Fires when "FIND YOUR PRODUCT" is clicked (wire this to your product-finder modal). */
  onFindProductClick: () => void;
  /** Playback speed for the hero video — 0.75 plays it a little slower/calmer than normal. */
  videoPlaybackRate?: number;
}

const DEFAULT_HEADING = 'Authentic Vedic Products from Kashi';
const DEFAULT_SUBHEADING =
  'Rudraksha, Gemstones, Yantras, Puja Samagri and Vedic essentials, thoughtfully curated for your spiritual journey.';

export const HomeHero: React.FC<HomeHeroProps> = ({
  imageSrc = '/images/home/hero-banner.jpg',
  imageAlt = 'Rudraksha mala, Om stone and temple idols — authentic Vedic products from Kashi',
  videoSrc = '/videos/home/hero-banner.mp4',
  videoDelayMs = 2800,
  videoPlaybackRate = 0.75,
  heading = DEFAULT_HEADING,
  subheading = DEFAULT_SUBHEADING,
  shopNowLink = '/shop',
  onFindProductClick
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // keep the still image only

    const timer = setTimeout(() => {
      // Only switch over if the video actually loaded successfully.
      if (!videoFailed) setShowVideo(true);
    }, videoDelayMs);

    return () => clearTimeout(timer);
  }, [videoDelayMs, videoFailed]);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.playbackRate = videoPlaybackRate;
      videoRef.current.play().catch(() => {
        // Autoplay blocked or file missing — fall back to the image.
        setShowVideo(false);
        setVideoFailed(true);
      });
    }
  }, [showVideo, videoPlaybackRate]);

  const videoVisible = showVideo && videoReady && !videoFailed;

  return (
    <section className="relative w-full h-[560px] sm:h-[calc(100vh-100px)] sm:min-h-[600px] lg:h-[calc(100vh-112px)] max-h-[860px] bg-vedic-dark overflow-hidden">
      {/* Background media layer */}
      <div className="absolute inset-0">
        {/* Still image — always mounted; visible until the video is ready to take over.
            Centered crop on mobile (keeps the full scene in frame), shifted right on larger screens
            where there's room to split text-left / photo-right. */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-opacity duration-[2500ms] ease-in-out ${
            videoVisible ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video — preloads silently in the background, then crossfades in slowly for a calm, cinematic feel. Slightly darkened/contrasted so overlaid text stays readable. */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          style={{ filter: 'brightness(0.88) contrast(1.1) saturate(1.05)' }}
          className={`absolute inset-0 w-full h-full object-cover object-center sm:object-right transition-opacity duration-[2500ms] ease-in-out ${
            videoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Mobile overlay — light, bottom-anchored scrim only. Keeps the video/image clearly visible
            up top, and just darkens the lower third where the text sits. */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        {/* Desktop / tablet overlay — the left-text / right-photo split gradient */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>

      {/* Content — one heading, one subheading, two CTAs. No competing elements. */}
      {/* Mobile: anchored to the bottom, full-width, centered — sits on its own scrim so the media reads clearly above it. */}
      {/* Desktop: vertically centered, left-aligned, directly over the left-side gradient (no card/box). */}
      <div className="relative z-10 h-full flex items-end sm:items-center pb-8 sm:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="max-w-full sm:max-w-lg lg:max-w-xl text-center sm:text-left space-y-4 sm:space-y-6">
            <h1 className="font-serif font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight drop-shadow-2xl">
              {heading}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-light leading-relaxed drop-shadow-md mx-auto sm:mx-0 max-w-sm sm:max-w-none">
              {subheading}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <Link
                to={shopNowLink}
                className="inline-flex items-center gap-2 bg-vedic-gold hover:bg-vedic-goldDark text-vedic-dark font-bold uppercase tracking-wide text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={onFindProductClick}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 text-white border border-white/25 hover:border-white/40 font-semibold uppercase tracking-wide text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg backdrop-blur-sm transition-all duration-300"
              >
                <Search className="w-3.5 h-3.5" />
                Find Your Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};