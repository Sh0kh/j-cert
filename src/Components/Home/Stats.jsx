import { useState, useEffect } from "react";

export default function Stats() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    supportHours: 0,
    workers: 0,
  });

  useEffect(() => {
    const targets = {
      clients: 250,
      projects: 8,
      supportHours: 24 / 7,
      workers: 5,
    };

    const duration = 2000; // 2 soniya ichida to‘liq hisob
    const steps = 50; // 50 qadamda o‘sish
    const interval = duration / steps;

    let step = 0;
    const counter = setInterval(() => {
      step++;
      setCounts({
        clients: Math.min(targets.clients, Math.floor((targets.clients / steps) * step)),
        projects: Math.min(targets.projects, Math.floor((targets.projects / steps) * step)),
        supportHours: Math.min(targets.supportHours, Math.floor((targets.supportHours / steps) * step)),
        workers: Math.min(targets.workers, Math.floor((targets.workers / steps) * step)),
      });

      if (step >= steps) clearInterval(counter);
    }, interval);

    return () => clearInterval(counter);
  }, []);

  return (
    <section id="stats" className="stats section accent-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>{counts.clients}</span>
              <p>Klientlar</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>{counts.projects}</span>
              <p>Proektlar</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>{counts.supportHours}</span>
              <p>Hours Of Support</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span>{counts.workers}</span>
              <p>Ishchilar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
