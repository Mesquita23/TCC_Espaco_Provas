
function OnlyStudents(req, res, next){
    if(!req.session.studentId)
        return res.redirect('/students/login')

    next()
}
function isLoggedRedirectToStudents(req, res, next){
    if(req.session.studentId)
        return res.redirect('/students')

    next()
}

module.exports ={
    OnlyStudents,
    isLoggedRedirectToStudents
}