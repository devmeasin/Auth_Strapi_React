import React, { useEffect, useState } from 'react';
import { setCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import { useForm } from '@mantine/form';
import { TextInput, Text, Paper, Button, Divider, Stack, Center, LoadingOverlay } from '@mantine/core';
import { signup } from '../api';
import { setAuth } from '../store/isAuth';



const SignUp = () => {

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },

        validate: {
            username: (val) => (val.length <= 2 ? 'Please Provide Valid UserName...' : null),
            email: (val) => (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) ? null : 'Please Provide Valid Email...'),
            password: (val) => (val.length <= 3 ? 'Please Provide Valid Password...' : null),
        },
    });

    const signUpHandler = async () => {
        try {

            const { config, data } = await signup(form.values);
            console.log('XXXX', { config, data });
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
            <Paper radius="md" p="xl" style={{ padding: "10px" }} withBorder>
                <LoadingOverlay visible={visible} overlayBlur={2} />
                <Center>
                    <Text size="lg" weight={700}>
                        🔗 User Registration 🔗
                    </Text>
                </Center>

                <Divider label="Happy Coding 🙃" labelPosition="center" my="lg" size="md" />

                <form onSubmit={form.onSubmit(() => signUpHandler())}>
                    <Stack>

                        <TextInput
                            required
                            placeholder="Enter your UserName..."
                            label='username'
                            value={form.values.username}
                            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                            error={form.errors.username && form.errors.username}
                        />
                        <TextInput
                            required
                            placeholder="Enter your UserName..."
                            label='email'
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && form.errors.email}
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
                        <Button type='submit' radius="xl" >
                            SignUp.
                        </Button>
                    </Center>
                </form>
            </Paper>
        </div>
    )
}

export default SignUp;