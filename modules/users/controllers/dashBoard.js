

const userDashboard = (req, res) => {
    res.status(200).json({
        status: "suxxess",
        message : "Dashboard accessed successfu;;y"
    })
}
module.exports = userDashboard;