import axios from "axios";
import { useState, useEffect } from "react";

export default function Stats() {
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    support: 0,
    workers: 0,
  });

  const [targets, setTargets] = useState(null);

  const getStat = async () => {
    try {
      const response = await axios.get(`/sdg/uz/info/get`, {

      });

      // если API возвращает массив, например [{ clientCount, projectCount, ... }]
      const info = response?.data?.object?.[0];

      setTargets({
        clients: info?.clientCount || 0,
        projects: info?.projectCount || 0,
        support: info?.support || 0,
        workers: info?.worker || 0,
      });
    } catch (error) {
      console.log("Statistika olishda xato:", error);
    }
  };

  useEffect(() => {
    getStat();
  }, []);

  useEffect(() => {
    if (!targets) return;

    const duration = 2000; // 2 soniya
    const steps = 50;
    const interval = duration / steps;

    let step = 0;
    const counter = setInterval(() => {
      step++;
      setCounts({
        clients: Math.min(
          targets.clients,
          Math.floor((targets.clients / steps) * step)
        ),
        projects: Math.min(
          targets.projects,
          Math.floor((targets.projects / steps) * step)
        ),
        support: Math.min(
          targets.support,
          Math.floor((targets.support / steps) * step)
        ),
        workers: Math.min(
          targets.workers,
          Math.floor((targets.workers / steps) * step)
        ),
      });

      if (step >= steps) clearInterval(counter);
    }, interval);

    return () => clearInterval(counter);
  }, [targets]);

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
              <span>{counts.support}</span>
              <p>Support</p>
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
