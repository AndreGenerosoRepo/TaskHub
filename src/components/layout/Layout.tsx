import { AppShell, NavLink, useMantineColorScheme, Button, Group, Text } from '@mantine/core'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { IconLayoutKanban, IconTable, IconSun, IconMoon } from '@tabler/icons-react'
import styles from './Layout.module.css'

function Layout() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const location = useLocation()

    return(
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 220, breakpoint: 'sm' }}
            padding="md"
        >
            <AppShell.Header p="md" className={styles.header}>
                <Group justify="space-between">
                    <Text fw={700} size="xl" c="blue">TaskHub</Text>
                    <Button
                        onClick={toggleColorScheme}
                        variant="subtle"
                        size="sm"
                        leftSection={colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
                    >
                        {colorScheme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <NavLink
                    component={Link}
                    to="/projects"
                    label="Projects"
                    leftSection={<IconLayoutKanban size={18} />}
                    active={location.pathname.startsWith('/projects')}
                />
                <NavLink
                    component={Link}
                    to="/tasks"
                    label="Overall Tasks"
                    leftSection={<IconTable size={18} />}
                    active={location.pathname === '/tasks'}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>

        </AppShell>             
    )
}

export default Layout