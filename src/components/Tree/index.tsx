import "./Tree.scss";

const Tree = ({ data }) => {
  return (
    <div className="tree">
      {Object.keys(data).map((year, index) => (
        <div
          key={year}
          className={`tree-branch ${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="tree-year">{year}</div>
          <div className="tree-elements">
            {data[year].map((element, i) => (
              <div key={i} className="tree-element">
                <img src={element.image} alt={`Imagem ${year}-${i}`} />
                <p>{element.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tree;
