import peopleImg from "../../assets/icons/people.svg";

const InfoSection = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-us">
          <h1 className="text-secondary mb-3">Quem somos nós</h1>
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
        <img
          src={peopleImg}
          alt="people"
          style={{ height: "400px", maxWidth: "100%" }}
        />
      </div>
    </>
  );
};

export { InfoSection };
