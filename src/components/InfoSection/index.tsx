import peopleImg from "../../assets/icons/people.svg";

const InfoSection = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-us">
          <h2>Quem somos nós</h2>
          <p className="text-xl text-left">
            O <a className="text-secondary">Instituto João de Barro (IJB)</a> é
            um instituto que atua na cidade de Franca, SP o objetivo de ajudar
            famílias em situação de vulnerabilidade, necessidade, entre outros;
            oferecendo doações de recursos financeiros, criando moradias,
            promovendo eventos para o bem estar social da cidade de Franca.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <img src={peopleImg} alt="people" style={{ height: "400px" }} />
      </div>
    </>
  );
};

export { InfoSection };
