import { Link } from "@tanstack/react-router";
import { Copy, CheckCircle, ArrowUpRight, Bookmark } from "lucide-react";
import { useState } from "react";

const SkillCard = ({
  authorEmail,
  category,
  createdAt,
  description,
  installCommand,
  tags,
  title,
}: SkillRecord) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  return (
    <article className="skill-card">
      <Link
        to="/skills"
        tabIndex={-1}
        aria-label={`Open ${title}`}
        className="overlay"
      />

      <div className="chrome">
        <div className="chrome-bar">
          <div className="lights">
            <div className="light red" />
            <div className="light amber" />
            <div className="light green" />
          </div>
          <div className="host">registry.sh</div>
        </div>
      </div>

      <div className="body">
        <div className="meta">
          <div className="author">
            <img src="/logo512.png" alt="Author avatar" className="avatar" />
            <div className="author-copy">
              <p>GOATNINJA10</p>
              <p>
                {createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown date"}
              </p>
            </div>
          </div>

          <p className="category">{category}</p>
        </div>

        <div className="summary">
          <Link to="/skills" className="title-link">
            <h3>{title}</h3>
          </Link>
          <p>{description}</p>
        </div>

        <div className="command">
          <div className="command-copy">
            <span>{">_"}</span>
            <p>{installCommand}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="copy"
            title={copied ? "Copied!" : "Copy command"}
            aria-label="Copy command"
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          </button>
        </div>

        <div className="footer">
          <div className="actions">
            <Link to="/skills" className="open" title={`Open ${title}`}>
              <span>Open</span>
              <ArrowUpRight size={14} />
            </Link>

            <button type="button" className="save" aria-label="Saved state" disabled>
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SkillCard;
