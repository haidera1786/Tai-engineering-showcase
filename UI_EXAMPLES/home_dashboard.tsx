import React from "react";

  type Metric = {
    label: string;
    value: string;
    note?: string;
  };

  type ClassSummary = {
    name: string;
    subject: string;
    students: number;
    progress: number;
  };

  type FeedbackItem = {
    student: string;
    className: string;
    status: "done" | "queued";
    timeAgo: string;
  };

  const metrics: Metric[] = [
    { label: "Active Classes", value: "6", note: "+1 this month" },
    { label: "Students", value: "152", note: "Across all classes" },
    { label: "Weekly Submissions", value: "94", note: "Avg turnaround 2m 40s" },
    { label: "AI Confidence", value: "High", note: "OCR fallback 4%" },
  ];

  const classes: ClassSummary[] = [
    { name: "Year 7 English", subject: "Literacy", students: 28, progress: 72 },
    { name: "Year 8 Science", subject: "Biology", students: 31, progress: 64 },
    { name: "Year 9 English", subject: "Persuasive Writing", students: 26, progress: 81 },
  ];

  const recentFeedback: FeedbackItem[] = [
    { student: "Maya R.", className: "Year 7 English", status: "done", timeAgo: "8m ago" },
    { student: "Kian L.", className: "Year 8 Science", status: "queued", timeAgo: "2m ago" },
    { student: "Ella J.", className: "Year 9 English", status: "done", timeAgo: "14m ago" },
  ];

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      padding: "40px 28px 60px",
      backgroundColor: "#f7f2ea",
      backgroundImage:
        "radial-gradient(1200px 400px at 10% 0%, #ffe9d6 0%, transparent 60%)," +
        "radial-gradient(1000px 400px at 90% 10%, #e5f5ff 0%, transparent 55%)",
      fontFamily: '"Space Grotesk", "IBM Plex Sans", "Segoe UI", sans-serif',
      color: "#1d1c1a",
    },
    header: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 28,
    },
    title: {
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: "-0.02em",
      margin: 0,
    },
    subtitle: {
      margin: "6px 0 0",
      fontSize: 14,
      color: "#6b635c",
    },
    cta: {
      padding: "12px 18px",
      borderRadius: 999,
      border: "1px solid #1d1c1a",
      background: "#1d1c1a",
      color: "#fff",
      fontSize: 14,
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 16,
      marginBottom: 28,
    },
    card: {
      background: "#fffaf3",
      border: "1px solid #e5d7c6",
      borderRadius: 18,
      padding: "16px 18px",
      boxShadow: "0 10px 30px rgba(29, 28, 26, 0.08)",
    },
    label: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#7a6f64",
      marginBottom: 6,
    },
    value: {
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 4,
    },
    note: {
      fontSize: 12,
      color: "#6b635c",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 700,
      margin: "20px 0 10px",
    },
    list: {
      display: "grid",
      gap: 12,
    },
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    pill: {
      fontSize: 12,
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid #d9c7b3",
      background: "#fff5e8",
    },
    barWrap: {
      height: 8,
      background: "#f0e3d3",
      borderRadius: 999,
      overflow: "hidden",
      marginTop: 8,
    },
    bar: {
      height: "100%",
      background: "#1d1c1a",
    },
  };

  export default function HomeDashboardExample() {
    return (
      <main style={styles.page}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Teacher Home</h1>
            <p style={styles.subtitle}>
              Snapshot of today’s feedback flow and class progress.
            </p>
          </div>
          <button style={styles.cta}>New Submission</button>
        </header>

        <section style={styles.grid}>
          {metrics.map((metric) => (
            <div key={metric.label} style={styles.card}>
              <div style={styles.label}>{metric.label}</div>
              <div style={styles.value}>{metric.value}</div>
              {metric.note && <div style={styles.note}>{metric.note}</div>}
            </div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Class Progress</div>
            <div style={styles.list}>
              {classes.map((cls) => (
                <div key={cls.name} style={{ ...styles.row, alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{cls.name}</div>
                    <div style={styles.note}>
                      {cls.subject} • {cls.students} students
                    </div>
                    <div style={styles.barWrap}>
                      <div style={{ ...styles.bar, width: `${cls.progress}%` }} />
                    </div>
                  </div>
                  <div style={styles.pill}>{cls.progress}%</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionTitle}>Recent Feedback</div>
            <div style={styles.list}>
              {recentFeedback.map((item) => (
                <div key={item.student} style={styles.row}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.student}</div>
                    <div style={styles.note}>{item.className}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={styles.pill}>
                      {item.status === "done" ? "Completed" : "Queued"}
                    </div>
                    <div style={styles.note}>{item.timeAgo}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...styles.note, marginTop: 12 }}>
              Async queue keeps the UI fast while AI runs in the background.
            </div>
          </div>
        </section>
      </main>
    );
  }
