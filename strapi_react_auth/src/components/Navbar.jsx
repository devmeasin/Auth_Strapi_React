import {
    Container, createStyles, Header, Group, Button, Text, Divider, Box, Burger, Drawer, ScrollArea,
} from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { destroyCookie } from 'nookies';
import { setAuth } from '../store/isAuth';
import { useNavigate, Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: 42,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            padding: "6px 18px",
            borderRadius: "6px",
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
        marginTop: "12px"
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));



export const Navbar = () => {
    const { isAuth, user } = useSelector((state) => state.auth);
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        destroyCookie(null, 'jwt');
        dispatch(setAuth({ isLogin: false, user: {} }));
        navigate("/");
    }

    return (
        <Box pb={10}>
            <Header height={60} px="md">
                <Container size="95%">
                    <Group position="apart" sx={{ height: '100%' }}>
                        <Text size={30} color="primary">
                            Logo..
                        </Text>

                        <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                            <Link to="/" className={classes.link}>
                                Home
                            </Link>

                            <Link to="/product" className={classes.link}>
                                Product
                            </Link>
                        </Group>

                        {
                            isAuth && user ?

                                <Group className={classes.hiddenMobile} >
                                    <Button radius="md" onClick={logoutUser}>
                                        LogOut
                                    </Button>
                                </Group>
                                :
                                <Group className={classes.hiddenMobile} >
                                    <Button variant="default" radius="md">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button radius="md">
                                        <Link style={{ color: "#fff" }} to="/register">Sign up</Link>
                                    </Button>
                                </Group>
                        }

                        <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                    </Group>
                </Container>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Logo"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Link to="/" className={classes.link}>
                        Home
                    </Link>

                    <Link to="/product" className={classes.link}>
                        Product
                    </Link>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">

                        {
                            isAuth && user ?

                                <Button radius="md" onClick={logoutUser}>
                                    LogOut
                                </Button>
                                :
                                <>
                                    <Button variant="default" radius="md">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button radius="md">
                                        <Link style={{ color: "#fff" }} to="/register">Sign up</Link>
                                    </Button>
                                </>
                        }

                    </Group>
                </ScrollArea>
            </Drawer>

        </Box>
    );
}