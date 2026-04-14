'use client'

import React from 'react'
import Image from "next/image";

type PageHeroProps = {
  eyebrow: string
  headline: string
  subtext?: string
  subtextNoWrap?: boolean
  imagePlaceholder?: string
  imageUrl?: string
  imageObjectPosition?: string
}

export function PageHero({
  eyebrow,
  headline,
  subtext,
  subtextNoWrap = false,
  imagePlaceholder = 'Professional team',
  imageUrl,
  imageObjectPosition = 'center',
}: PageHeroProps) {
  return (
    <>
      <section
        className="page-hero"
        style={{
          display: 'grid',
          gridTemplateColumns: '480px 1fr',
          minHeight: '400px',
        }}
      >
        {/* LEFT — navy text panel */}
        <div
          style={{
            backgroundColor: '#00338D',
            padding: '80px 56px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: 0,
            }}
          >
            {eyebrow}
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: '#FFFFFF',
              lineHeight: 1.2,
              margin: 0,
              fontWeight: 400,
            }}
          >
            {headline}
          </h1>

          {/* Subtext */}
          {subtext && (
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7,
                margin: 0,
                whiteSpace: subtextNoWrap ? 'nowrap' : 'normal',
              }}
            >
              {subtext}
            </p>
          )}

          {/* Bottom accent line */}
          <div
            style={{
              width: '48px',
              height: '3px',
              backgroundColor: '#0091DA',
              marginTop: '8px',
            }}
          />
        </div>

        {/* RIGHT — image area */}
        <div
          className="page-hero-image"
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#E8EEF5',
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={headline}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              style={{
                objectFit: 'cover',
                objectPosition: imageObjectPosition,
              }}
            />
          ) : (
            /* Placeholder — geometric pattern */
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `
              linear-gradient(
                135deg,
                #E8EEF5 0%,
                #D4E0F0 50%,
                #C0D2EC 100%
              )
            `,
              }}
            />
          )}

          {/* Decorative circles — suggests people/activity */}
          <div
            style={{
              position: 'absolute',
              right: '-40px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: '1px solid rgba(0,51,141,0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              border: '1px solid rgba(0,51,141,0.12)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '80px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,145,218,0.08)',
              border: '1px solid rgba(0,145,218,0.15)',
            }}
          />

        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .page-hero {
            grid-template-columns: 1fr !important;
          }
          .page-hero-image {
            height: 240px !important;
          }
        }
      `}</style>
    </>
  )
}

