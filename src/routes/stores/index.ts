import { Router } from "express";
import { IAppLocs } from "../../index";

const router = Router();

router.get("/", async (req, res) => {
  res.sendStatus(200).send("hello");
});

router.get("/stores", async (req, res) => {
  const { offset = 0, limit = 25 } = req.query;
  console.log(req.query);

  const { db }: IAppLocs = req.app.locals;
  const results = await db.collection("stores").find();

  const total = await results.count();

  const data = await results
    .limit(Number(limit))
    .skip(Number(offset))
    .toArray();

  res.send({ data, total, offset, limit });
});

router.get("/stores/:first_name", async (req, res) => {
  const { first_name } = req.params;
  const { db }: IAppLocs = req.app.locals;

  const result = await db
    .collection("stores")
    .findOne({ first_name: first_name });

  console.log(result);

  res.send(result);
});

export default router;
