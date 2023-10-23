import { languagesSVG, strengthsSVG, technologiesSVG } from "./icons";

const Skills = () => {
  return (
    <section id="skills-section" className="w-full">
      <h2>Skills</h2>

      <p className="original-p">Here are some of my proficiencies</p>

      <div id="skills-container">
        <table className="original-table">
          <tbody className="original-tbody">
            <tr className="h-14 original-tr">
              <td
                className="h-14 original-td skill-icon top-row px-8"
                id="languages-icon"
              >
                <div
                  className="ml-28"
                  dangerouslySetInnerHTML={{ __html: languagesSVG }}
                />
              </td>
              <td
                className="h-14 original-td skill-icon top-row px-8"
                id="technologies-icon"
              >
                <div
                  className="ml-28"
                  dangerouslySetInnerHTML={{ __html: technologiesSVG }}
                />
              </td>
              <td
                className="h-14 original-td skill-icon top-row px-8"
                id="strengths-icon"
              >
                <div
                  className="ml-28"
                  dangerouslySetInnerHTML={{ __html: strengthsSVG }}
                />
              </td>
            </tr>
            <tr className="h-14 original-tr">
              <th className="h-14 skill-heading px-8">Languages</th>
              <th className="h-14 skill-heading px-8">Technologies</th>
              <th className="h-14 skill-heading px-8">Strengths</th>
            </tr>
            <tr className="h-14 original-tr">
              <td className="h-14 skill-item px-8">
                Javascript &amp; TypeScript
              </td>
              <td className="h-14 skill-item px-8">React</td>
              <td className="h-14 skill-item px-8">Analytical reasoning</td>
            </tr>
            <tr className="h-14 original-tr">
              <td className="h-14 skill-item px-8">Python</td>
              <td className="h-14 skill-item px-8">Test-driven-development</td>
              <td className="h-14 skill-item px-8">Learning on the fly</td>
            </tr>
            <tr className="h-14 original-tr">
              <td className="h-14 skill-item px-8">Ruby</td>
              <td className="h-14 skill-item px-8">Mocha/Chai &amp; Jest</td>
              <td className="h-14 skill-item px-8">Personability</td>
            </tr>
            <tr className="h-14 original-tr">
              <td className="h-14 skill-item px-8">SQL</td>
              <td className="h-14 skill-item px-8">Django</td>
              <td className="h-14 skill-item px-8">Clear communication</td>
            </tr>
            <tr className="h-14 original-tr">
              <td className="h-14 skill-item bottom-row px-8">Klingon</td>
              <td className="h-14 skill-item bottom-row px-8">Node</td>
              <td className="h-14 skill-item bottom-row px-8">Writing</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Skills;
