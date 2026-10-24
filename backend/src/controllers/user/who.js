export const who = async (req, res) => {
    console.log("hit who.");

    return res.status(200).json({
        username: req.user.sub
    })
}