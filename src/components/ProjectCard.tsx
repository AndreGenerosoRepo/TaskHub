import type { Project } from "../types";
import styles from "./ProjectCard.module.css";

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className={styles.card}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
        </div>
    )
}

export default ProjectCard;