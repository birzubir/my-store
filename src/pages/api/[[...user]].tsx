import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Success",
      data,
    });
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("users", user[1], data, (status: boolean) => {
            if (status) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "Success" });
            } else {
              res
                .status(400)
                .json({ status: false, statusCode: 400, message: "Failed" });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access Denied",
          });
        }
      }
    );
    res.status(200).json({
      status: true,
    });
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("users", user[1], (result: boolean) => {
            if (result) {
              res
                .status(200)
                .json({ status: true, statusCode: 200, message: "Success" });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access Denied",
          });
        }
      }
    );
  }
}
