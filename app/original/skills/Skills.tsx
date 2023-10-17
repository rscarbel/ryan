export default async function Skills() {
  return (
    <section
      id="skills-section"
      className="flex flex-col items-center justify-center"
    >
      <h2>Skills</h2>

      <p>Here are some of my proficiencies</p>

      <div id="skills-container">
        <table>
          <tbody>
            <tr>
              <td
                className="skill-icon top-row shadow"
                id="languages-icon"
              ></td>
              <td
                className="skill-icon top-row shadow"
                id="technologies-icon"
              ></td>
              <td
                className="skill-icon top-row shadow"
                id="strengths-icon"
              ></td>
            </tr>
            <tr>
              <th className="skill-heading shadow">Languages</th>
              <th className="skill-heading shadow">Technologies</th>
              <th className="skill-heading shadow">Strengths</th>
            </tr>
            <tr>
              <td className="skill-item shadow">Javascript &amp; TypeScript</td>
              <td className="skill-item shadow">React</td>
              <td className="skill-item shadow">Analytical reasoning</td>
            </tr>
            <tr>
              <td className="skill-item shadow">Python</td>
              <td className="skill-item shadow">Test-driven-development</td>
              <td className="skill-item shadow">Learning on the fly</td>
            </tr>
            <tr>
              <td className="skill-item shadow">Ruby</td>
              <td className="skill-item shadow">Mocha/Chai &amp; Jest</td>
              <td className="skill-item shadow">Personability</td>
            </tr>
            <tr>
              <td className="skill-item shadow">SQL</td>
              <td className="skill-item shadow">Django</td>
              <td className="skill-item shadow">Clear communication</td>
            </tr>
            <tr>
              <td className="skill-item bottom-row shadow">Klingon</td>
              <td className="skill-item bottom-row shadow">Node</td>
              <td className="skill-item bottom-row shadow">Writing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
