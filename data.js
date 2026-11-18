// All site content lives here. Edit this file to change text, links or projects.
// Leave a link as "" to hide its button.

window.SITE = {
  name: "Dapo Omoworare",
  short: "DAPO",
  role: "Security engineer and builder",
  location: "Vancouver, Canada",
  intro:
    "I test networks, recover evidence and build the tools I wish I had. Lately that means vulnerability automation, ML-based threat detection and an open-source job search app.",
  links: {
    github: "https://github.com/Dapper-D",
    linkedin: "", // add your LinkedIn URL, e.g. "https://www.linkedin.com/in/your-handle"
    email: "oladapoomoworare@gmail.com",
    resume: "" // e.g. "/resume.pdf" after you drop the file in the project root
  },

  // class: "security" or "build" (sets the tag colour)
  // art: accent colour for the generated skyline behind each panel
  // screen: "image" uses `image`; any other value draws a built-in mock screen
  // sequence.frames: the viewfinder frames shown after the intro. Each frame
  //   takes `image` (+ `alt`) for a real screenshot, or `screen` for a mock.
  projects: [
    {
      id: "vuln",
      name: "Vuln Scanner",
      class: "security",
      tag: "Security, team capstone",
      headline: "Six tools. One menu.",
      body:
        "A Kali Linux toolkit that runs a full assessment from one console: Nmap discovery, OpenVAS scan automation, service-aware exploit runs, ARP-spoof port mirroring, a Scapy SYN-scan detector, Markdown reports and a Gemini summary of what to fix first. Built with my capstone group (CAP D2, Project 9).",
      stack: ["Bash", "Python", "Nmap", "OpenVAS", "Metasploit", "Scapy", "Gemini"],
      repo: "https://github.com/advitiyasharda/Automatic-Vulnerability-Tool",
      live: "",
      art: "#2fd4c4",
      screen: "image",
      image: "assets/vuln-banner.jpg",
      alt: "Vulnerability Tool Scanner banner: scan, exploit, detect, report, AI analyze",
      sequence: {
        frames: [
          { label: "Menu", title: "One console for the whole assessment", text: "Thirteen numbered options cover port mirroring, OpenVAS, discovery, exploits, reports, AI analysis and the attack detector. Target and local IP stay set between runs.", image: "assets/vuln-menu.jpg", alt: "The toolkit's numbered menu in a Kali terminal" },
          { label: "Discover", title: "Find the hosts first", text: "A parallel Nmap ping sweep, then service and OS scans. Live hosts are written to hosts.txt for every later step.", image: "assets/vuln-discovery.jpg", alt: "Nmap host discovery and service scan output" },
          { label: "Scan", title: "Hand the deep scan to OpenVAS", text: "The script creates the target and the task, starts the scan, polls its progress and exports the XML report.", image: "assets/vuln-openvas.jpg", alt: "OpenVAS report page for the lab subnet" },
          { label: "Detect", title: "Catch someone scanning you", text: "A Scapy listener flags anyone who hits more than 15 ports in 10 seconds and guesses their OS from TTL and window size.", image: "assets/vuln-detector.jpg", alt: "Active attack detector flagging two port scans" },
          { label: "Report", title: "Turn results into a plan", text: "Exploit results become auto_report.md, and Gemini summarizes the posture and what to fix first.", screen: "report" }
        ]
      }
    },
    {
      id: "threat",
      name: "Threat Radar",
      class: "security",
      tag: "Security, team project",
      headline: "Logs in. Alerts out.",
      body:
        "Network logs stream into a FastAPI service, an Isolation Forest trained on CIC-IDS-2017 scores each one, and anomalies land on a Next.js dashboard over WebSockets within a second. An attack simulator on a second PC replays DDoS, port scans and web attacks to prove it works. I'm the top committer on the team repo.",
      stack: ["Python", "FastAPI", "scikit-learn", "WebSockets", "Next.js", "Clerk", "Docker"],
      repo: "https://github.com/sinyihuangca-ux/F26_4495_S1_SinYiH",
      live: "",
      art: "#e2403f",
      screen: "alerts",
      sequence: {
        frames: [
          { label: "Simulate", title: "Attack from a second PC", text: "An attack simulator on another machine streams DDoS, port scan or web attack traffic at the API.", screen: "term" },
          { label: "Score", title: "Every record gets an anomaly score", text: "The Isolation Forest, trained on CIC-IDS-2017, scores each log as it arrives. It needs no labels at run time.", screen: "scores" },
          { label: "Alert", title: "Anomalies land on the dashboard live", text: "Alerts go out over WebSockets to a Next.js dashboard behind Clerk sign-in, with live counters.", screen: "alerts" }
        ]
      }
    },
    {
      id: "forensics",
      name: "Android Forensics",
      class: "security",
      tag: "Security, course project",
      headline: "What does a deleted message leave behind?",
      body:
        "I pulled Discord and Session data off a rooted Android 11 emulator with adb, hashed every archive with SHA-256 and compared hand analysis against ALEAPP and Andriller. Discord keeps no chat database on the device. Session encrypts its messages, but it left the encryption secrets in shared preferences. Andriller found nothing in either.",
      stack: ["adb", "ALEAPP", "Andriller", "DB Browser for SQLite", "SHA-256"],
      repo: "https://github.com/Dapper-D/F26_4440_S3_G3",
      live: "",
      art: "#a78bfa",
      screen: "image",
      image: "assets/forensics-aleapp.jpg",
      alt: "ALEAPP report showing cached Discord messages recovered from the device",
      sequence: {
        frames: [
          { label: "Acquire", title: "Pull each app's private data", text: "With the emulator rooted, tar /data/data for each app and pull the archive off with adb.", image: "assets/for-acquire.jpg", alt: "adb commands archiving and pulling Session and Discord data" },
          { label: "Preserve", title: "Hash it before touching it", text: "Every archive gets a SHA-256 hash, and all analysis runs on copies.", image: "assets/for-hash.jpg", alt: "SHA-256 hashes of the acquired archives" },
          { label: "Analyze", title: "Session's database won't open", text: "session.db is encrypted with SQLCipher, so DB Browser can't read it. The keys turned up in shared preferences instead.", image: "assets/for-sessiondb.jpg", alt: "DB Browser for SQLite reporting that session.db is not a database" },
          { label: "Compare", title: "Then let the tools try", text: "ALEAPP pulled Discord's cached messages and account details. Andriller found nothing in either app.", image: "assets/forensics-aleapp.jpg", alt: "ALEAPP report of cached Discord messages" }
        ]
      }
    },
    {
      id: "b3spoken",
      name: "B3spoken",
      class: "build",
      tag: "Open source, in progress",
      headline: "New jobs every morning, resumes already written.",
      body:
        "A free desktop app for job seekers. A daily scan on GitHub Actions collects verified Canadian postings, then the app on your own computer scores each one and writes a tailored resume and cover letter with the AI you already pay for. Your resume never leaves your machine. Windows, Mac and Linux, with signed self-updates.",
      stack: ["Node.js", "GitHub Actions", "Codex", "Claude Code", "Chrome built-in AI"],
      repo: "https://github.com/Dapper-D/job-board",
      live: "https://github.com/Dapper-D/job-board/releases/latest",
      liveLabel: "Download",
      art: "#1ea4ff",
      screen: "jobs",
      // `card` is optional: a closing card after the viewfinder frames.
      sequence: {
        frames: [
          { label: "Install", title: "One installer, no terminal", text: "Windows, Mac or Linux. Setup adds a shortcut and opens B3spoken at a localhost address on your own computer.", screen: "install" },
          { label: "Connect", title: "Bring the AI you already pay for", text: "ChatGPT through Codex, Claude through Claude Code, or Chrome's built-in AI. With none of those, it falls back to rule-based tailoring.", screen: "ai" },
          { label: "Resume", title: "Every bullet gets an ID", text: "Your resume becomes a library of jobs, projects and bullets. Lines the AI isn't sure about are flagged and stay unused until you check them.", screen: "resume" },
          { label: "Scan", title: "New Canadian postings every morning", text: "GitHub Actions collects verified jobs once for everyone. Your computer sends keywords up and gets matches back. The resume stays home.", screen: "scan" },
          { label: "Board", title: "Scored, tailored, ready to apply", text: "Each match has a score, the reasons behind it, a tailored resume and cover letter as PDFs, and a link to the employer's own posting.", screen: "jobs" }
        ],
        card: {
          title: "Shared work runs once. Personal work stays on your machine.",
          left: { name: "Shared servers", items: ["Daily scan on GitHub Actions", "Verifies postings and builds the job pool", "Match service keeps no IP addresses"] },
          right: { name: "Your computer", items: ["Holds the resume", "Scores, tailors and saves the PDFs", "Installs only signed updates"] }
        }
      }
    },
    {
      id: "under50",
      name: "Under50",
      class: "build",
      tag: "Web app, live",
      headline: "Dinner for under fifty.",
      body:
        "Find restaurants near you that average less than $50 a person. Google Places supplies the spots, Prisma and Postgres keep the data, and the map does the rest.",
      stack: ["Next.js 14", "TypeScript", "Chakra UI", "Google Maps API", "Prisma", "PostgreSQL"],
      repo: "https://github.com/Dapper-D/Under50",
      live: "https://under50.vercel.app/",
      art: "#f5b83d",
      screen: "map",
      sequence: {
        frames: [
          { label: "Locate", title: "Start from where you are", text: "Use your location or type an address. Geocoding turns it into coordinates.", screen: "locate" },
          { label: "Filter", title: "Keep only the places under $50", text: "Google Places results are filtered by average price per person.", screen: "pricelist" },
          { label: "Map", title: "See them on the map", text: "Pins show the price at a glance. Prisma and Postgres keep the data.", screen: "map" }
        ]
      }
    },
    {
      id: "t2i",
      name: "Prompt to Pixels",
      class: "build",
      tag: "AI app",
      headline: "Type a sentence. Download a picture.",
      body:
        "A text-to-image generator on fal.ai. Write a prompt, watch it render and save the result, with loading and error states that tell you what happened.",
      stack: ["Next.js 14", "TypeScript", "Tailwind", "fal.ai"],
      repo: "https://github.com/Dapper-D/Text-to-image-generator",
      live: "",
      art: "#ff5fa2",
      screen: "prompt",
      sequence: {
        frames: [
          { label: "Prompt", title: "Describe it in plain words", text: "No settings to learn. Type what you want to see.", screen: "pin" },
          { label: "Render", title: "fal.ai draws it", text: "The app shows a loading state while it works and a clear message if the API credits run out.", screen: "gen" },
          { label: "Save", title: "Keep the result", text: "One click downloads the image.", screen: "prompt" }
        ]
      }
    },
    {
      id: "1inch",
      name: "1inch Clone",
      class: "build",
      tag: "Front end, live",
      headline: "A DeFi landing page, rebuilt by hand.",
      body:
        "A pixel-close rebuild of the 1inch site in React and Material UI, counters and all. Practice in matching someone else's design system exactly.",
      stack: ["React", "Vite", "Material UI", "React Router"],
      repo: "https://github.com/Dapper-D/1inch-clone",
      live: "https://1inch-clone.vercel.app/",
      art: "#5b8cff",
      screen: "swap",
      sequence: {
        frames: [
          { label: "Layout", title: "Match the landing page section by section", text: "Hero, product cards, news blocks and footer, rebuilt with Material UI and React Router.", screen: "dexhero" },
          { label: "Swap", title: "Rebuild the swap card", text: "Rounded fields, token amounts and the main action, matched to the original's spacing.", screen: "swap" },
          { label: "Counters", title: "Count the stats up as they appear", text: "react-countup animates the numbers when they scroll into view.", screen: "stats" }
        ]
      }
    }
  ],

  skills: [
    { name: "Offense", art: "#e2403f", items: ["Nmap", "OpenVAS / Greenbone", "Metasploit", "Hydra", "ARP spoofing", "Kali Linux"] },
    { name: "Detection", art: "#2fd4c4", items: ["Isolation Forest", "Scapy", "Log pipelines", "CIC-IDS-2017", "Alerting"] },
    { name: "Forensics", art: "#a78bfa", items: ["Android acquisition", "ALEAPP", "SQLite", "Evidence hashing", "Chain of custody"] },
    { name: "Build", art: "#1ea4ff", items: ["React / Next.js", "TypeScript", "Node.js", "FastAPI", "Prisma", "Vercel"] }
  ],

  // Shown newest first. Edit freely.
  log: [
    { date: "Nov 2026", title: "B3spoken desktop releases go out to testers", tag: "Build" },
    { date: "Nov 2026", title: "Android forensics report on Discord and Session", tag: "Security" },
    { date: "Sep 2026", title: "Threat Radar streams live alerts across two PCs", tag: "Security" },
    { date: "Aug 2026", title: "Capstone toolkit ships with OpenVAS and Gemini reporting", tag: "Security" },
    { date: "2026", title: "Building AI writing tools for TrooRa Magazine", tag: "Build" },
    { date: "2022 – 2023", title: "IT support and compliance at PKF Professional Services, Nigeria", tag: "Work" }
  ],

  archive: [
    { name: "Jumbot", note: "Chrome extension that searches Jumia for highlighted text", url: "https://github.com/Dapper-D/jumbot" },
    { name: "Netflix landing page", note: "2019 layout rebuilt in HTML and CSS", url: "https://dapper-d.github.io/-2019-netflix-landing-page/" },
    { name: "Valentine", note: "A small yes-or-no page with a dancing cat", url: "https://github.com/Dapper-D/valentine" },
    { name: "Doughlas Meet", note: "Events app in Next.js and Chakra UI, built with a collaborator", url: "https://github.com/achonyerichard/doughlas-meet-app" }
  ]
};
