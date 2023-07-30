import { rest } from "msw";

const USER = 0;
const REPAIR = 1;
const INSPECTOR = 2;
const INSURANCE = 3;

const users = [
  { id: "user1", password: "pass1", userType: USER },
  { id: "user2", password: "pass2", userType: REPAIR },
  { id: "user3", password: "pass3", userType: INSPECTOR },
  { id: "user4", password: "pass4", userType: INSURANCE },
];

interface LoginRequestBody {
  loginid: string;
  loginpassword: string;
}

export const handlers = [
  rest.post("https://carborn.site/api/login", (req, res, ctx) => {
    const { loginid, loginpassword } = req.body as LoginRequestBody;

    const user = users.find(
      (user) => user.id === loginid && user.password === loginpassword
    );

    if (user) {
      const accessToken = "exampleAccessToken";
      const expire = Date.now() + 0.3 * 60 * 1000;

      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          accessToken: accessToken,
          userType: user.userType,
          expire: expire
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          status: 401,
          error: "Invalid credentials",
        })
      );
    }
  }),
  rest.get("https://carborn.site/api/logout", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ status: 200})
    )
  })
];
