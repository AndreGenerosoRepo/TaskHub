import { AppShell, NavLink, useMantineColorScheme, Button, Group, Text  } from '@mantine/core'
import { Outlet, Link } from 'react-router-dom'

function Layout() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()

    return(
        <AppShell
            //valores recomendados pela documentacao Mantine
            header={{ height: 60 }}
            navbar={{ width:200, breakpoint: 'sm' }}
            padding= "md"
        >
            <AppShell.Header p="md">
                 <Group justify="space-between">
                    <Text fw={700} size="xl">TaskHub</Text>
                    <Button onClick={toggleColorScheme} variant="outline" size="sm">
                    {colorScheme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLink
                    component={Link}
                    to="/projects"
                    label="Projects"
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>

        </AppShell>             
    )
}

export default Layout