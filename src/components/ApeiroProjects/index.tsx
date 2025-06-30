import projects from "@site/apeiro-projects.json";
import Link from "@docusaurus/Link";
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Project({ children, name }): JSX.Element {
  const projectName = name ? name : typeof children === "string" ? children : "";

  const project =  projects[projectName.trim()] || projects[projectName.toLowerCase().trim()];
  if (!project) {
    throw new Error("Project '" + project + "' does not exist!");
  }

  const icon = project.icon ? useBaseUrl(project.icon) : undefined;

  return (
    <span className="project-wrap">
      <Link to={project.url}>{children}</Link>
      <div className="project-content">
        <div className="project-title">{ icon ? (<img src={icon} className="project-icon"></img>) : "" }{project.name}</div>
        {project.description}
      </div>
    </span>
  );
}
