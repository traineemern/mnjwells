import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../data/site.js";
import { Icon } from "./Icons.jsx";
import { useReducedMotion } from "../motion/useReducedMotion";

/* [NEW] Interactive dummy assistant chatbot with 3 starter quick-reply questions and animated popovers */
const DUMMY_QUESTIONS = [
  {
    id: "estimate",
    question: "How do I request a free well estimate?",
    answer:
      "You can send your project details on our Contact page or call our Newaygo office at (616) 675-4875. Mark, Julie, and the crew will review your property location and well needs.",
    action: { label: "Request an estimate", to: "/contact" },
  },
  {
    id: "areas",
    question: "What areas in West Michigan do you serve?",
    answer:
      "We're based in Newaygo and serve Kent, Ottawa, Newaygo, Muskegon, Montcalm, and Mecosta counties—including Cedar Springs, Rockford, Fremont, Grant, Greenville, Hesperia, Byron, and Big Rapids.",
    action: { label: "Call (616) 675-4875", href: site.phoneLink },
  },
  {
    id: "emergency",
    question: "Do you offer 24/7 emergency pump repair?",
    answer:
      "Yes! 24/7 emergency service is available on weekends and holidays if your pump stops or you lose water pressure. Ask us about the 5-year warranty on pumps and pressure tanks too.",
    action: { label: "Explore services", to: "/services" },
  },
];

function ManagerAvatar({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {/* White M&J work shirt collar */}
      <path
        d="M8 36C8 29.8 13.4 25.8 20 25.8C26.6 25.8 32 29.8 32 36"
        fill="#FFFFFF"
        fillOpacity="0.96"
      />
      <path
        d="M15.4 26.5L20 31.3L24.6 26.5"
        stroke="#A11A12"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Friendly human manager face */}
      <circle cx="20" cy="18.2" r="6.8" fill="#FCE5D2" />
      <circle cx="17.6" cy="18" r="1.05" fill="#2A221E" />
      <circle cx="22.4" cy="18" r="1.05" fill="#2A221E" />
      <path
        d="M17.3 21.1C18.2 22.1 21.8 22.1 22.7 21.1"
        stroke="#7B3E2B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Support headset mic */}
      <path
        d="M12.7 17.4C12.7 19.9 14.1 21.6 16.5 22.1"
        stroke="#2B2623"
        strokeWidth="1.45"
        strokeLinecap="round"
      />
      <circle cx="12.6" cy="17.1" r="1.45" fill="#2B2623" />
      {/* Gold safety hard hat with crimson M&J badge */}
      <path
        d="M11.6 15.2C11.8 10.1 15.3 7.1 20 7.1C24.7 7.1 28.2 10.1 28.4 15.2H11.6Z"
        fill="#F0C177"
      />
      <rect x="9.7" y="14.3" width="20.6" height="2.5" rx="1.25" fill="#E29B32" />
      <rect x="18.6" y="7.1" width="2.8" height="4.8" rx="1" fill="#E29B32" />
      <circle cx="20" cy="11.3" r="1.5" fill="#A11A12" />
    </svg>
  );
}

const INITIAL_MESSAGE = {
  id: "welcome",
  sender: "bot",
  text: "Hi there! Welcome to M&J Water Wells. Tap one of the quick questions below or type a message to try our assistant.",
};

function matchDummyReply(text) {
  const lower = text.toLowerCase();
  if (/estimat|quote|cost|price|book|schedule|contact/.test(lower)) {
    return DUMMY_QUESTIONS[0];
  }
  if (/area|where|city|town|county|michigan|newaygo|fremont|rockford|kent/.test(lower)) {
    return DUMMY_QUESTIONS[1];
  }
  if (/emergenc|pump|repair|broken|no water|pressure|tank|weekend|warranty/.test(lower)) {
    return DUMMY_QUESTIONS[2];
  }
  return {
    answer:
      "Thanks for reaching out! This demo assistant answers our top 3 questions right here—or you can call (616) 675-4875 or use our Contact form for your specific well project.",
    action: { label: "Go to Contact page", to: "/contact" },
  };
}

export default function ChatWidget() {
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [askedIds, setAskedIds] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollBodyRef = useRef(null);
  const replyTimeoutRef = useRef(null);

  /* Pop greeting teaser bubble briefly after load */
  useEffect(() => {
    if (teaserDismissed || isOpen) return undefined;
    const delay = reducedMotion ? 200 : 1600;
    const timer = window.setTimeout(() => setShowTeaser(true), delay);
    return () => window.clearTimeout(timer);
  }, [teaserDismissed, isOpen, reducedMotion]);

  /* Scroll message pane to newest bubble */
  useEffect(() => {
    const el = scrollBodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion ? "auto" : "smooth" });
  }, [messages, isTyping, isOpen, reducedMotion]);

  /* Escape closes open chat window */
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowTeaser(false);
    setTeaserDismissed(true);
  };

  const pushBotReply = (replyObj) => {
    if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
    setIsTyping(true);
    const delay = reducedMotion ? 60 : 480;
    replyTimeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sender: "bot",
          text: replyObj.answer,
          action: replyObj.action,
        },
      ]);
    }, delay);
  };

  const handleSelectQuestion = (item) => {
    if (isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: item.question },
    ]);
    setAskedIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    pushBotReply(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;
    setInputValue("");
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: "user", text: trimmed },
    ]);
    pushBotReply(matchDummyReply(trimmed));
  };

  const handleReset = () => {
    if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
    setIsTyping(false);
    setMessages([INITIAL_MESSAGE]);
    setAskedIds([]);
    setInputValue("");
  };

  const popTransition = reducedMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 390, damping: 28, mass: 0.85 };

  return (
    <div className="chatbot-root" aria-live="polite">
      {/* Greeting teaser pop */}
      <AnimatePresence>
        {showTeaser && !isOpen ? (
          <motion.div
            className="chatbot-teaser"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.94 }}
            transition={popTransition}
          >
            <button
              type="button"
              className="chatbot-teaser-btn"
              onClick={toggleOpen}
            >
              <span className="chatbot-teaser-dot" aria-hidden="true" />
              <span>Questions about your well? Ask M&amp;J!</span>
            </button>
            <button
              type="button"
              className="chatbot-teaser-close"
              aria-label="Dismiss chat greeting"
              onClick={() => {
                setShowTeaser(false);
                setTeaserDismissed(true);
              }}
            >
              <Icon name="close" size={14} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main chat popup card */}
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            id="mj-chatbot-panel"
            className="chatbot-panel"
            role="dialog"
            aria-label="M&J Manager Quick Assistant"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.92 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.94 }
            }
            transition={popTransition}
            style={{ transformOrigin: "bottom right" }}
          >
            <header className="chatbot-header">
              <div className="chatbot-header-id">
                <span className="chatbot-avatar" aria-hidden="true">
                  <ManagerAvatar size={30} />
                </span>
                <div>
                  <strong>M&amp;J Manager Bot</strong>
                  <small>
                    <span className="chatbot-status-dot" aria-hidden="true" /> Online · Quick Assistant
                  </small>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={handleReset}
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <Icon name="reset" size={16} />
                </button>
                <button
                  type="button"
                  className="chatbot-icon-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  title="Close"
                >
                  <Icon name="close" size={17} />
                </button>
              </div>
            </header>

            <div ref={scrollBodyRef} className="chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`chatbot-msg is-${msg.sender}`}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22 }}
                >
                  <div className="chatbot-bubble">
                    <p>{msg.text}</p>
                    {msg.action ? (
                      msg.action.to ? (
                        <Link
                          className="chatbot-inline-cta"
                          to={msg.action.to}
                          onClick={() => setIsOpen(false)}
                        >
                          {msg.action.label} <Icon name="arrowRight" size={14} />
                        </Link>
                      ) : (
                        <a className="chatbot-inline-cta" href={msg.action.href}>
                          {msg.action.label} <Icon name="phone" size={14} />
                        </a>
                      )
                    ) : null}
                  </div>
                </motion.div>
              ))}

              {isTyping ? (
                <div className="chatbot-msg is-bot" aria-label="Assistant is typing">
                  <div className="chatbot-bubble chatbot-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ) : null}

              <div className="chatbot-quick-wrap" aria-label="Suggested questions">
                <span className="chatbot-quick-label">Quick questions</span>
                <div className="chatbot-quick-list">
                  {DUMMY_QUESTIONS.map((item) => {
                    const alreadyAsked = askedIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`chatbot-quick-chip${alreadyAsked ? " is-asked" : ""}`}
                        onClick={() => handleSelectQuestion(item)}
                        disabled={isTyping}
                      >
                        {item.question}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <form className="chatbot-input-bar" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Ask a question..."
                aria-label="Ask a question"
              />
              <button
                type="submit"
                className="chatbot-send-btn"
                aria-label="Send message"
                disabled={!inputValue.trim() || isTyping}
              >
                <Icon name="send" size={16} />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {/* Floating circular trigger button with M&J Manager avatar */}
      <motion.button
        type="button"
        className={`chatbot-launcher${isOpen ? " is-open" : ""}`}
        aria-expanded={isOpen}
        aria-controls="mj-chatbot-panel"
        aria-label={isOpen ? "Close M&J chat assistant" : "Open M&J chat assistant"}
        onClick={toggleOpen}
        whileHover={reducedMotion ? undefined : { scale: 1.07, y: -2 }}
        whileTap={reducedMotion ? undefined : { scale: 0.94 }}
        transition={popTransition}
      >
        <span className="chatbot-launcher-ring" aria-hidden="true" />
        {isOpen ? <Icon name="close" size={24} /> : <ManagerAvatar size={36} />}
      </motion.button>
    </div>
  );
}
