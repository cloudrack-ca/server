import { Guild, Config } from "@fosscord/util";

import { Router, Request, Response } from "express";
import { route } from "@fosscord/api";

const router = Router();

router.get("/", route({}), async (req: Request, res: Response) => {
	const { limit, personalization_disabled } = req.query;
	var showAllGuilds = Config.get().guild.discovery.showAllGuilds;
	// ! this only works using SQL querys
	// TODO: implement this with default typeorm query
	// const guilds = await Guild.find({ where: { features: "DISCOVERABLE" } }); //, take: Math.abs(Number(limit)) });
	const guilds = showAllGuilds
		? await Guild.find({ take: Math.abs(Number(limit || 24)) })
		: await Guild.find({ where: `"features" LIKE '%DISCOVERABLE%'`, take: Math.abs(Number(limit || 24)) });
	res.send({ recommended_guilds: guilds });
});

export default router;
