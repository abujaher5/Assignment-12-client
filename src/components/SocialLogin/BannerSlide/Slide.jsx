const Slide = ({ img }) => {
  return (
    <div
      className="hero w-full  h-[600px]  flex flex-col bg-cover bg-center bg-no-repeat  "
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="hero-content text-center text-black ">
        <div className="lg:max-w-md max-w-sm mt-10 lg:mt-32">
          <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
            Welcome To Our Diagnostic Center
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
