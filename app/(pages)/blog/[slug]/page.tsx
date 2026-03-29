"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import FileCopyLine from "@/app/components/icons/file-copy-line";
import StackShare from "@/app/components/icons/stackshare";
import { toast } from "react-toastify";
import "@/app/styles/blog-page-detail.scss";

const BlogDetailPage = () => {
  const articleTitle = "Crafting Digital Experiences That Matter";

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: articleTitle, url });
        toast.success("Shared successfully");
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      await handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="wrapper">
      <div className="blog-page-detail">
        <header>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: "Case Study" },
              { label: "Crafting Digital Experiences That Matter" },
            ]}
          />
          <h1>Crafting Digital Experiences That Matter</h1>
          <p>
            In an age of infinite scroll and fleeting attention, creating
            meaningful digital experiences has become both an art and a science.
          </p>
        </header>

        <div className="header-actions">
          <div className="article">
            <div className="article__time">
              <p className="article__time-value">15</p>
              <p className="article__time-unit">min</p>
            </div>
            <div className="article__category">
              <span>BASIC</span>
            </div>
          </div>
          <nav className="article-actions" aria-label="Article actions">
            <button className="btn-action" type="button" onClick={handleShare}>
              <div className="btn-action-icon">
                <StackShare />
              </div>
              <span className="btn-action-text">Chia sẻ</span>
            </button>
            <button
              className="btn-action"
              type="button"
              onClick={handleCopyLink}
            >
              <div className="btn-action-icon">
                <FileCopyLine />
              </div>
              <span className="btn-action-text">Sao chép liên kết</span>
            </button>
          </nav>
        </div>

        <aside>
          <h3>Summary of the article</h3>
          <p>
            Successful digital experience design requires a blend of deep user
            research, simplification thinking, and a commitment to putting
            people at the center of every decision. When done right, digital
            products not only solve problems but also create emotional
            connections with users.
          </p>
        </aside>

        <p>
          Digital experience design is not just about creating a visually
          appealing interface. It is a journey of understanding users,
          anticipating their needs, and turning each interaction into a
          meaningful moment.
        </p>

        <hr />

        <section>
          <h2>Understand users before designing</h2>
          <p>
            With a professional design process, I start each project by
            listening. Listening not only to what clients say but also to what
            they don&apos;t say — the hidden pain points, the unspoken
            expectations, and the subconscious behaviors when they interact with
            digital products.
          </p>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
              alt="Modern glass office buildings reflecting sky"
              loading="lazy"
            />
            <figcaption>Illustration of the user research process</figcaption>
          </figure>

          <blockquote>
            &ldquo;The best design is the one you don&apos;t realize exists. It
            feels as natural as breathing, guiding you to the right place
            without you having to think about it.&rdquo;
            <cite>— Minh Tran, UX Director</cite>
          </blockquote>

          <p>
            In today&apos;s digital world, users are no longer patient with
            disjointed experiences or complex interfaces. They expect
            seamlessness — from the moment they open the app to when they
            achieve their goals. Every second of waiting, every unnecessary
            click is an opportunity for them to leave.
          </p>
        </section>

        <section>
          <h2>Human-centered design principles</h2>
          <p>
            We believe that technology should serve people, not the other way
            around. This means sometimes rejecting &quot;cool&quot; features to
            keep the product simple and user-friendly. Less is more, but better.
          </p>

          <figure>
            <img
              src="https://images.unsplash.com/photo-1545315003-c5ad6226c272?w=800&q=80"
              alt="Lush green plants covering a building facade"
              loading="lazy"
            />
            <figcaption>Illustration of the user research process</figcaption>
          </figure>
        </section>

        {/* ── CMS Tag Showcase ── */}
        <section>
          <h2>CMS tag showcase</h2>
          <p>
            Below is a preview of every HTML tag that a CMS might output, so you
            can verify styling before going live.
          </p>

          <h3>Sub-headings (h3 – h6)</h3>
          <h4>Fourth-level heading</h4>
          <h5>Fifth-level heading</h5>
          <h6>Sixth-level heading</h6>

          <h3>Inline formatting</h3>
          <p>
            This paragraph contains <strong>strong text</strong>,{" "}
            <b>bold text</b>, <em>emphasised text</em>, <i>italic text</i>,{" "}
            <u>underlined text</u>, <del>deleted text</del>,{" "}
            <s>strikethrough text</s>, <small>small text</small>,{" "}
            <mark>highlighted text</mark>, H<sub>2</sub>O and E=mc
            <sup>2</sup>, and an <abbr title="Abbreviation">ABBR</abbr> element.
          </p>

          <h3>Links</h3>
          <p>
            Here is an <a href="#">inline link</a> and another{" "}
            <a href="https://example.com">external link to example.com</a>{" "}
            inside a paragraph.
          </p>

          <h3>Unordered list</h3>
          <ul>
            <li>First item in an unordered list</li>
            <li>
              Second item with a nested list
              <ul>
                <li>Nested item one</li>
                <li>Nested item two</li>
              </ul>
            </li>
            <li>Third item</li>
          </ul>

          <h3>Ordered list</h3>
          <ol>
            <li>Step one — research the problem</li>
            <li>
              Step two — design the solution
              <ol>
                <li>Sub-step a</li>
                <li>Sub-step b</li>
              </ol>
            </li>
            <li>Step three — validate with users</li>
          </ol>

          <h3>Inline code &amp; code blocks</h3>
          <p>
            Use <code>const x = 42;</code> for inline code snippets.
          </p>
          <pre>
            <code>{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`}</code>
          </pre>

          <h3>Horizontal rule</h3>
          <p>Content above the rule.</p>
          <hr />
          <p>Content below the rule.</p>

          <h3>Table</h3>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dark mode</td>
                <td>In progress</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Localisation</td>
                <td>Planned</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>Offline support</td>
                <td>Backlog</td>
                <td>Low</td>
              </tr>
            </tbody>
          </table>

          <h3>Embedded media</h3>
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            muted
          />
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Sample embedded video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <h3>Collapsible details</h3>
          <details>
            <summary>Click to expand additional information</summary>
            <p>
              This content is hidden by default and revealed when the user
              clicks the summary. Useful for FAQs, changelogs, or supplementary
              material.
            </p>
            <ul>
              <li>Detail point one</li>
              <li>Detail point two</li>
            </ul>
          </details>

          <h3>Blockquote (recap)</h3>
          <blockquote>
            &ldquo;Design is not just what it looks like and feels like. Design
            is how it works.&rdquo;
            <cite>— Steve Jobs</cite>
          </blockquote>
        </section>

        <footer>
          <span>Decode_date:</span>
          <time dateTime="2025-09-15">09/15/2025</time>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetailPage;
