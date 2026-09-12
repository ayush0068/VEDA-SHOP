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
    <section className="relative w-full h-[calc(100vh-100px)] min-h-[540px] sm:min-h-[600px] lg:h-[calc(100vh-112px)] max-h-[860px] bg-vedic-dark overflow-hidden">
      {/* Background media layer */}
      <div className="absolute inset-0">
        {/* Still image — always mounted; visible until the video is ready to take over */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-[2500ms] ease-in-out ${
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
          style={{ filter: 'brightness(0.82) contrast(1.12) saturate(1.05)' }}
          className={`absolute inset-0 w-full h-full object-cover object-right transition-opacity duration-[2500ms] ease-in-out ${
            videoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Readability overlays — stay on throughout (image + video) so text never loses contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>

      {/* Content — one heading, one subheading, two CTAs. No competing elements. */}
      {/* Plain text directly over the dark left-side gradient (no card/box) — merges naturally with the video/image behind it. */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-5 sm:space-y-6">
            <h1 className="font-serif font-extrabold text-white text-2xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight drop-shadow-2xl">
              {heading}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-light leading-relaxed drop-shadow-md">
              {subheading}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
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