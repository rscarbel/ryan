export default async function Skills() {
  return (
    <section id="skills-section" className="w-full">
      <h2>Skills</h2>

      <p className="original-p">Here are some of my proficiencies</p>

      <div id="skills-container">
        <table className="original-table">
          <tbody className="original-tbody">
            <tr className="original-tr">
              <td
                className="original-td skill-icon top-row shadow px-8"
                id="languages-icon"
              ></td>
              <td
                className="original-td skill-icon top-row shadow px-8"
                id="technologies-icon"
              ></td>
              <td
                className="original-td skill-icon top-row shadow px-8"
                id="strengths-icon"
              ></td>
            </tr>
            <tr className="original-tr">
              <th className="skill-heading shadow px-8">Languages</th>
              <th className="skill-heading shadow px-8">Technologies</th>
              <th className="skill-heading shadow px-8">Strengths</th>
            </tr>
            <tr className="original-tr">
              <td className="skill-item shadow px-8">
                Javascript &amp; TypeScript
              </td>
              <td className="skill-item shadow px-8">React</td>
              <td className="skill-item shadow px-8">Analytical reasoning</td>
            </tr>
            <tr className="original-tr">
              <td className="skill-item shadow px-8">Python</td>
              <td className="skill-item shadow px-8">
                Test-driven-development
              </td>
              <td className="skill-item shadow px-8">Learning on the fly</td>
            </tr>
            <tr className="original-tr">
              <td className="skill-item shadow px-8">Ruby</td>
              <td className="skill-item shadow px-8">Mocha/Chai &amp; Jest</td>
              <td className="skill-item shadow px-8">Personability</td>
            </tr>
            <tr className="original-tr">
              <td className="skill-item shadow px-8">SQL</td>
              <td className="skill-item shadow px-8">Django</td>
              <td className="skill-item shadow px-8">Clear communication</td>
            </tr>
            <tr className="original-tr">
              <td className="skill-item bottom-row shadow px-8">Klingon</td>
              <td className="skill-item bottom-row shadow px-8">Node</td>
              <td className="skill-item bottom-row shadow px-8">Writing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
