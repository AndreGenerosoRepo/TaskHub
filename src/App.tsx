import ProjectsPage from "./pages/projects/ProjectsPage"
import { MantineProvider } from "@mantine/core"


function App() {
  return (
  <MantineProvider>
      <ProjectsPage />
  </MantineProvider>
  )
}
export default App