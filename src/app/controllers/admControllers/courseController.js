const Course = require("../../models/admModels/course")
const Cordinator = require("../../models/admModels/cordinator")

module.exports ={

    async index(req, res){

        let courses = await Course.all()
        courses = courses.rows
    
        return res.render("admView/courses/index", { courses })
            
    },
    // criar pagina para criar
    async create(req, res){
        // buscar cordenadores
        let cordinators = await Cordinator.all()
        cordinators = cordinators.rows
    
        return res.render("admView/courses/create.njk", {cordinators})
    },
    // Criar 
    async post(req,res){
        //Logica de Salvar

        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Preencha todos os campos")
            }
        }

        let { name, id_cordinator } = req.body

        const semester = Number(req.body.semester)

        const course = {
            name,
            id_cordinator
        }

        await Course.create(course)

        return res.redirect('adm/courses')
    },
    // criar pagina para editar
    async edit(req, res){

        let course = await Course.find(req.params.id)
        course = course.rows[0]

        let cordinators = await Cordinator.all()
        cordinators = cordinators.rows

        if(!course) return res.send("Curso não encontrado")

        return res.render("admView/courses/edit.njk", {course, cordinators})
    },
    //atualizar
    async put(req, res){

        let { name, id_course ,id_cordinator } = req.body


        
    //    console.log(`aqui caralhao: ${id_course}`)

        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Preencha todos os campos")
            }
        }
        

        const course = {
            name,
            id_cordinator,
            id_course
        }
        
        let test = await Course.update(course)

        return res.redirect('adm/courses')
    },
    //deletar
    async delete(req, res){
        await Course.delete(req.body.id)

        return res.redirect('adm/courses')
    }
} 