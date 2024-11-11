export const Tree = ({ data }) => {
  const eventsByYear = data.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {});

  let isLeft = true;

  return (
    <div className="timeline-tree">
      {Object.keys(eventsByYear).map((year, index) => (
        <div key={index} className="year-group">
          <div className="year">{year}</div>
          {eventsByYear[year].map((event, idx) => {
            const positionClass = isLeft ? "left" : "right";
            isLeft = !isLeft;

            return (
              <div key={idx} className={`timeline-item ${positionClass}`}>
                <div className="content">
                  <div className="text">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
