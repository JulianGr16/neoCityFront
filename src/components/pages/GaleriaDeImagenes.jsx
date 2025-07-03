import "../Styles/componentesPages.css";

const GaleriaDeImagenes = () => {
  return (
    <>
      <section className="container">
        <div className="row my-3">
          <h2 className="lead">Recepción del hotel</h2>
          <div className="col-sm-12 col-md-4 border mt-2 lob1"></div>
          <div className="col-sm-12 col-md-4 border mt-2 lob2"></div>
          <div className="col-sm-12 col-md-4 border mt-2 lob3"></div>
        </div>
      </section>
      <section className="container">
        <div className="row my-3">
          <h2 className="lead">Salon para comensales</h2>
          <div className="col-sm-12 col-md-4 border mt-2 comensal-1"></div>
          <div className="col-sm-12 col-md-4 border mt-2 comensal-2"></div>
          <div className="col-sm-12 col-md-4 border mt-2 comensal-3"></div>
        </div>
      </section>
      <section className="container">
        <div className="row my-3">
        <h2 className="lead">Sala de juegos</h2>
        <div className="col-sm-12 col-md-4 border mt-2 juegos-1"></div>
        <div className="col-sm-12 col-md-4 border mt-2 juegos-2"></div>
        <div className="col-sm-12 col-md-4 border mt-2 juegos-3"></div>
        </div>
      </section>
      <section className="container">
        <div className="row my-3">
            <h2 className="lead">Nuestro gimnasio</h2>
            <div className="col-sm-12 col-md-4 border mt-2 gim-1"></div>
            <div className="col-sm-12 col-md-4 border mt-2 gim-2"></div>
            <div className="col-sm-12 col-md-4 border mt-2 gim-3"></div>
        </div>
      </section>
    </>
  );
};

export default GaleriaDeImagenes;
