"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

// Type definition
type CaseStudy = {
  id: string;
  type: "case-study";
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  imageUrl: string;
  createdAt: string;
  published: boolean;
};

// Main component
export default function CaseStudies() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/case-studies")
      .then((r) => r.json())
      .then((data) => {
        // Filter out test data and only show published items
        const filtered = data.filter((c: CaseStudy) => {
          const isPublished = c.published;
          const titleLower = c.title.toLowerCase();
          const isTest = titleLower.includes("test");
          if (!isPublished || isTest) {
            console.log("Filtering out:", c.title, "- published:", isPublished, "test:", isTest);
          }
          return isPublished && !isTest;
        });
        console.log("Filtered case studies:", filtered.length, "out of", data.length);
        setCases(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Get unique categories from API data
  const categories = [
    "All",
    ...Array.from(new Set(cases.map((c) => c.category))),
  ];

  const filteredCases =
    activeFilter === "All"
      ? cases.filter((c) => !c.title.toLowerCase().includes("test"))
      : cases.filter(
          (c) =>
            c.category === activeFilter &&
            !c.title.toLowerCase().includes("test")
        );

  const featuredCase = cases[0];

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <NavBar />
      <main>
        {/* ======= SECTION 1: HERO ======= */}
        <PageHero
          eyebrow="Client Impact"
          headline="Real Results. Real Organizations."
          subtext="Stories of organizations we've helped stabilize, scale, and succeed across East Africa."
          imagePlaceholder="Client Success Stories"
        />

        {/* ======= SECTION 2: FILTER BAR ======= */}
        <section
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #F2F2F2",
            position: "sticky",
            top: "72px",
            zIndex: 10,
            padding: "0 32px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              gap: "0",
              overflowX: "auto",
            }}
          >
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? cases.length
                  : cases.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    color: activeFilter === cat ? "#00338D" : "#757575",
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom:
                      activeFilter === cat
                        ? "2px solid #00338D"
                        : "2px solid transparent",
                    padding: "20px 28px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {cat}
                  <span
                    style={{
                      backgroundColor:
                        activeFilter === cat ? "#00338D" : "#F2F2F2",
                      color: activeFilter === cat ? "#FFFFFF" : "#757575",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "11px",
                      padding: "2px 7px",
                      borderRadius: "10px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ======= SECTION 3: FEATURED CASE STUDY ======= */}
        {false && !loading && !error && featuredCase && (
          <section
            style={{
              backgroundColor: "#FFFFFF",
              padding: "80px 32px",
            }}
          >
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
              }}
            >
              {/* Label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "2px",
                    backgroundColor: "#0091DA",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    color: "#0091DA",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  Featured Case Study
                </span>
              </div>

              {/* Featured card — two column */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  boxShadow: "0 4px 40px rgba(0,51,141,0.1)",
                  overflow: "hidden",
                }}
              >
                {/* Left — navy */}
                <div
                  style={{
                    backgroundColor: "#00338D",
                    padding: "56px 48px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {/* Category tag */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {featuredCase.category}
                    </span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {featuredCase.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          border: "1px solid rgba(0,145,218,0.4)",
                          color: "#0091DA",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "11px",
                          padding: "3px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "32px",
                      color: "#FFFFFF",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {featuredCase.title}
                  </h2>

                  {/* Author + date */}
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "24px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#0091DA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {featuredCase.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {featuredCase.author}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "11px",
                          color: "rgba(255,255,255,0.4)",
                          marginTop: "2px",
                        }}
                      >
                        {new Date(featuredCase.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — white */}
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "56px 48px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "28px",
                  }}
                >
                  {/* Excerpt */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "11px",
                        color: "#0091DA",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: "12px",
                      }}
                    >
                      Overview
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "16px",
                        color: "#757575",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {featuredCase.excerpt}
                    </p>
                  </div>

                  {/* Content preview */}
                  {featuredCase.content && (
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "11px",
                          color: "#0091DA",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          marginBottom: "12px",
                        }}
                      >
                        The Story
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "15px",
                          color: "#757575",
                          lineHeight: 1.75,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {featuredCase.content}
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div style={{ marginTop: "auto" }}>
                    <Link
                      href={`/case-studies/${featuredCase.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        backgroundColor: "#00338D",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        padding: "14px 28px",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======= SECTION 4: CASES GRID ======= */}
        <section
          style={{
            backgroundColor: "#F2F2F2",
            padding: "80px 32px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "48px",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    color: "#0091DA",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    marginBottom: "8px",
                  }}
                >
                  {activeFilter === "All"
                    ? "All Case Studies"
                    : activeFilter}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "36px",
                    color: "#00338D",
                    margin: 0,
                  }}
                >
                  {filteredCases.length}{" "}
                  {filteredCases.length === 1 ? "Story" : "Stories"} Found
                </h2>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2px",
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "320px",
                      backgroundColor: "#F2F2F2",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Error state */}
            {error && (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    color: "#757575",
                    marginBottom: "16px",
                  }}
                >
                  Unable to load case studies.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    backgroundColor: "#00338D",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "14px",
                    padding: "12px 24px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredCases.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "16px",
                    color: "#757575",
                  }}
                >
                  No case studies found for this category.
                </p>
              </div>
            )}

            {/* Cards grid */}
            {!loading &&
              !error &&
              filteredCases.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "2px",
                  }}
                >
                  {filteredCases.map((c) => (
                    <Link
                      key={c.id}
                      href={`/case-studies/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{
                          backgroundColor: "#FFFFFF",
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            "#00338D";
                          e.currentTarget
                            .querySelectorAll("[data-title]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color = "#FFFFFF")
                            );
                          e.currentTarget
                            .querySelectorAll("[data-body]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color =
                                  "rgba(255,255,255,0.65)")
                            );
                          e.currentTarget
                            .querySelectorAll("[data-meta]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color =
                                  "rgba(255,255,255,0.4)")
                            );
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            "#FFFFFF";
                          e.currentTarget
                            .querySelectorAll("[data-title]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color = "#00338D")
                            );
                          e.currentTarget
                            .querySelectorAll("[data-body]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color = "#757575")
                            );
                          e.currentTarget
                            .querySelectorAll("[data-meta]")
                            .forEach(
                              (el) =>
                                ((el as HTMLElement).style.color = "#757575")
                            );
                        }}
                      >
                        {/* Top accent bar */}
                        <div
                          style={{
                            height: "3px",
                            backgroundColor: "#0091DA",
                          }}
                        />

                        <div
                          style={{
                            padding: "32px 28px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                          }}
                        >
                          {/* Category */}
                          <span
                            data-meta
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: "11px",
                              color: "#757575",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {c.category}
                          </span>

                          {/* Tags */}
                          <div
                            style={{
                              display: "flex",
                              gap: "6px",
                              flexWrap: "wrap",
                            }}
                          >
                            {c.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  border: "1px solid rgba(0,145,218,0.3)",
                                  color: "#0091DA",
                                  fontFamily: "var(--font-dm-sans)",
                                  fontSize: "10px",
                                  padding: "2px 8px",
                                  borderRadius: "20px",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h3
                            data-title
                            style={{
                              fontFamily: "var(--font-playfair)",
                              fontSize: "20px",
                              color: "#00338D",
                              lineHeight: 1.35,
                              margin: 0,
                            }}
                          >
                            {c.title}
                          </h3>

                          {/* Excerpt */}
                          <p
                            data-body
                            style={{
                              fontFamily: "var(--font-dm-sans)",
                              fontSize: "14px",
                              color: "#757575",
                              lineHeight: 1.7,
                              margin: 0,
                              flex: 1,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {c.excerpt}
                          </p>

                          {/* Footer */}
                          <div
                            style={{
                              paddingTop: "16px",
                              borderTop: "1px solid rgba(0,51,141,0.08)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              data-meta
                              style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: "12px",
                                color: "#757575",
                              }}
                            >
                              {new Date(c.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: "12px",
                                color: "#0091DA",
                              }}
                            >
                              Read Story →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        </section>

        {/* ======= SECTION 5: CTA ======= */}
        <section
          style={{
            backgroundColor: "#00338D",
            padding: "100px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.03) 1px,
                transparent 1px),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 1px,
                transparent 1px)
            `,
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "16px",
              }}
            >
              Get Started
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "42px",
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              Work with us to write your own success story.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "16px",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.7,
                marginBottom: "40px",
              }}
            >
              Whether you're an NGO, SME, or social enterprise — we have the
              expertise to help you stabilize, scale, and succeed.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  backgroundColor: "#0091DA",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  padding: "14px 32px",
                  textDecoration: "none",
                }}
              >
                Get Started
              </Link>
              <Link
                href="/services"
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "14px",
                  padding: "14px 32px",
                  textDecoration: "none",
                }}
              >
                View Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Responsive styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
          .cases-grid {
            grid-template-columns: 
              repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .cases-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-row {
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
