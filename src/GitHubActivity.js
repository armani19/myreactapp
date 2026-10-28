import { useEffect, useRef, useState } from 'react';
import './GitHubActivity.css';

const profileUrl = 'https://github.com/armani19';
const activityUrl = 'https://github-contributions-api.jogruber.de/v4/armani19?y=last';

export default function GitHubActivity() {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(activityUrl, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('GitHub activity unavailable');
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data.contributions) || data.contributions.length === 0) throw new Error('No contribution data');
        setActivity(data);
      })
      .catch(fetchError => {
        if (fetchError.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (activity && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [activity]);

  const days = activity?.contributions ?? [];
  const firstDay = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const cells = [...Array(firstDay).fill(null), ...days];
  const total = activity?.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0);

  return (
    <article className="github-activity" aria-labelledby="github-activity-title" data-scroll-reveal>
      <div className="github-activity-heading">
        <div>
          <span className="github-activity-kicker">BEYOND THE CV</span>
          <h3 id="github-activity-title">A year of building, in little squares.</h3>
          <p>Public contribution activity from my GitHub profile</p>
        </div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">View GitHub <span aria-hidden="true">↗</span></a>
      </div>
      {activity ? (
        <div className="github-activity-scroll" ref={scrollRef}>
          <div className="github-activity-grid" role="img" aria-label={`${total} public GitHub contributions in the past 12 months`}>
            {cells.map((day, index) => day ? (
              <span key={day.date} className={`github-activity-day level-${Math.min(4, Math.max(0, day.level))}`} title={`${day.date}: ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`} aria-hidden="true" />
            ) : <span key={`empty-${index}`} className="github-activity-empty" aria-hidden="true" />)}
          </div>
        </div>
      ) : <p className="github-activity-message" role="status">{error ? 'Activity is temporarily unavailable. You can view it on GitHub.' : 'Loading GitHub activity…'}</p>}
      <div className="github-activity-footer">
        <span>{activity ? `${total} contributions · Past 12 months` : 'Past 12 months'}</span>
        <div className="github-activity-legend" aria-label="Contribution activity from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`level-${level}`} aria-hidden="true" />)}<span>More</span></div>
      </div>
    </article>
  );
}
