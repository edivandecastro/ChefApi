import { Request, Response } from 'express'
import MenuSchema from '../schemas/Menu'
import menu from '../models/Menu'

class MenuController {
  public async all(req: Request, res: Response) {
    try {
      const { CurrentUserId } = req.params
      const [_, token] = req.headers.authorization.split(' ')

      let menus = await MenuSchema.find();

      menus = await menu.checkAccess(menus, token, CurrentUserId)

      res.status(200).send({ menus: menus })
    } catch (error) {
      res.status(400).send({ message: error })
    }
  }

  public async create(req: Request, res: Response) {
    let menu_build = await menu.build(req.body.menu)
    try {
      menu_build.markModified('submenus');
      let menu_persisted = await (menu_build).save()

      res.status(200).send({ "message": "Menu salvo com sucesso", "menu": menu_persisted })
    } catch (error) {
      let errors: Array<string> = []
      if (error.errors) {
        Object.keys(error.errors).forEach(name => {
          errors.push(`${name} ${error.errors[name].properties.message}`)
        });
      }
      else {
        errors.push(error.message);
      }

      res.status(400).send({ "message": "Ocorreu um problema ao salvar o menu", "reason": errors })
    }
  }

  public async show(req: Request, res: Response) {
    const { code } = req.params;

    await MenuSchema.findOne({ code: code }, (err, menu) => {
      if (menu) {
        res.status(200).send({ "menu": menu })
      }
      else {
        res.status(404).send({ "message": "Menu não localizado" })
      }
    })
  }

  public async update(req: Request, res: Response) {
    const { id }  = req.params
    const { code, name, iconName, className, submenus, resource } = req.body.menu

    let menu = await MenuSchema.findById(id)

    if(menu) {
      menu.name = name
      menu.iconName = iconName
      menu.className = className
      menu.submenus = submenus
      menu.resource = resource

      try {
        await menu.save()

        res.status(200).send({ message: "Menu atualizado com sucesso", menu });
      } catch (error) {
        res.status(400).send({ message: error })
      }
    }
    else {
      res.status(400).send({ "message": "Menu não localizado" })
    }
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params
    try {
      const result = await MenuSchema.deleteOne({ "_id": id })

      if (result.deletedCount && result.deletedCount > 0)
        res.status(200).send({ message: "Menu deletado com sucesso" })
      else
        res.status(404).send({ message: "Menu não localizado" })
    } catch (error) {
      res.status(500).send({ message: "Ocorreu um erro inesperado" })
    }
  }
}

export default new MenuController
