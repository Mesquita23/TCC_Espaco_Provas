
function OnlyCordinator(req, res, next){
    if(!req.session.cordinatorId)
        return res.redirect('/cordinators/login')

    next()
}
function isLoggedRedirectToCordinator(req, res, next){
    if(req.session.cordinatorId)
        return res.redirect('/cordinators')

    next()
}

module.exports ={
    OnlyCordinator,
    isLoggedRedirectToCordinator
}