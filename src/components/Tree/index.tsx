import BaseTrunk from "../../assets/icons/baseArvore.png";
import TopTrunk from "../../assets/icons/firstTronco.png";
import MiddleTrunk from "../../assets/icons/secondTronco.png";

export const Tree = ({ data }) => {
  const eventsByYear = data.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {});

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);

  let isLeft = true;

  return (
    <div className="timeline-tree">
      <div className="tree-base">
        <img src={BaseTrunk as string} alt="base" />
      </div>

      {sortedYears.map((year, index, arr) => (
        <div key={index} className="year-group">
          <div className="tree-trunk">
            {index === arr.length - 1 ? (
              <img src={TopTrunk as string} alt="topo do tronco" />
            ) : (
              <img src={MiddleTrunk as string} alt="tronco do meio" />
            )}
            <div className="year">{year}</div>
          </div>

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
