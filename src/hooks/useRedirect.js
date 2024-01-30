import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if user is signed in
                if (userAuthStatus === "signedIn") {
                  history.push("/");
                }
            } catch (err) {
                // if user is not signed in
                if (userAuthStatus === "signedOut") {
                  history.push("/");
                }
            }
        };
        handleMount();
    }, [history, userAuthStatus]);
};