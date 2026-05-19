import ProjectsPage from "./pages/ProjectsPage"
import { MantineProvider } from "@mantine/core"


function App() {
  return (
  <MantineProvider>
      <ProjectsPage />
  </MantineProvider>
  )
}
export default App