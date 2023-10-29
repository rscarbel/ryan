import Particles from "react-particles-js";

interface FireworksProps {
  showParticles: boolean;
}

const Fireworks: React.FC<FireworksProps> = ({ showParticles }) => {
  const fireworksConfig = {
    particles: {
      number: {
        value: 100,
      },
      size: {
        value: 3,
      },
      color: {
        value: "#ff0000",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.7,
        random: true,
      },
      move: {
        enable: true,
        speed: 5,
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
      },
    },
  };

  return (
    <div className="fireworks-container">
      {showParticles && <Particles params={fireworksConfig} />}
    </div>
  );
};

export default Fireworks;
