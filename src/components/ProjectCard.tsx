import type { Project } from "../types";
import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

function ProjectCard({ project }: { project: Project }) {
    return (
        <Link to={`/projects/${project.id}`}>
            <div className={styles.card}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
            </div>
        </Link>
    )
}

export default ProjectCard;