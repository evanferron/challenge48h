export default async (req, res, next) => {
    const id = req.user;
    const user = await client.query(`SELECT * FORM user WHERE id=${id}`);

    if ('admin' !== user.role) {
        return res.sendStatus(401);
    }

    return next();
};
