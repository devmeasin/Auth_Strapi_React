import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { whoIam } from "../api";
import { setAuth } from "../store/isAuth";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const apiCallHandler = async () => {
        try {

            const { data } = await whoIam();
            if (data) {
                dispatch(setAuth({ isLogin: true, user: data }));
                setLoading(false);
            }

        } catch (err) {
            // console.error(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        apiCallHandler();
    }, []);

    return { loading };
}