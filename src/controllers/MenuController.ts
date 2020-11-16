import { Request, Response } from 'express'
import Menu from '../schemas/Menu'

class MenuController {
  public async all(req: Request, res: Response) {
    try {
      const menus = await Menu.find();
      res.status(200).send({ menus: menus })
    } catch (error) {
      res.status(400).send({ message: error })
    }
  }

  public async create(req: Request, res: Response) {
    try {
      let menu = new Menu(req.body.menu)
      menu = await menu.save()

      res.status(200).send({ "message": "Menu salvo com sucesso", "menu": menu })
    } catch (error) {
      let errors: Array<string> = []

      Object.keys(error.errors).forEach(name => {
        errors.push(`${name} ${error.errors[name].properties.message}`)
      });

      res.status(400).send({ "message": "Ocorreu um problema ao salvar o menu", "reason": errors })
    }
  }

  public async show(req: Request, res: Response) {
    const { code } = req.params;

    await Menu.findOne({ code: code }, (err, menu) => {
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

    let menu = await Menu.findById(id)

    if(menu) {
      menu.code = code
      menu.name = name
      menu.iconName = iconName
      menu.className = className
      menu.submenus = submenus
      menu.resource = resource

      console.log(menu)
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
      const result = await Menu.deleteOne({ "_id": id })

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
