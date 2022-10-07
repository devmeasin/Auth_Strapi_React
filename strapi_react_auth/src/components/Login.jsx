import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { setCookie } from 'nookies';
import { TextInput, Text, Paper, Button, Divider, Stack, Center, LoadingOverlay } from '@mantine/core';
import { login, whoIam } from '../api';
import { setAuth } from '../store/isAuth';



const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const form = useForm({
        initialValues: {
            identifier: '',
            password: ''
        },

        validate: {
            identifier: (val) => (val.length <= 2 ? 'Please Provide Valid UserName...' : null),
            password: (val) => (val.length <= 3 ? 'Please Provide Valid Password...' : null),
        },
    });


    const loginHandler = async () => {
        try {

            const { config, data } = await login(form.values);

            if (data.user) {
                setCookie(null, 'jwt', `Bearer ${data.jwt}`, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: config.baseURL,
                });

                dispatch(setAuth({ isLogin: true, user: data.user }));
                navigate('/home');
            }

        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <div>
            <Paper p="xl" style={{ padding: "10px" }} radius="md" withBorder>
                <LoadingOverlay visible={visible} overlayBlur={2} />
                <Center>
                    <Text size="lg" weight={700}>
                        🔗 User Login 🔗
                    </Text>
                </Center>

                <Divider label="Happy Coding 🙃" labelPosition="center" my="lg" size="md" />

                <form onSubmit={form.onSubmit(() => loginHandler())}>
                    <Stack>

                        <TextInput
                            required
                            placeholder="Enter your UserName..."
                            label='email or username'
                            value={form.values.identifier}
                            onChange={(event) => form.setFieldValue('identifier', event.currentTarget.value)}
                            error={form.errors.identifier && form.errors.identifier}
                        />

                        <TextInput
                            required
                            placeholder="Enter your Valid password..."
                            label='password'
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && form.errors.password}
                        />

                    </Stack>

                    <Center style={{ marginTop: "15px" }}>
                        <Button type='submit' radius="xl">
                            Login..
                        </Button>
                    </Center>
                </form>
            </Paper>
        </div>
    )
}

export default Login;