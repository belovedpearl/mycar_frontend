import { rest } from "msw"

const baseURL = "https://mycardrfapi-d64556077ed4.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(
            ctx.json({
                "pk": 1,
                "username": OlaIfe,
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 1,
                "profile_image": "https://res.cloudinary.com/dwhb1z4jd/image/upload/v1/media/../default_profile_vpfbb8"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];