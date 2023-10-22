"use client";

export default function Projects() {
  const handleClick = (url) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <section
      id="projects-section"
      className="flex flex-col items-center justify-center"
    >
      <h2 className="original-h2">Projects</h2>

      <p className="original-p">
        Here are some of my old projects I&#39;ve worked on:
      </p>
      <p className="original-p">
        Disclaimer - The database these projects are using is no longer being
        paid for and Heroku has ceased their free plan, so projects with heroku
        deployments and MongoDB databases no longer have functioning
        deployments, though the code is still visible.
      </p>

      <div id="projects-container">
        <div className="project shadow" id="dijkstras-algorithm">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick(
                "https://github.com/rscarbel/dikstras-algorithm#readme"
              )
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://github.com/rscarbel/dikstras-algorithm#readme"
                target="_blank"
              >
                Dijkstra&#39;s Algorithm
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://github.com/rscarbel/dikstras-algorithm#readme"
                id="dijkstras-algorithm-p"
                target="_blank"
              >
                A pathfinding algorithm that finds the fastest path between two
                points. It&#39;s what google maps does.
              </a>
            </p>
          </div>
        </div>

        <div className="project shadow" id="elevator">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick("https://github.com/rscarbel/elevator#readme")
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://github.com/rscarbel/elevator#readme"
                target="_blank"
              >
                Elevator
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://github.com/rscarbel/elevator#readme"
                id="elevator-p"
                target="_blank"
              >
                A TypeScript project written how I code a real-world production
                application. It may seem minor, but checkout the readme for
                details.
              </a>
            </p>
          </div>
        </div>

        <div className="project shadow" id="employee-scheduling">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick(
                "https://github.com/rscarbel/employee_scheduling#readme"
              )
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://github.com/rscarbel/employee_scheduling#readme"
                target="_blank"
              >
                Employee Scheduling App
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://github.com/rscarbel/employee_scheduling#readme"
                id="employee-scheduling-p"
                target="_blank"
              >
                Fullstack app with authentication using Bcrypt and using Mongo
                for my databse.
              </a>
            </p>
          </div>
        </div>

        <div className="project shadow" id="space-invaders">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick(
                "https://ryanscarbel.com/src/space-invaders/game.html"
              )
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://ryanscarbel.com/src/space-invaders/game.html"
                target="_blank"
              >
                Space Invaders
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://ryanscarbel.com/src/space-invaders/game.html"
                id="space-invaders-p"
                target="_blank"
              >
                A small interactive game I made over a weekend. Only for desktop
                currently.
              </a>
            </p>
          </div>
        </div>

        <div className="project shadow" id="messaging-app">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick(
                "https://github.com/rscarbel/message_board_frontend#readme"
              )
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://github.com/rscarbel/message_board_frontend#readme"
                target="_blank"
              >
                Messaging App
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://github.com/rscarbel/message_board_frontend#readme"
                id="messaging-app-p"
                target="_blank"
              >
                Send what you want on this app, just remember - the internet is
                forever.
              </a>
            </p>
          </div>
        </div>

        <div className="project shadow" id="calorie-counter">
          <div
            className="project-overlay"
            onClick={() =>
              handleClick("https://github.com/rscarbel/caloriecounter#readme")
            }
          >
            <h3 className="original-h3 project-name">
              <a
                href="https://github.com/rscarbel/caloriecounter#readme"
                target="_blank"
              >
                Calorie Counter
              </a>
            </h3>

            <p className="original-p project-description">
              <a
                href="https://github.com/rscarbel/caloriecounter#readme"
                id="calorie-counter-p"
                target="_blank"
              >
                Working on this project as a team made those guys go from
                coworkers to friends. I miss the good times we had building
                this.
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
