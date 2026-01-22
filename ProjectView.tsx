import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from '@/lib/markdown-utils';
import ProjectDetail from './ProjectDetail';

export default function ProjectView() {
  const { slug } = useParams();

  if (!slug) return <Navigate to="/projects" replace />;

  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <ProjectDetail
      title={project.title}
      description={project.excerpt}
      category={project.category}
      status={project.status}
      technologies={project.technologies}
      content={project.content}
      HtmlContent={project.HtmlContent}
      ContentComponent={project.ReactComponent}
      toc={project.toc}
    />
  );
}
