import Particles from "react-particles-js";

interface ConfettiProps {
  showParticles: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ showParticles }) => {
  const confettiConfig = {
    particles: {
      number: {
        value: 100,
      },
      size: {
        value: 5,
      },
      color: {
        value: "#00ff00",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      move: {
        enable: true,
        speed: 3,
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
    <div className="confetti-container">
      {showParticles && <Particles params={confettiConfig} />}
    </div>
  );
};

export default Confetti;
